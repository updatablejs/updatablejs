
import {AbstractRouteList} from './AbstractRouteList.js';
import {Util} from '../common/Util.js';

export class AbstractRoute extends AbstractRouteList {
	
	parent;
	path;
	routable = true; // If it is false, only the children's routes will be checked.
	values;
	
	constructor(values) {
		super();
		
		if (values) this.hydrate(values);
	}
	
	build() {}
	
    hydrate(values) {
		if ('values' in values) {
			values = Object.assign({}, values, values['values']);
				
			delete values.values;
		}
			
		var properties = ['path', 'routable', 'routes'];
		var _values = {};
		for (var [key, value] of Object.entries(values)) {
			if (!properties.includes(key)) {
				_values[key] = value;
					
				continue;
			}
				
			var method = 'set' + Util.capitalizeFirstLetter(key);
			if (method in this) 
				this[method](value);
			else
				this[key] = value;
		}
		
		this.setValues(_values);
	}
	
	setParent(parent) {
		this.parent = parent;
		
		return this;
	}
	
	getParent() {
		return this.parent;
	}
	
	setPath(path) {
		this.path = path;
		
		return this;	
	}
	
	getPath() {	
		if (Util.isAbsolutePath(this.path) || !(this.parent instanceof AbstractRoute)) 
			return this.path;
			
		var path = this.parent.getPath();
		if (path === undefined) return this.path;
		
		if (this.path === undefined) return path;
		
		return this.path.indexOf('[/') == 0 ? // [/:path]
			Util.trimEnd(path, '/') + this.path :
			Util.trimEnd(path, '/') + '/' + Util.trimStart(this.path, '/');
	}
	
	setRoutable(routable) {
		this.routable = !!routable;
		
		return this;
	}

	isRoutable() {
		return this.routable;
	}
	
	setValues(values) {
		this.values = values;

		return this;
	}
	
	getValues(values) {
		var result = this.getValuesContainerFactory().create();
		
		if (this.parent instanceof AbstractRoute)
			result.setValues(this.parent.getValues());
		
		if (this.values)
			result.setValues(this.values);
	
		if (values)
			result.setValues(values);
		
		return result.getValues();
	}
	
	getValuesContainerFactory() {
		return this.getParent().getValuesContainerFactory();
	}
}
