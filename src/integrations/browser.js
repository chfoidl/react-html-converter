import BaseConverter from '../base-converter';
import parser from '../parser/browser';

/**
 * ReactHTMLConverter class that uses the DOMParser to parse html.
 *
 * @export
 * @class ReactHTMLConverter
 * @extends {BaseConverter}
 */
export default class ReactHTMLConverter extends BaseConverter {
	/**
	 * Creates an instance of ReactHTMLConverter.
	 *
	 * @memberof ReactHTMLConverter
	 */
	constructor() {
		super(parser);
	}

	/**
	 * Calls parent method with DOMParser as parser.
	 *
	 * @static
	 * @param {string} htmlString
	 * @returns {Array}
	 * @memberof ReactHTMLConverter
	 */
	static convertStatic(htmlString) {
		return super.convertStatic(htmlString, parser);
	}
}
