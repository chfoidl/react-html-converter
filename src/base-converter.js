import React from 'react';
import { registerComponent } from './component-manager';
import { traverseNodeTree, convertAttributes } from './utils';

export default class BaseConverter {
	constructor(parser) {
		this.parser = parser;
	}

	registerComponent(name, componentClass) {
		registerComponent(name, componentClass);
	}

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
