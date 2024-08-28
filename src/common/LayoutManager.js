
import {Layout} from '../component/Layout.js';
import {Resources} from '../resources/Resources.js';
import {Util} from './Util.js';

export class LayoutManager {
	
	currentLayout;
	layouts;
	
	constructor(layouts) {
		this.layouts = layouts ? layouts : new Resources();
	}

	changeLayout(layout, key) {
		if (key) this.setLayout(key, layout);	
				
		if (this.currentLayout == layout) return;
		
		if (layout instanceof Layout) {
			layout.replace(document.querySelector('body'));
		}
		else {
			var body = document.createElement('body');
			document.querySelector('body').replaceWith(body);

			layout.attachTo(document.querySelector('body'));
		}
		
		if (this.currentLayout)
			this.currentLayout.detach();
		
		this.currentLayout = layout;
	}
	
	setLayout(key, layout, shared = true) {
		return this.layouts.set(key, layout, shared);	
	}
	
	getLayout(key, values) {
		return this.layouts.get(key, values);
	}
	
	hasLayout(key) {
		return this.layouts.has(key);
	}
}
