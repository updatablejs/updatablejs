

export class AbstractController {
	
	app;
	
	constructor(app) {
		this.app = app;
	}

	get(name, values) {
		return this.app.get(name, values);
    }
}
