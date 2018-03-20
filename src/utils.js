import React from 'react';
import convert from 'react-attr-converter';
import { getComponent } from './component-manager';

const NODE_TYPE_TEXT = '#text';
const NODE_TYPE_COMMENT = '#comment';

/**
 * Returns an array of a node's child nodes.
 *
 * @export
 * @param {Node} rootNode
 * @returns {Array}
 */
export function traverseNodeTree(rootNode) {
	const nodeTree = [];

	for (let i = 0; i < rootNode.childNodes.length; i++) {
		nodeTree.push(convertNode(rootNode.childNodes[i], i));
	}

	return (nodeTree.length === 1) ? nodeTree[0] : nodeTree;
}

/**
 * Converts a node.
 * If the node is of either type text or comment, the value will be returned.
 * Otherwise the node will be converted to a React element or component.
 *
 * @export
 * @param {Node} node
 * @param {number} key
 * @returns {string|Object}
 */
export function convertNode(node, key) {
	if (node.nodeName === NODE_TYPE_TEXT || node.nodeName === NODE_TYPE_COMMENT) {
		return node.value || node.nodeValue;
	}

	const component = getComponent(node.nodeName);
	const attributes = convertAttributes(node.attrs || node.attributes, key);
	const tagName = component ? component : node.tagName.toLowerCase();

	if (node.childNodes.length === 0) {
		return React.createElement(tagName, attributes);
	}

	const children = [];

	for (let i = 0; i < node.childNodes.length; i++) {
		children.push(convertNode(node.childNodes[i], i));
	}

	return React.createElement(tagName, attributes, children);
}

/**
 * Convert the node's attributes to their React counterpart.
 *
 * @export
 * @param {Array} attrs
 * @param {number} key
 * @returns {Object}
 */
export function convertAttributes(attrs, key) {
	const attributes = { key };

	if (!attrs) return attributes;

	for (let i = 0; i < attrs.length; i++) {
		const attrName = convert(attrs[i].name);
		attributes[attrName] = (attrName === 'style') ? convertStylesToObject(attrs[i].value) : attrs[i].value;
	}

	return attributes;
}

/**
 * Convert inline styles to the React version.
 *
 * @export
 * @param {string} styleString
 * @returns {Object}
 */
export function convertStylesToObject(styleString) {
	const styles = styleString.split(';').reduce((obj, styleDeclaration) => {
		if (styleDeclaration) {
			const parts = styleDeclaration.split(':');
			const key = parts[0].trim();
			const keyArray = Array.from(key);

			Array.from(key).forEach((char, index) => {
				if (char === '-') {
					keyArray[index + 1] = keyArray[index + 1].toUpperCase();
					keyArray[index] = null;
				}
			});

			obj[keyArray.join('')] = parts[1];
		}

		return obj;
	}, {});

	return styles;
}

