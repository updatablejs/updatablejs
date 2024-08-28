
import {AbstractComponent} from './AbstractComponent.js';
import {UpdatableFactory} from './updatable/UpdatableFactory.js';
import {UpdatableList} from './UpdatableList.js';
import {ComponentList} from './ComponentList.js';
import {Chronometer} from '../common/Chronometer.js';
import {Util} from '../common/Util.js';
import {config} from '../export.js';

export class Component extends AbstractComponent {

	element;
	attachedTo;
	updatables = new UpdatableList();
	components = new ComponentList();
	updateCount = 0;
	executionTimes = {};
	
	setDefaults() {
		this.set({
			fetching: false	
		});
	}
	
	getTemplate() {}
	
	attachTo(element) {
		return this.appendTo(element);
	}
	
	prependTo(element) {
		element.prepend(this.getElement());
		this._setAttachedTo(element);
		
		return this;
	}
	
	appendTo(element) {
		element.append(this.getElement());
		this._setAttachedTo(element);
		
		return this;
	}

	attachAfter(element) {
		element.after(this.getElement());
		this._setAttachedTo(element.parentNode);
			
		return this;
	}
	
	replace(element) {		
		var attachedTo = element.parentNode;
		attachedTo.replaceChild(this.getElement(), element);
		this._setAttachedTo(attachedTo);
			
		return this;
	}
	
	_setAttachedTo(attachedTo) {	
		var isAttached = this.isAttached();
		this.attachedTo = attachedTo;
		if (!isAttached) {
			this.onAttach();
    		this.triggerOnAncestorAttach(this);
		}
	}

	triggerOnAncestorAttach(ancestor) {
		if (ancestor != this)
			this.onAncestorAttach(ancestor);
		
		for (var component of this.components.toArray()) {
			component.triggerOnAncestorAttach(ancestor);
		}
	}
	
	detach() {
		if (this.element)
			this.element.remove();

		if (this.isAttached()) 
			this.onDetach();

		this.attachedTo = undefined;

		return this;
	}
	
	update(values, deepUpdate = false) {
		if (values) this.set(values);

		if (this.element) {
			var chronometer = new Chronometer();
			
			if (deepUpdate) {
				var components = this.components.clone();
				this.updatables.update();
				components.intersect(this.components).deepUpdate();
			}
			else
				this.updatables.update();
			
			this.executionTimes.update = chronometer.stop();
			
			
			
			if (this.executionTimes.update > 30) {
				console.log('executionTimes');
				console.log(this);
				console.log(this.executionTimes);
				console.log('///////////////////////');
			}
			
			
			
			
			this.updateCount++;
			
			this.onUpdate();
		}

		return this;
	}
	
	deepUpdate(values) {
		return this.update(values, true);	
	}
	
	recreate() {
		if (!this.element) return this;
		
		this.updatables = new UpdatableList();
		this.components = new ComponentList();
		
		var element = this.element;
		delete this.executionTimes.create;
		this.createElement();
	
		if (this.isAttached())
			this.attachedTo.replaceChild(this.element, element);
			
		this.onRecreate();
		
		return this;
	}
	
	isAttached() {
		return !!this.attachedTo;
	}
	
	isCreated() {
		return !!this.element && 'create' in this.executionTimes;
	}
	
	
	// Element
	
	getElement() {
		if (!this.element) {
			this.createElement();
			this.onCreate();
		}
		
		return this.element;
	}

	createElement() {
		var chronometer = new Chronometer();
		this.element = this.parse(this.prepareTemplate(this.getTemplate()));
		this.element.remove(); // this.element.isConnected becomes false
		this.prepareElement(this.element);
		this.updatables.update();
		this.executionTimes.create = chronometer.stop();	
	}

