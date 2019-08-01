import parse from './parsers';
import makeAST from './makeAst';
import render from './renders';

export default (firstConfig, secondConfig) => {
  const firstParsedObj = parse(firstConfig);
  const secondParsedObj = parse(secondConfig);
  const ast = makeAST(firstParsedObj, secondParsedObj);

  return render(ast);
};
