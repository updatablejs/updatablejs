
import {Util} from '../common/Util.js';
import {EventHandler} from './EventHandler.js';

export class Events {
	
	events = {};
	result;
	
	constructor(handlers) {
		if (handlers) this.setHandlers(handlers);
	}

	set(event, handler, values, mergeValues = true, removeAfterUse = false) {
		return this.setHandler(event, handler, values, mergeValues, removeAfterUse);
	}
	
	setSingleUseHandler(event, handler, values, mergeValues = true) {
		return this.setHandler(event, handler, values, mergeValues, true);
	}
	
	setHandler(event, handler, values, mergeValues = true, removeAfterUse = false) {
		if (handler !== undefined) {
			if (!(event in this.events))
				this.events[event] = [];
			
			this.events[event].push(new EventHandler(handler, values, mergeValues, removeAfterUse));
		}
		
		return this;
	}
	
	/*{
		event: 'handler', // Not array, it is difficult to differentiate a handler from a list of handlers.
		
		event: ['handler', ['object', 'method']],
		
		event => {
			handler: '',
			values: []
		},
		
		'event' => [
			{handler: '', values: []},		
			{handler: '', values: []}
		]
	}*/
	setHandlers(handlers) {
		for (var [key, value] of Object.entries(handlers)) {	
			this._setHandlers(key, Array.isArray(value) ? value : [value]);
		}

		return this;
	}
	
	_setHandlers(event, handlers) {
		for (var handler of handlers) {
			if (!Util.isObject(handler) || Array.isArray(handler)) {
				this.setHandler(event, handler);
			}
			else {
				var {handler, values = undefined, mergeValues = true, removeAfterUse = false} = handler;
				this.setHandler(event, handler, values, mergeValues, removeAfterUse);
			}
		}
		
		return this;
	}
	
	trigger(event, ...values) {
		this.result = undefined;
		
		if (!(event in this.events)) return this;
		
		for (var [index, handler] of this.events[event].entries()) { 
			var result = handler.trigger(values);

			if (handler.shouldBeRemoved())
				this.events[event].splice(index, 1);
			 
			// Break on result. 
			if (result !== undefined && result !== null) { 
				this.result = result;
				
				break;
			}
		}
		
		return this;
	}

	getResult() {
		return this.result;
	}
	
	remove(event, handler) {
		if (event in this.events) {
			if (handler)
				this.events[event] = this.events[event].filter(h => h !== handler);
			else 
				delete this.events[event];
		}
		
		return this;
	}
	
	clear() {
		this.events = {};
		
		return this;
	}
}
