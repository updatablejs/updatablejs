

export class Fetcher {
	
	resource;
	init;
	contentType = 'json';
	callbacks = { // https://stackoverflow.com/questions/56901106/fetch-then-after-catch-still-be-called-even-be-catched
		'then': [],
		'catch': [],
		'finally': []
	};
	
	constructor(resource, init) {		
		this.resource = resource;
		this.init = init;
	}
	
	setContentType(contentType) {
		this.contentType = contentType;
		
		return this;
	}
	
	fetch() {
		var response = fetch(this.resource, this.init).then(response => {
			if (!response.ok)
				throw new Error('HTTP error! status: ' + response.status);
			
			return this.contentType ? response[this.contentType]() : response;
		});	
		
		Object.entries(this.callbacks).forEach(([type, callbacks]) => {
			if (type == 'catch') {
				if (callbacks.length) {
					response = response.catch(error => {
						for (var callback of callbacks) {
							callback(error);
						}
					});
				}
			}
			else {
				for (var callback of callbacks) {
					response = response[type](callback);
				}
			}	
		});

		return response;	
	}
	
	then(callback) {
		this.callbacks['then'].push(callback);
		
		return this;
	}
	
	catch(callback) {
		this.callbacks['catch'].push(callback);
		
		return this;
	}
	
	finally(callback) {
		this.callbacks['finally'].push(callback);
		
		return this;
	}
}
