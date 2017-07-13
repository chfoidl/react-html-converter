import test from 'ava';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactHTMLConverter from '../index';

const Test = React.createClass({
	render() {
		return React.createElement('div', null, this.props.text);
	}
});

const renderTest = (t, reactEl, expectedHTML) => {
	t.is(ReactDOMServer.renderToStaticMarkup(reactEl), expectedHTML);
};

test('returns a single React element rendering a provided HTML', t => {
	const converter = new ReactHTMLConverter();
	const html = '<div id="root"> <ul> <li>item-1</li> <li>item-2</li> <li>item-3</li> <li>item-4</li> <li>item-5</li> </ul> </div>';

	renderTest(t, converter.convert(html), html);
});

test('returns an array of React elements if serveral sibling nodes are provided', t => {
	const converter = new ReactHTMLConverter();
	const elements = converter.convert('<li>item-1</li><li>item-2</li><li>item-3</li><li>item-4</li><li>item-5</li>');

	t.is(elements.length, 5);
	renderTest(t, elements[0], '<li>item-1</li>');
	renderTest(t, elements[2], '<li>item-3</li>');
});

test('parse react component from string', t => {
	const converter = new ReactHTMLConverter();
	converter.registerComponent('test', Test);

	const element = converter.convert('<Test text="hello world" />');

	renderTest(t, element, '<div>hello world</div>');
});

test('parse as static html', t => {
	const converter = new ReactHTMLConverter();
	const html = '<ul class="list"><li>Text1</li><li>Text2</li></ul>';

	renderTest(t, converter.convertStatic(html), html);
});

test('parse as static html with multiple siblings', t => {
	const converter = new ReactHTMLConverter();
	const html = '<ul class="list"><li>Text1</li><li>Text2</li></ul><div>Sibling</div>';

	renderTest(t, converter.convertStatic(html), `<div>${html}</div>`);
});

test('parse styles', t => {
	const converter = new ReactHTMLConverter();
	const html = '<div style="background-color: #fff;"></div>';

	renderTest(t, converter.convert(html), html);
});

test('parse comment as undefined', t => {
	const converter = new ReactHTMLConverter();

	t.falsy(converter.convert('<!-- comment -->'));
});

test('return text as is', t => {
	const converter = new ReactHTMLConverter();
	const text = 'i am pure text';

	t.is(converter.convert(text), text);
});
