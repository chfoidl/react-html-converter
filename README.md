# react-html-converter [![Build Status](https://travis-ci.org/Sethorax/react-html-converter.svg?branch=master)](https://travis-ci.org/Sethorax/react-html-converter) [![npm version](https://badge.fury.io/js/react-html-converter.svg)](https://badge.fury.io/js/react-html-converter)

This module converts a raw HTML string to a React element or an array of React elements. Component rendering is also supported.

## Installation

Install via **npm**:  
`npm install --save react-html-converter`

or **yarn**:  
`yarn add react-html-converter`

## Example

```js
import React from 'react';
import ReactHTMLConverter from 'react-html-converter';

class Test extends React.Component {
    render() (
        return <div>{this.props.text}</div>;
    );
}

const converter = new ReactHTMLConverter();
converter.registerComponent('test', Test);

const html = '<div class="my-div"><Test text="Hello World" /></div>';

class App extends React.Component {
    render() {
        return (
            <div className="my-app">
                {converter.convert(html)}
            </div>
        );
    }
}
```

As shown in the above example the ReactHTMLConverter just takes a simple HTML string as an argument and returns a React element or an array of React elements. Those elements can then be easily used in other React components.

The ReactHTMLConverter is also able to create React components from the HTML string. To make this work all components must be registered in the converter before converting the HTML string. Just pass in the name of the component's tag and the component itself and the converter will convert those components if they appear in the HTML string.

Please note that any sibling nodes of a React component will not be rendered! Make sure to wrap the component with a div element.

## Disclosure

This module was heavily inspired by [react-render-html](https://github.com/noraesae/react-render-html).

## License

[MIT](LICENSE)