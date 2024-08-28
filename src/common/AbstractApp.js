
import {Resources} from '../resources/Resources.js';

export class AbstractApp {
	
	resources;
	
	static instance;
	
	constructor(resources) {
		this.resources = resources ? resources : new Resources();
	}

	static getInstance() {
        if (!this.instance)
            this.instance = new this();
		
        return this.instance;
    }

	setResources(resources) {
		this.resources = resources;
		
		return this;
	}

	set(name, resource, shared = true) {
		this.resources.set(name, resource, shared);
		
		return this;
	}
	
	static set(name, resource, shared = true) {
		return this.getInstance().set(name, resource, shared);
	}
	
	get(name, values) {	
		return this.resources.get(name, values);
	}
	
	static get(name, values) {
		return this.getInstance().get(name, values);
	}
}