	prepareTemplate(template) {
		template = this.prepareComponentTags(
			this.asperandSanitizing(template));
		
		function prepare(template) {
			return template.replace(/\{\{(.+?)\}\}/gs, (match, p1) => {									
				if (/\{\{/.test(p1))
					return '{{' + prepare(p1 + '}}');
			
				var matches = /^[?@]+/.exec(p1);
				if (matches) {
					var length = matches[0].split('@').length - 1;
					if (length) {
						p1 = p1.replace(/^[?@]+/, '');
						
						p1 = `${matches[0].replace(/@/g, '')}${length > 1 ? `_(_(${p1}))` : `_(${p1})`}`;	
					}
				}
			
				return '[u]' + p1.replace(/</g, '[lt]')
					.replace(/>/g, '[gt]') + '[/u]';
			});
		}
		
		while (/\{\{.+?\}\}/s.test(template)) {
			template = prepare(template);	
		}
		
		return this.prepareTemplateSpecialCases(template);
	}
	
	asperandSanitizing(template) {
		var re = new RegExp(
			'(?:' 
				+ '(@+)' 
				+ '|'
				+ '(\\[[^\\]]+\\])' 
			+ ')' 
			
			+ '\\{([^}]+)\\}', 
			
			'g'
		);
		
		template = template.replace(/[$`]/g, '\\$&')
			.replace(re, (match, p1, p2, p3) => {												
				if (p2) return `\${Component.sanitize(${p3}, '${p2}')}`;
				
				return p1.length > 1 ? `\${Component.sanitize(Component.sanitize(${p3}))}` : 
					`\${Component.sanitize(${p3})}`;
			});
		
		return eval('`' + template + '`');
	}

	prepareTemplateSpecialCases(template) {
		// If you are using a RegExp object, you must double escape \s*, \$, \{, \}
		var regex = /(<table.*?>|<tbody.*?>|<thead.*?>|<tfoot.*?>|<\/tr>)\s*(\[u\].+?\[\/u\])\s*(<\/table>|<\/tbody>|<\/thead>|<\/tfoot>|<tr.*?>)/gs;
		
		return template.replace(regex, (match, p1, p2, p3) => {
			return `${p1}<tr><td>(table)${p2}</td></tr>${p3}`;	
		});
	}
	
	prepareComponentTags(template) {
		return template.replace(/<([a-z0-9_]+)([^>]*)\/>/gi, (match, p1, p2) => 
			config.classExists(p1) ? `<component type="${p1}"${p2}></component>` : match);
	}
	
	hasUpdatables(template) {
		return /\[u\].+\[\/u\]/s.test(template);
	}
	
	static removeReserved(template) {
		var regex = /\[u\]|\[\/u\]|\[lt\]|\[gt\]/g;
		while (regex.test(template)) {
			template = template.replace(regex, '');	
		}
		
		return template;
	}
	
	static sanitize(value, regex) {
		if (regex) return String(value).replace(new RegExp(regex, 'g'), '');
		
		var characters = {
			'<': '&lt;',
			'>': '&gt;',
			'{': '&lcub;',
			'}': '&rcub;',
			'[': '&lsqb;',
			']': '&rsqb;',
			'(': '&lpar;',
			')': '&rpar;',
			'@': '&commat;',
			'?': '&quest;',
			'&': '&amp;',
			'"': '&quot;',
			'\'': '&apos;',
			':': '&colon;',
			';': '&semi;',
			'.': '&period;',
			'\\': '&bsol;',
			'$': '&dollar;'
		};
		
		var re = new RegExp('[' + Util.escapeRegex(Object.keys(characters).join('')) + ']', 'g');
				
		return this.removeReserved(String(value)).replace(re, (match) => {									
			return characters[match];
		});	
	}

	prepareElement(element) {
		for (var childNode of element.childNodes) {
			switch(childNode.nodeType) {
				case Node.ELEMENT_NODE:
					if (childNode.tagName.toLowerCase() == 'component') {
						var component = this.initComponent(childNode).replace(childNode);
				
						if (childNode.hasAttribute('id'))
							this.components.setWithId(childNode.id, component);
						else
							this.components.set(component);
					}
					else
						this.prepareElement(childNode);
					
					break;
				
				case Node.TEXT_NODE:
					if (this.hasUpdatables(childNode.textContent)) 
						this.updatables.setUpdatable(UpdatableFactory.create(childNode, this));
	
    				break;
			} 
		}
		
		this.prepareAttributes(element);
	}
	
	prepareAttributes(element) {
		Array.from(element.attributes).forEach(attribute => {
			if (/^on/.test(attribute.localName)) {
				if (/\bthis\.\w+/.test(attribute.value)) {
					var template = attribute.value;
					var type = attribute.localName.replace(/^on/, '');
					
					element.addEventListener(type, event => {
						var e = event;
					
						eval(template);
					});

					element.removeAttribute(attribute.localName);
				}
			}
			else if (this.hasUpdatables(attribute.value)) {
				this.updatables.setUpdatable(UpdatableFactory.create(attribute, this));
			}
		});
	}
	
	initComponent(element) {		
		if (element.hasAttribute('src')) {
			var source = Util.getValue(Util.getProperty(this, element.getAttribute('src')));
		}
		else {
			var source = {};
			var ignore = ['id', 'type'];
			var attrs = element.attributes;
			for (var i = 0; i < attrs.length; i++) {
				if (!ignore.includes(attrs[i].name))
					source[attrs[i].name] = attrs[i].value;
			}	
		}

		var type = Util.capitalizeFirstLetter(element.getAttribute('type'));
		
		if (source instanceof AbstractComponent) {
			if (type != 'Component' && type != source.constructor.name) 
				throw `Source ${source.constructor.name} is not instanceof ${type}.`;
			
			return source.setParent(this);
		}
		else {
			if (type == 'Component') 
				throw `If type is Component, source must be instanceof AbstractComponent.`;
			
			return config.initialize(type, source).setParent(this);
		}
	}

	parse(string) {
		return new DOMParser().parseFromString(string, 'text/html').body.firstChild;
	}
	

	// Misc
	
	getComponent(id) {
		return this.components.get(id);
	}
	
	getUpdateCount() {
		return this.updateCount;
	}
	
	setFetching(value) {
		this.fetching = value;
		
		return this;
	}

	isFetching() {
		return this.fetching;
	}
	
	hide() {
		this.element.style.display = 'none';
	}
	
	show() {
		this.element.style.display = 'block';
	}
	
	querySelector(selectors) {
		return this.element.querySelector(selectors);
	}
	
	querySelectorAll(selectors) {
		return this.element.querySelectorAll(selectors);
	}	
}




















