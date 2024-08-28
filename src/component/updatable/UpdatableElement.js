
import {AbstractUpdatableElement} from './AbstractUpdatableElement.js';

export class UpdatableElement extends AbstractUpdatableElement {

	constructor(element, component) {
		super(component);
		this.parentElement = element.parentNode;
		this.previousSibling = element.previousSibling;
		this.elements = [element];
		this.setTemplate(element.textContent);
	}
}
