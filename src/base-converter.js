/* global Map */

import React from 'react';
import { traverseNodeTree, convertAttributes } from './utils';

export function BaseConverter(parser) {
	const registeredComponents = new Map();

	return {
		/**
		 * Convert a html string to React elements or components.
		 *
		 * @param {String} htmlString
		 * @returns {Array|null}
		 */
		convert: htmlString => {
			if (typeof htmlString !== 'string') {
				return null;
			}

			const html = parser.parseFragment(htmlString);

			if (html.childNodes.length > 0) {
				return traverseNodeTree(html, registeredComponents);
			}

			return null;
		},

		/**
		 * Register a React component.
		 *
		 * @param {String} name
		 * @param {React.Component} componentClass
		 */
		registerComponent: (name, componentClass) => {
			registeredComponents.set(name.toLowerCase(), componentClass);
		}
	}
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
 * @export
 * @param {String} htmlString
 * @param {Object} parser
 * @returns {Node|null}
 */
export function baseConvertStatic(htmlString, parser) {
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
