/* global DOMParser */
/* global XMLSerializer */

const parseFragment = (htmlString) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, 'text/html');
	return doc.body;
}

const serialize = (node) => {
	return node.innerHTML;
}

export default { parseFragment, serialize };
