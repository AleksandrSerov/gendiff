import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import makeAST from './makeAst';
import getFormatter from './formatters';

const getData = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  const extName = path.extname(filepath);
  const parse = getParser(extName);

  return parse(data);
};

export default (firstConfig, secondConfig, format = 'pretty') => {
  const obj1 = getData(firstConfig);
  const obj2 = getData(secondConfig);

  const formatter = getFormatter(format);

  const ast = makeAST(obj1, obj2);

  return formatter(ast);
};
