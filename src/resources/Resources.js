
import {ResourceFactory} from './ResourceFactory.js';

export class Resources {
	
	resources = {};
	
	set(key, resource, shared = true, bindContext = true) {
		if (typeof resource == 'function' && bindContext)
			resource = resource.bind(this);	
		
		this.resources[key] = ResourceFactory.create(resource, shared);
		
		return this;
	}

	get(key, values) {
		if (!(key in this.resources)) 
			throw `Unknown resource ${key}`;

		return this.resources[key].get(values);
	}
	
	has(key) {
		return key in this.resources;
	}
}
