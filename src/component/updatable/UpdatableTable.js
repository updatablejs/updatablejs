
import {AbstractUpdatableElement} from './AbstractUpdatableElement.js';

export class UpdatableTable extends AbstractUpdatableElement {
	
	constructor(element, component) {
		super(component);
		this.setTemplate(element.textContent.replace(/^\(table\)/, ''));
		var tr = element.parentNode.closest('tr');
		this.previousSibling = tr.previousSibling;
		this.parentElement = tr.parentNode;
		tr.remove();
	}

	parse(string) {	
		return super.parse(`<table><tbody>${string}</tbody></table>`).querySelector('tbody');
	}
}
