
import {Updatable} from './Updatable.js';
import {AbstractComponent} from '../AbstractComponent.js';
import {Component} from '../Component.js';
import {events} from '../../export.js';

export class AbstractUpdatableElement extends Updatable {
	
	parentElement;
	previousSibling;
	elements = [];
	temporaryComponents = [];
	components = [];

	parse(string) {
		return new DOMParser().parseFromString(string, 'text/html').body;
	}
	
	update() {
		var previousSibling = this.previousSibling;
		if (this.elements.length > 0) {
			previousSibling = this.elements[0] instanceof AbstractComponent ? 
				this.elements[0].getElement().previousSibling : this.elements[0].previousSibling;
		}
		
		var content = this.generateContent();
		if (content == Updatable.noChange) return;

		this.removeTemporaryComponents();
		var components = this.components;
		this.components = [];
			
		var elements = this.prepareContent(content);
		
		// Remove old elements.
		
		for (var element of this.elements) {
			if (!(element instanceof AbstractComponent))
				element.remove();
		}
	
		for (var component of components) {
			if (!this.components.includes(component))
				component.detach();
		}	
		
		// Attach new elements.
		
		for (var element of elements) {
			if (!previousSibling) {
				if (element instanceof AbstractComponent) 
					element.prependTo(this.parentElement);
				else
					this.parentElement.prepend(element);	
			}
			else {
				if (element instanceof AbstractComponent) 
					element.attachAfter(previousSibling);
				else
					previousSibling.after(element);
			}
			
			previousSibling = element instanceof AbstractComponent ? element.getElement() : element;
		}

		this.elements = elements;
	}
	
	prepareContent(content) {
		if (!Array.isArray(content))
			content = [content];	
			
		var elements = [];
		for (var element of content) {		
			if (element instanceof AbstractComponent) {
				elements.push(element);
				this.component.components.set(element);
				this.temporaryComponents.push(element);
				this.components.push(element);
			}
			else if (element instanceof Node) {
				elements.push(element);
			}
			else {
				element = this.prepareAttributes(
					this.parse(this.component.prepareComponentTags(String(element))));

				for (var element of element.childNodes) {
					if (element.tagName) {
						if (element.tagName.toLowerCase() == 'component')
							element = this.prepareComponent(element);
						else
							this.prepareComponents(element); 	
					}

					elements.push(element);
				}
			}
		}
		
		return elements;
	}
	
	prepareAttributes(element) {
		var selector = '[' + events.join('], [') + ']';
		for (var e of element.querySelectorAll(selector)) {
			this._prepareAttributes(e); 
		}
		
		return element;
	}
	
	_prepareAttributes(element) {
		Array.from(element.attributes).forEach(attribute => {								   
			if (/^on/.test(attribute.localName) && /\bthis\.\w+/.test(attribute.value)) {
				var template = attribute.value;
				var type = attribute.localName.replace(/^on/, '');
					
				element.addEventListener(type, function(event) {
					var e = event;
					
					eval(template);
				}.bind(this.component));
	
				element.removeAttribute(attribute.localName);
			}
		});
	}
	
	prepareComponents(element) {
		for (var element of element.querySelectorAll('component')) {
			this.prepareComponent(element, true); 
		}
	}
	
	prepareComponent(element, replace = false) {
		if (element.hasAttribute('id')) {
			if (!this.component.components.has(element.id)) {
				var component = this.component.initComponent(element);
				this.component.components.setWithId(element.id, component);
					
				if (element.hasAttribute('temporary'))
					this.temporaryComponents.push(component);	
			}
			else
				var component = this.component.components.get(element.id);
		}
		else {
			var component = this.component.initComponent(element);
			this.component.components.set(component);
			this.temporaryComponents.push(component);
		}
		
		if (replace) component.replace(element);
		
		this.components.push(component);
		
		return component;	
	}
	
	removeTemporaryComponents() {
		if (this.temporaryComponents.length) {
			this.component.components.removeComponents(this.temporaryComponents);
			
			this.temporaryComponents = [];
		}
	}	
}
