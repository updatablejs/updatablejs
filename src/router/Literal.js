
import {AbstractRoute} from './AbstractRoute.js';

export class Literal extends AbstractRoute {
	
	match(url) {
		if (!this.routable)
			return super.match(url);
			
		return url == this.getPath() ?
			this.getValues() : super.match(url);
	}
	
	build() {
		return this.getPath();
	}
}
