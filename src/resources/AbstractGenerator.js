
import {AbstractResource} from './AbstractResource.js';

export class AbstractGenerator extends AbstractResource {

	shared;
	generated; 
	
	generate() {}
	
	get(values) {		
		if (!this.shared) return this.generate(values);
		
		if (this.generated === undefined)
			this.generated = this.generate(values);
			
		return this.generated;
	}	
	
	setShared(shared) {
		this.shared = !!shared;
		
		return this;
	}
	
	reset() {
		this.generated = undefined;
		
		return this;
	}
}
