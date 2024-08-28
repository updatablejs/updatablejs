
import {AbstractResource} from './AbstractResource.js';

export class Fixed extends AbstractResource {
	
	set(resource) {
		this.resource = resource;
		
		return this;
	}
	
	get() {
		return this.resource;
	}
}
