import parse from './parsers';
import makeAST from './makeAst';
import render from './formatters';

export default (firstConfig, secondConfig, format = 'pretty') => {
  const firstParsedObj = parse(firstConfig);
  const secondParsedObj = parse(secondConfig);

  const ast = makeAST(firstParsedObj, secondParsedObj);

  return render(format, ast);
};
