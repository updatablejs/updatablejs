

export class UpdatableList {
	
	updatables = [];
	
	setUpdatables(updatables) {
		this.updatables = this.updatables.concat(updatables);
		
		return this;
	}
	
	setUpdatable(updatable) {
		this.updatables.push(updatable);
		
		return this;
	}
	
	getUpdatables() {
		return this.updatables;
	}
	
	update() {
		var singleUse = [];
		for (var updatable of this.updatables) {
			if (updatable.isSingleUse())
				singleUse.push(updatable);
			
			updatable.update();
		}
		
		if (singleUse.length)
			this.removeUpdatables(singleUse);
	}

	remove(updatable) {
		this.updatables = this.updatables.filter(u => u != updatable);
	}

	removeUpdatables(updatables) {
		this.updatables = this.updatables.filter(updatable => !updatables.includes(updatable));
		
		return this;
	}
	
	isEmpty() {
		return !this.updatables.length;
	}
}
