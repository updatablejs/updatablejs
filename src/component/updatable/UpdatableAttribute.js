
import {Updatable} from './Updatable.js';
import {Util} from '../../common/Util.js';

export class UpdatableAttribute extends Updatable {
	
	attribute;

	constructor(attribute, component) {
		super(component);
		
		this.attribute = attribute;
			
		this.setTemplate(attribute.value);
	}

	update() {
		var value = this.generateContent();
		if (Util.isString(value))
			value = value.trim();

		this.attribute.value = value;
	}
}
