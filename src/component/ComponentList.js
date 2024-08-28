

export class ComponentList {
	
	components = [];
	idsToComponents = {};
	
	set(component) {
		this.components.push(component);
		
		return this;
	}
	
	setWithId(id, component) {
		this.set(component);
		
		this.idsToComponents[id] = component;
		
		return this;
	}
	
	get(id) {
		return id in this.idsToComponents ? this.idsToComponents[id] : null;
	}
	
	has(id) {
		return id in this.idsToComponents;
	}
	
	update() {
		for (var component of this.components) {
    		component.update();
		}

		return this;
	}
	
	deepUpdate() {
		for (var component of this.components) {
    		component.deepUpdate();
		}

		return this;
	}
	
	removeComponents(components) {
		this.components = this.components.filter(component => !components.includes(component));
		
		for (var id of Object.keys(this.idsToComponents)) {
			if (components.includes(this.idsToComponents[id]))
				 delete this.idsToComponents[id];
		}
		
		return this;
	}
	
	intersect(components) {
		if (components instanceof this.constructor)
			components = components.toArray();
		
		this.components = this.components.filter(component => components.includes(component));
		
		for (var id of Object.keys(this.idsToComponents)) {
			if (!components.includes(this.idsToComponents[id]))
				 delete this.idsToComponents[id];
		}
		
		return this;
	}
	
	toArray() {
		return this.components;
	}
	
	clone() {
		var ob = new this.constructor();
		ob.components = [...this.components];
		Object.assign(ob.idsToComponents, this.idsToComponents);
		
		return ob;
	}
}
