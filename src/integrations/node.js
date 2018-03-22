import { BaseConverter, baseConvertStatic } from '../base-converter';
import parser from '../parser/node';

export const ReactHTMLConverter = () => BaseConverter(parser);
export const convertStatic = htmlString => baseConvertStatic(htmlString, parser);
