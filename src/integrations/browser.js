import { BaseConverter, baseConvertStatic } from '../base-converter';
import parser from '../parser/browser';

export const ReactHTMLConverter = () => BaseConverter(parser);
export const convertStatic = htmlString => baseConvertStatic(htmlString, parser);
