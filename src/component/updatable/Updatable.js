
import {Util, _} from '../../export.js';

export class Updatable {
	
	component;
	template;
	contentGenerationMode = 'fill';
	singleUse = false;
	
	static noChange = '@#$';

	constructor(component) {
		this.component = component;
	}
	
	update() {}
	
	setTemplate(template) {
		this.template = template.replace(/\[u\]/g, '${')
			.replace(/\[\/u\]/g, '}')
			.replace(/\[lt\]/g, '<')
			.replace(/\[gt\]/g, '>');
			
		if (/^\s*\$\{\?/.test(this.template)) {
			this.singleUse = true;
			this.template = this.template.replace(/^\s*\$\{\?/, '${');
		}
		
		var regex = /^\s*\$\{\s*(.+?)\s*\}\s*$/s;
		var matches = regex.exec(this.template);
		if (matches && (!/\$\{/.test(matches[1]) || this.isJavaScript(matches[1]))) { // {{}} {{}} 
			this.template = matches[1];
			
			this.contentGenerationMode = 'eval';	
		}
	}
	
	isJavaScript(value) {
		return /(if|switch)\s*\(.*\)/.test(value);
	}
	
	generateContent() {
		try {
			var content;
			switch(this.contentGenerationMode) {
				case 'fill':
					content = this._fill();
					break;
					
				case 'eval':
					content = this._eval();
					break;
				
				default:
					throw `Unknown mode ${this.contentGenerationMode}.`;
			}
			
			return content !== undefined ? content : '';
		}
		catch(exception) {
			throw `Content generation error "${exception}" ${this.template}`; 
		}
	}

	_fill() {
		return function(template, updatable) {
			return eval('`' + template + '`');
		}.call(this.component, this.template, this);
	}
	
	_eval() {
		return function(template, updatable) {
			return eval(template);
		}.call(this.component, this.template, this);
	}
	
	isSingleUse() {
		return this.singleUse;
	}
}
