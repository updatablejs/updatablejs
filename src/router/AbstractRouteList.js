
// Uncaught ReferenceError: can't access lexical declaration 'AbstractRouteList' before initialization.
//import {RouteFactory} from './RouteFactory.js';
//import {AbstractRoute} from './AbstractRoute.js';
import {ValuesContainerFactory} from './valuesContainer/valuesContainerFactory/ValuesContainerFactory.js';

export class AbstractRouteList {

	routes = {};	
	valuesContainerFactory;

	match(url) {
		for (var route of Object.values(this.routes)) {
			var result = route.match(url);
			
			if (result) return result;
		}
	}
	
	setRoutes(routes) {
		for (var [key, route] of Object.entries(routes)) {
			this.setRoute(key, route);
		}
		
		return this;
	}
	
	// Uncaught ReferenceError: can't access lexical declaration 'AbstractRouteList' before initialization.
	/*setRoute(key, route) {
		if (!(route instanceof AbstractRoute))
			route = RouteFactory.create(route);
			
		this.routes[key] = route.setParent(this);
		
		return this;
	}*/
	
	getRoute(key) {
		return key in this.routes ? this.routes[key] : null;
	}
	
	getValuesContainerFactory() {
		if (!this.valuesContainerFactory)
			this.valuesContainerFactory = new ValuesContainerFactory();
		
		return this.valuesContainerFactory;
	}
	
	setValuesContainerFactory(valuesContainerFactory) {
		this.valuesContainerFactory = valuesContainerFactory;
		
		return this;
	}
}
