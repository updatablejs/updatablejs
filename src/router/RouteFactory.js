
import {Segment} from './Segment.js';
import {Literal} from './Literal.js';

export class RouteFactory {
	
	static create(values) {
		return 'models' in values ? new Segment(values) : new Literal(values);
	}
}
