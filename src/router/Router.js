
import {AbstractRouteList} from './AbstractRouteList.js';

export class Router extends AbstractRouteList {
	
	constructor(routes) {
		super();
		
		if (routes) 
			this.setRoutes(routes);
	}
	
	getRoute(key) {
		var keys = key.split('.');
		
		var route = super.getRoute(keys.shift());
		
		if (!route) return null;
	
		for (var key of keys){
			if (!(route = route.getRoute(key)))
				return null;
		}

		return route;
	}
}

// Uncaught ReferenceError: can't access lexical declaration 'AbstractRouteList' before initialization.
import {AbstractRoute} from './AbstractRoute.js';
import {RouteFactory} from './RouteFactory.js';

AbstractRouteList.prototype.setRoute = function(key, route) {
	if (!(route instanceof AbstractRoute))
		route = RouteFactory.create(route);
	
	this.routes[key] = route.setParent(this);
		
	return this;
}
