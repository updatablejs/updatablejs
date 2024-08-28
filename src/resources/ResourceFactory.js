
import {Callback} from './Callback.js';
import {Fixed} from './Fixed.js';

export class ResourceFactory {
	
	static create(resource, shared) {
		return typeof resource == 'function' ? 
			new Callback(resource, shared) : new Fixed(resource);
	}	
}
