
import {AbstractValuesContainerFactory} from './AbstractValuesContainerFactory.js';
import {ValuesContainer} from '../ValuesContainer.js';

export class ValuesContainerFactory extends AbstractValuesContainerFactory {
	
	create(values) {
		return new ValuesContainer(values);
	}
}
