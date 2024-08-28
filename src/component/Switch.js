
import {AbstractComponent} from './AbstractComponent.js';

export class Switch extends AbstractComponent {

	_selected;
	
	setDefaults() {
		super.setDefaults();
		
		this.setSettersEnabled(true);
		
		this.set({	
			selected: null, // key, (component) => {}
			components: {}
		});
	}

	setSelected(key) {
		this.selected = key;
		
		return this;
	}
	
	getComponent(key) {
		return this.components[key];
	}
	
	setComponents(components) { 
		if (!this.components) this.components = {};
		
		for (var key of Object.keys(components)) {
			this.setComponent(key, components[key]);
		}
		
		return this;
	}
	
	setComponent(key, component) {
		this.components[key] = component.setParent(this);
		
		return this;
	}
	
	getSelected() {
		if (!this._selected) 
			this._selected = this._getSelectedComponent();
		
		return this._selected;
	}
	
	select(key) {
		if (key) this.setSelected(key);
		
		var selected = this._getSelectedComponent();
		if (selected != this.getSelected()) {
			if (this.getSelected().isAttached()) {
				selected.replace(this.getSelected().getElement());	
				this.getSelected().detach();
			}
			
			this._selected = selected;
		}
		
		return this;
	}
	
	_getSelectedComponent() {
		if (typeof this.selected == 'function')
			return this.components[this.selected()];
		
		return this.selected !== null ? 
			this.components[this.selected] : 
			this.components[Object.keys(this.components).shift()];
	}
	
	
	// Override
	
	attachTo(element) {
		this.getSelected().attachTo(element);
		
		return this;
	}
	
	appendTo(element) {
		this.getSelected().appendTo(element);
		
		return this;
	}
	
	triggerOnAncestorAttach(ancestor) {
		this.getSelected().triggerOnAncestorAttach(ancestor);
		
		return this;
	}
	
	prependTo(element) {
		this.getSelected().prependTo(element);
		
		return this;
	}
	
	attachAfter(element) {
		this.getSelected().attachAfter(element);
		
		return this;
	}
	
	replace(element) {
		this.getSelected().replace(element);
		
		return this;
	}
		
	recreate() {
		this.getSelected().recreate();

		return this;
	}

	detach() {
		this.getSelected().detach();
		
		return this;
	}

	update(values) {
		this.getSelected().update(values);

		return this;
	}
	
	deepUpdate(values) {
		this.getSelected().deepUpdate(values);

		return this;
	}

	isCreated() {
		return this.getSelected().isCreated();
	}

	isAttached() {
		return this.getSelected().isAttached();
	}
	
	getElement() {
		return this.getSelected().getElement();
	}
	
	hide() {
		this.getSelected().hide();
		
		return this;
	}
	
	show() {
		this.getSelected().show();
		
		return this;
	}
}
