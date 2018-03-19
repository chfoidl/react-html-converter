import BaseConverter from '../base-converter';
import parser from '../parser/node';

export default class ReactHTMLConverter extends BaseConverter {
	constructor() {
		super(parser);
	}

	static convertStatic(htmlString) {
		return super.convertStatic(htmlString, parser);
	}
}
