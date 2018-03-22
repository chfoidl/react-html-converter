import jsdom from 'jsdom';
const { JSDOM } = jsdom;

global.DOMParser = class DOMParserMock {
	parseFromString(html) {
		const dom = new JSDOM(html);
		return dom.window.document;
	}
}

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactHTMLConverter, { convertStatic } from '../src/integrations/browser';

class Test extends React.Component {
	render() {
		return <div>{this.props.text}</div>;
	}
}

const renderTest = (reactEl, expectedHTML) => {
	expect(ReactDOMServer.renderToStaticMarkup(reactEl)).toBe(expectedHTML);
};

describe('main:node', () => {
	it('should return a single React element rendering a provided HTML', () => {
		const converter = ReactHTMLConverter();
		const html = '<div id="root"> <ul> <li>item-1</li> <li>item-2</li> <li>item-3</li> <li>item-4</li> <li>item-5</li> </ul> </div>';

		renderTest(converter.convert(html), html);
	});

	it('should return an array of React elements if serveral sibling nodes are provided', () => {
		const converter = ReactHTMLConverter();
		const elements = converter.convert('<li>item-1</li><li>item-2</li><li>item-3</li><li>item-4</li><li>item-5</li>');

		expect(elements.length).toBe(5);
		renderTest(elements[0], '<li>item-1</li>');
		renderTest(elements[2], '<li>item-3</li>');
	});

	it('should parse react component', () => {
		const converter = ReactHTMLConverter();
		converter.registerComponent('test', Test);

		const element = converter.convert('<Test text="hello world" />');

		renderTest(element, '<div>hello world</div>');
	});

	it('should parse as static html', () => {
		const html = '<ul class="list"><li>Text1</li><li>Text2</li></ul>';

		renderTest(convertStatic(html), html);
	});

	it('should parse as static html with multiple siblings', () => {
		const html = '<ul class="list"><li>Text1</li><li>Text2</li></ul><div>Sibling</div>';

		renderTest(convertStatic(html), `<div>${html}</div>`);
	});

	it('should parse styles', () => {
		const converter = ReactHTMLConverter();
		const html = '<div style="background-color:#fff"></div>';

		renderTest(converter.convert(html), html);
	});

	it('should parse comment as undefined', () => {
		const converter = ReactHTMLConverter();

		expect(converter.convert('<!-- comment -->')).toBeFalsy();
	});

	it('should return text as is', () => {
		const converter = ReactHTMLConverter();
		const text = 'i am pure text';

		expect(converter.convert(text)).toBe(text);
	});
});
