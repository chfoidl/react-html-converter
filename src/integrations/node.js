import { BaseConverter, baseConvertStatic } from '../base-converter';
import parser from '../parser/node';

export default () => BaseConverter(parser);
export const convertStatic = htmlString => baseConvertStatic(htmlString, parser);
