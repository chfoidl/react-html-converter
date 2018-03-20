import BaseConverter from '../base-converter';
import parser from '../parser/node';

/**
 * ReactHTMLConverter class that uses parse5 to parse html.
 *
 * @export
 * @class ReactHTMLConverter
 * @extends {BaseConverter}
 */
export default class ReactHTMLConverter extends BaseConverter {
	/**
	 * Creates an instance of ReactHTMLConverter with parse5 as parser.
	 * @memberof ReactHTMLConverter
	 */
	constructor() {
		super(parser);
	}

	/**
	 * Calls parent method with parse5 as parser.
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
