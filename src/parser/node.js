import htmlParser from 'parse5';

const parseFragment = (htmlString) => {
	return htmlParser.parseFragment(htmlString);
}

const serialize = (node) => {
	return htmlParser.serialize(node);
}

export default { parseFragment, serialize };
