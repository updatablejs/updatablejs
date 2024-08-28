

export class Util {
	
	static capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	static trimStart(string, trim) {
   		if (trim === undefined)
        	trim = '\\s';
    	
		return string.replace(new RegExp('^[' + trim + ']*'), '');
	}
	
	static trimEnd(string, trim) {
   		if (trim === undefined)
        	trim = '\\s';
    	
		return string.replace(new RegExp('[' + trim + ']*$'), '');
	}
	
	static isString(value) {
		return typeof value == 'string' || value instanceof String;
	}
	
	static hasTemplatePlaceholders(string) {
		return /\$\{.+\}/s.test(string);
	}
	
	static isEmptyObject(object) {
    	return Object.keys(object).length == 0;
	}
	
	static isObject(value) {
    	return typeof value == 'object' && value !== null;
	}
	
	static getProperty(object, keys, defaultValue) {
		if (!Array.isArray(keys))
			keys = keys.split('.');
		
		for (var key of keys) {
			if (!this.isObject(object)) 
				return defaultValue;
			
			object = object[key];
		}
		
		return object;
	}
	
	static getValue(value, ...args) {
		return typeof value == 'function' ? value(...args) : value;
	}
	
	static formatNumber(number) {
		if (typeof number != 'number') return number;
		
		var decimals;
		switch (true) {
			case number > 1000:
				decimals = 0;
				break;
				
			case number > 100:
				decimals = 1;
				break;
			  
			case number > 10:
				decimals = 2;
				break;
			  
			case number > 1:
				decimals = 4;
				break;
			  
			default:
				decimals = 16;
		}
		
		return number.toLocaleString(undefined, {maximumFractionDigits: decimals});
	}
	
	static escapeRegex(string) {
		return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); 
	}
	
	static isAbsolutePath(path) {
		return /^[/\\]/.test(path);
	}
	
	isPath(path) {
		return /[/\\]/.test(path);
	}
}
