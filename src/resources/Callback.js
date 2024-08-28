
import {AbstractGenerator} from './AbstractGenerator.js';

export class Callback extends AbstractGenerator {
	
	constructor(resource, shared) {
		super(resource);
		this.setShared(shared);
	}
	
	generate(values = []) {
		return this.resource(...values);	
	}
	
	set(resource) {
		if (typeof resource != 'function') 
			throw 'The resource must be callable.';
		
		this.resource = resource;
		
		return this;
	}
}
