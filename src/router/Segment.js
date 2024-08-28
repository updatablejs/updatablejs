
import {AbstractRoute} from './AbstractRoute.js';

export class Segment extends AbstractRoute {
	
	//models = {};
	
	hydrate(values) {
		if ('models' in values) {
			values = Object.assign({}, values);
			
			this.setModels(values.models);
			
			delete values.models;
		}
		
		super.hydrate(values);
	}
	
	setRoute(key, route) {
		if (!(route instanceof AbstractRoute))
			route = Object.assign({}, {models: {}}, route); // Change Literal to Segment.

		return super.setRoute(key, route);
	}
	
	setModels(models) {
		this.models = models;
	}
	
	getModels() {
		var models;
		var parent = this.getParent();
		while (parent) {
			if (parent instanceof this.constructor) {
				models = parent.getModels();
				
				break;
			}
			
			parent = parent instanceof AbstractRoute ? parent.getParent() : null;
		}
		
		return Object.assign({}, models, this.models);
	}
	
	match(url) {
		if (!this.routable)
			return super.match(url);

		var result = this.getRegex().exec(url);
		if (result === null) 
			return super.match(url);
		
		var values = {};
		if (result.groups) {
			var models = this.getModels();
			for (var [key, value] of Object.entries(result.groups)) {
				if (value !== undefined && key in models)
					values[key] = value;
			}
		}
		
		return this.getValues(values);
	}
	
	build(values) {
		var values = this.getValues(values);
		var models = this.getModels();
		var path = this.replaceOptionalSegments(this.getPath(), '$1');
		for (var [key, value] of Object.entries(values)) {
			if (key in models)
				path = path.replace(':' + key, value);	
		}

		return path;
	}
	
	getRegex() {
		var regex = this.replaceOptionalSegments(`^${this.getPath()}$`, '($1)?');
		for (var [key, value] of Object.entries(this.getModels())) {
			regex = regex.replace(`:${key}`, `(?<${key}>${value})`);	
		}

		return new RegExp(regex);
	}
	
	// Ce se afla intre paranteze patrate este optional.
	// ex. [/:page], [/:controller[/:action]]
	replaceOptionalSegments(string, replacement) {
		var regex = /\[([^\[]+?)\]/g;
		while (regex.test(string))
			string = string.replace(regex, replacement);
		
		return string;
	}
}
