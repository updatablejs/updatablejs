

export class AbstractComponentCallbacks {

	callbacks = {};
	
	onCreate() {
		if ('onCreate' in this.callbacks)
			this.callbacks.onCreate(this);
	}
	
	onRecreate() {
		if ('onRecreate' in this.callbacks)
			this.callbacks.onRecreate(this);
	}
	
	onAttach() {
		if ('onAttach' in this.callbacks)
			this.callbacks.onAttach(this);
	}

	onAncestorAttach(ancestor) {
		if ('onAncestorAttach' in this.callbacks)
			this.callbacks.onAncestorAttach(ancestor, this);
	}
	
	triggerOnAncestorAttach(ancestor) {}
	
	onDetach() {
		if ('onDetach' in this.callbacks)
			this.callbacks.onDetach(this);
	}
	
	onUpdate() {
		if ('onUpdate' in this.callbacks)
			this.callbacks.onUpdate(this);
	}
}
