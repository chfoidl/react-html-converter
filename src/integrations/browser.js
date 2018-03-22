import { BaseConverter, baseConvertStatic } from '../base-converter';
import parser from '../parser/browser';

export default () => BaseConverter(parser);
export const convertStatic = htmlString => baseConvertStatic(htmlString, parser);
