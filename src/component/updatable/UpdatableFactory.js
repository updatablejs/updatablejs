
import {UpdatableElement} from './UpdatableElement.js';
import {UpdatableTable} from './UpdatableTable.js';
import {UpdatableAttribute} from './UpdatableAttribute.js';
import {UpdatableBooleanAttribute} from './UpdatableBooleanAttribute.js';

export class UpdatableFactory {
	
	static create(node, component) {
		switch(node.nodeType) {
			case Node.TEXT_NODE:
				return /^\(table\)/.test(node.textContent) ? 
					new UpdatableTable(node, component) : new UpdatableElement(node, component);
					
			case Node.ATTRIBUTE_NODE:
				var booleanAttributes = ['checked', 'selected'];
				
				return booleanAttributes.includes(node.localName) || /^\(bool\)/.test(node.value) ? 
					new UpdatableBooleanAttribute(node, component) : new UpdatableAttribute(node, component);

			default:
   				throw `Unknown node type ${node.nodeType}.`;
		}
	}
}
