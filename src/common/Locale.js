
import {Util} from './Util.js';

// https://www.i18next.com/
export class Locale {

	translations = {};
	
	constructor(translations) {		
		if (translations)
			this.setTranslations(translations);
	}
	
	setTranslations(translations) {
		Object.assign(this.translations, translations);
	
		return this;
	}

	// options = {'plural' => 0, 1, 2, 3 ...};
	translate(value, values, options) {
		if (this.hasTranslation(value))
			value = this.translations[value];
		
		if (values) {
			value = value.replace(/\{\{([^}]+)\}\}/g, (match, p1) => {	
				var value = Util.getProperty(values, p1);

				return value !== undefined ? value : `{{${p1}}}`;
			});
		}

		return value;
	}
	
	hasTranslation(value) {
   		return value in this.translations;
	}
}
