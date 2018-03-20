/* global DOMParser */
/* global XMLSerializer */

/**
 * Parse html string with DOMParser and return all nodes.
 *
 * @param {string} htmlString
 * @returns {Object}
 */
function parseFragment(htmlString) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, 'text/html');
	return doc.body;
}

/**
 * Returns the node's inner html content as a string.
 *
 * @param {Node} node
 * @returns {string}
 */
function serialize(node) {
	return node.innerHTML;
}

export default { parseFragment, serialize };
