
import {AbstractComponentCallbacks} from './AbstractComponentCallbacks.js';
import {Util} from '../common/Util.js';

export class AbstractComponent extends AbstractComponentCallbacks {
	
	ignoredSetters = [];
	settersEnabled = false;
	parent;

	constructor(values) {		
		super();
		
		this.setDefaults();
			
		if (values)
			this.set(values);
	}
	
	// https://stackoverflow.com/questions/55479511/access-javascript-class-property-in-parent-class
	setDefaults() {}
	
	set(values) {
		var callbacks = ['onCreate', 'onRecreate', 'onAttach', 'onAncestorAttach', 'onDetach', 'onUpdate'];
		
		for (var [key, value] of Object.entries(values)) {
			var method = 'set' + Util.capitalizeFirstLetter(key);

			if (this.settersEnabled && !this.ignoredSetters.includes(key) && method in this) 
				this[method](value);
			else if (callbacks.includes(key))
				this.callbacks[key] = value;
			else
				this[key] = value;
		}
		
		return this;	
	}
	
	setIgnoredSetters(setters) {
		this.ignoredSetters = setters;
		
		return this;
	}
	
	setSettersEnabled(value) {
		this.settersEnabled = !!value;
		
		return this;
	}
	
	areSettersEnabled() {
		return this.settersEnabled;
	}
	
	attachTo(element) {}
	
	attachAfter(element) {}
	
	replace(element) {}
	
	detach() {}
	
	update(values) {}
	
	deepUpdate(values) {}
	
	recreate() {}
	
	isCreated() {}
	
	isAttached() {}
	
	getElement() {}
	
	hide() {}
	
	show() {}
	
	setParent(parent) {
		this.parent = parent;
		
		return this;
	}
	
	getParent() {
		return this.parent;
	}
}
