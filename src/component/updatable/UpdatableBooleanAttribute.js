
import {Updatable} from './Updatable.js';
import {Util} from '../../common/Util.js';

// https://stackoverflow.com/questions/10650233/checked-checked-vs-checked-true
// https://stackoverflow.com/questions/426258/setting-checked-for-a-checkbox-with-jquery/5916151#5916151
export class UpdatableBooleanAttribute extends Updatable {
	
	attribute;
	element;

	constructor(attribute, component) {
		super(component);
		this.attribute = attribute;
		this.setTemplate(attribute.value.replace(/^\(bool\)/, ''));
		this.element = attribute.ownerElement;
		this.element.removeAttributeNode(attribute);
	}

	update() {
		var value = this.generateContent();
		if (Util.isString(value))
			value = value.trim();
			
		if (value) {
			this.attribute.value = value;
			this.element.setAttributeNode(this.attribute);
			this.element[this.attribute.localName] = true;
		}
		else if (this.element.hasAttribute(this.attribute.localName)) {
			this.element.removeAttributeNode(this.attribute);
			this.element[this.attribute.localName] = false;
		}
	}
}
