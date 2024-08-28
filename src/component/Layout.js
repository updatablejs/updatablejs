
import {Component} from './Component.js';

export class Layout extends Component {

	parse(string) {
		return new DOMParser().parseFromString(string, 'text/html').body;
	}
}
