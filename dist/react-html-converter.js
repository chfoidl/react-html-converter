'use strict';

var React = require('react');
var htmlParser = require('parse5');
var convert = require('react-attr-converter');

var NODE_TYPE_TEXT = '#text';
var NODE_TYPE_COMMENT = '#comment';

var components = {};

var convertStylesToObject = function convertStylesToObject(styleString) {
	var styles = styleString.split(';').reduce(function (obj, styleDeclaration) {
		if (styleDeclaration) {
			var parts = styleDeclaration.split(':');
			var key = parts[0].trim();
			var keyArray = Array.from(key);

			Array.from(key).forEach(function (char, index) {
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

var convertAttributes = function convertAttributes(attrs, key) {
	return attrs.reduce(function (result, attr) {
		var attrName = convert(attr.name);

		result[attrName] = attrName === 'style' ? convertStylesToObject(attr.value) : attr.value;

		return result;
	}, { key: key });
};

var convertNode = function convertNode(node, key) {
	if (node.nodeName === NODE_TYPE_TEXT) {
		return node.value;
	}

	if (node.nodeName === NODE_TYPE_COMMENT) {
		return node.value;
	}

	var attributes = convertAttributes(node.attrs, key);
	var tagName = Object.prototype.hasOwnProperty.call(components, node.nodeName) ? components[node.nodeName] : node.tagName;

	if (node.childNodes.length === 0) {
		return React.createElement(tagName, attributes);
	}

	var children = node.childNodes.map(convertNode);
	return React.createElement(tagName, attributes, children);
};

var traverse = function traverse(rootNode) {
	var nodeTree = rootNode.childNodes.map(convertNode);

	return nodeTree.length === 1 ? nodeTree[0] : nodeTree;
};

function ReactHTMLConverter() {}

ReactHTMLConverter.prototype.registerComponent = function (name, componentClass) {
	components[name] = componentClass;
};

ReactHTMLConverter.prototype.convert = function (htmlString) {
	if (typeof htmlString !== 'string') {
		return null;
	}

	var html = htmlParser.parseFragment(htmlString);

	if (html.childNodes.length > 0) {
		return traverse(html);
	}

	return null;
};

ReactHTMLConverter.prototype.convertStatic = function (htmlString) {
	if (typeof htmlString !== 'string') {
		return null;
	}

	var html = htmlParser.parseFragment(htmlString);

	if (html.childNodes.length > 0) {
		var rootNode = void 0;

		if (html.childNodes.length === 1) {
			var node = html.childNodes[0];
			rootNode = React.createElement(node.nodeName, Object.assign({
				dangerouslySetInnerHTML: {
					__html: htmlParser.serialize(node)
				}
			}, convertAttributes(node.attrs, 0)));
		} else {
			rootNode = React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlString } });
		}

		return rootNode;
	}

	return null;
};

module.exports = ReactHTMLConverter;
