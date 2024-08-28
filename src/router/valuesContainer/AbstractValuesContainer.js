
import {Util} from '../../common/Util.js';

export class AbstractValuesContainer {
	
	values = {};
	
	constructor(values) {
		if (values) this.setValues(values);
	}
	
	setValues(values) {
		if (values instanceof AbstractValuesContainer)
			values = values.getValues();
		
		for (var [key, value] of Object.entries(values)) {
			var method = 'set' + Util.capitalizeFirstLetter(key);
			if (method in this) 
				this[method](value);
			else
				this.values[key] = value;
		}
		
		return this;
	}
	
	getValues() {
		return this.values;	
	}
}
