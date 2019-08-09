import _ from 'lodash';

const [tab, newLine] = [' ', '\n'];

const makeString = (depth, prefix, name, data) => {
  return `${tab.repeat(depth)}${prefix} ${name}: ${data}`;
};

const customStringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const content = _.keys(value).reduce((acc, key) => {
    const string = makeString(
      depth + 4,
      ' ',
      key,
      customStringify(value[key], depth),
    );
    return `${acc}${newLine}${string}`;
  }, '');
  console.log(`{${content}${newLine}${tab.repeat(depth + 2)}}`);
  return `{${content}${newLine}${tab.repeat(depth + 2)}}`;
};

const actions = {
  added: ({ name, value }, depth) =>
    makeString(depth, '+', name, customStringify(value, depth)),
  removed: ({ name, value }, depth) =>
    makeString(depth, '-', name, customStringify(value, depth)),
  unchanged: ({ name, value }, depth) =>
    makeString(depth, ' ', name, customStringify(value, depth)),
  changed: ({ name, currentValue, prevValue }, depth) =>
    `${makeString(
      depth,
      '-',
      name,
      customStringify(prevValue, depth),
    )}${newLine}${makeString(
      depth,
      '+',
      name,
      customStringify(currentValue, depth),
    )}`,
  children: ({ name, value }, depth, render) =>
    makeString(depth, ' ', name, render(value, depth + 4)),
};

const render = (ast, depth = 2) => {
  const indent = tab.repeat(depth === 2 ? 0 : depth - 2);
  const content = _.flattenDeep(ast).map((node) => {
    const string = actions[node.type](node, depth, render);
    return `${newLine}${string}`;
  });
  // const content = ast.reduce((acc, node) => {
  //   const string = actions[node.type](node, depth, render);

  //   return `${acc}${newLine}${string}`;
  // }, '');

  const indent = tab.repeat(depth === 2 ? 0 : depth - 2);

  return `{${content}${newLine}${indent}}`;
};

export default render;
