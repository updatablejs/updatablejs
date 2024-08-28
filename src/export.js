

// Component

import {Component} from './component/Component.js';
export {Component};
export {Updatable} from './component/updatable/Updatable.js';
export {Switch} from './component/Switch.js';
export {Layout} from './component/Layout.js';


// Common

export {AbstractApp} from './common/AbstractApp.js';
export {AbstractApi} from './common/AbstractApi.js';
export {LayoutManager} from './common/LayoutManager.js';
export {Chronometer} from './common/Chronometer.js';
export {AbstractController} from './common/AbstractController.js';
export {Fetcher} from './common/Fetcher.js';
export {Locale} from './common/Locale.js';
export {Util} from './common/Util.js';


// Resources

export {Resources} from './resources/Resources.js';


// Router

export {Router} from './router/Router.js';
export {AbstractValuesContainerFactory} from './router/valuesContainer/valuesContainerFactory/AbstractValuesContainerFactory.js';
export {AbstractValuesContainer} from './router/valuesContainer/AbstractValuesContainer.js';


// Events

export {Events} from './events/Events.js';


// Config

export var config = {
	initialize: undefined,
	classExists: undefined,
};


// Functions

export function _(value, regex) {
	return Component.sanitize(value, regex);
}

export function ___(value) {
	return Component.sanitize(Component.sanitize(value));
}


// Misc

// https://www.w3schools.com/tags/ref_eventattributes.asp
export var events = [
	// Window Events
	'onafterprint', 'onbeforeprint', 'onbeforeunload', 'onerror', 'onhashchange', 'onload', 'onmessage', 'onoffline', 
	'ononline', 'onpagehide', 'onpageshow', 'onpopstate', 'onresize', 'onstorage', 'onunload', 
		
	// Form Events
	'onblur', 'onchange', 'oncontextmenu', 'onfocus', 'oninput', 'oninvalid', 'onreset', 'onsearch', 'onselect', 'onsubmit', 
		
	// Keyboard Events
	'onkeydown', 'onkeypress', 'onkeyup', 
	
	// Mouse Events
	'onclick', 'ondblclick', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onwheel', 
	
	// Drag Events
	'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onscroll', 
	
	// Clipboard Events
	'oncopy', 'oncut', 'onpaste', 
	
	// Media Events
	'onabort', 'oncanplay', 'oncanplaythrough', 'oncuechange', 'ondurationchange', 'onemptied', 'onended', 'onloadeddata', 
	'onloadedmetadata', 'onloadstart', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onseeked', 'onseeking', 
	'onstalled', 'onsuspend', 'ontimeupdate', 'onvolumechange', 'onwaiting', 
	
	// Misc Events
	'ontoggle'
];
