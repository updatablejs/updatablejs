

export class EventHandler {

	handler;
	values;
	mergeValues;
	removeAfterUse;

	// handler, values
	// [object, method], values
	constructor(handler, values, mergeValues, removeAfterUse) {
		if (Array.isArray(handler) && handler.length != 2) 
			throw 'Handler has a wrong format.';
			
		this.handler = handler;
		this.values = !Array.isArray(values) ? (values !== undefined ? [values] : []) : values;
		this.mergeValues = !!mergeValues;
		this.removeAfterUse = !!removeAfterUse;
	}
	
	trigger(values) {
		if (this.mergeValues) 
			values = values.concat(this.values);
		else if (!values.length)
			values = this.values;
	
		if (Array.isArray(this.handler)) {
			var [object, method] = this.handler;
					
			return object[method](...values);
		}
		else
			return this.handler(...values);	
	}
	
	shouldBeRemoved() {
		return this.removeAfterUse;
	}
}
