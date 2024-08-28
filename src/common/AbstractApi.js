
import {Fetcher} from './Fetcher.js';

export class AbstractApi {
	
	getFetcher(resource, init) {
		return new Fetcher(resource, init);
	}
}
