import React from 'react';
import { registerComponent } from './component-manager';
import { traverseNodeTree, convertAttributes } from './utils';

/**
 * BaseConverter class.
 * Holds all methods shared by all integrations.
 *
 * @export
 * @class BaseConverter
 */
export default class BaseConverter {
	/**
	 * Creates an instance of BaseConverter.
	 * Parser will be passed by integration classes.
	 *
	 * @param {Object} parser
	 * @memberof BaseConverter
	 */
	constructor(parser) {
		this.parser = parser;
	}

	/**
	 * Register a react component with the given name.
	 *
	 * @param {string} name
	 * @param {any} componentClass
	 * @memberof BaseConverter
	 */
	registerComponent(name, componentClass) {
		registerComponent(name, componentClass);
	}

	/**
	 * Parse the html string and traverse the resulting nodes.
	 * Returns an array of React elements or components.
	 *
	 * @param {string} htmlString
	 * @returns
	 * @memberof BaseConverter
	 */
	convert(htmlString) {
		if (typeof htmlString !== 'string') {
			return null;
		}

		const html = this.parser.parseFragment(htmlString);

		if (html.childNodes.length > 0) {
			return traverseNodeTree(html);
		}

		return null;
	}

	/**
	 * Parse the html string with the specified parser.
	 * If the html string has only one root node, the root node
	 * will be converted to a React element. The child nodes will
	 * be addes as innerHTML.
	 *
	 * If more than one root nodes are present, the root nodes will
	 * be added as child nodes to a div element.
	 *
	 * Please note that React is not aware of the child nodes.
	 * If you need React to be aware of the child nodes, you probably
	 * want to use the non-static convert method.
	 *
	 * @static
	 * @param {string} htmlString
	 * @param {Object} parser
	 * @returns
	 * @memberof BaseConverter
	 */
	static convertStatic(htmlString, parser) {
		if (typeof htmlString !== 'string') {
			return null;
		}

		const html = parser.parseFragment(htmlString);

		if (html.childNodes.length > 0) {
			let rootNode;

			if (html.childNodes.length === 1) {
				const node = html.childNodes[0];
				rootNode = React.createElement(node.nodeName.toLowerCase(), Object.assign({
					dangerouslySetInnerHTML: {
						__html: parser.serialize(node)
					}
				}, convertAttributes(node.attrs || node.attributes, 0)));
			} else {
				rootNode = React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlString } });
			}

			return rootNode;
		}

		return null;
	}
}
