import React from 'react';
import convert from 'react-attr-converter';
import { getComponent } from './component-manager';

const NODE_TYPE_TEXT = '#text';
const NODE_TYPE_COMMENT = '#comment';

export const traverseNodeTree = rootNode => {
	const nodeTree = [];

	for (let i = 0; i < rootNode.childNodes.length; i++) {
		nodeTree.push(convertNode(rootNode.childNodes[i]));
	}

	return (nodeTree.length === 1) ? nodeTree[0] : nodeTree;
};

export const convertNode = (node, key) => {
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
		children.push(convertNode(node.childNodes[i]));
	}

	return React.createElement(tagName, attributes, children);
};

export const convertAttributes = attrs => {
	const attributes = [];

	if (!attrs) return attributes;

	for (let i = 0; i < attrs.length; i++) {
		const attrName = convert(attrs[i].name);
		attributes[attrName] = (attrName === 'style') ? convertStylesToObject(attrs[i].value) : attrs[i].value;
	}

	return attributes;
};

export const convertStylesToObject = styleString => {
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
};

