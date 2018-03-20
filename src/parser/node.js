import htmlParser from 'parse5';

/**
 * Parse html string and return all nodes.
 *
 * @param {string} htmlString
 * @returns {Object}
 */
function parseFragment(htmlString) {
	return htmlParser.parseFragment(htmlString);
}

/**
 * Returns the node's inner html content as a string.
 *
 * @param {Node} node
 * @returns {string}
 */
function serialize(node) {
	return htmlParser.serialize(node);
}

export default { parseFragment, serialize };
