import _ from 'lodash';

const tab = ' ';
const newLine = '\n';

const makeString = (depth, prefix, name, data) => {
  return `${tab.repeat(depth)}${prefix} ${name}: ${data}`;
};

const customStringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return `${value}`;
  }
  const content = _.keys(value).reduce((acc, key) => {
    const string = makeString(depth + 4, ' ', key, value[key]);
    return `${acc}${newLine}${string}`;
  }, '');

  return `{${content}${newLine}${tab.repeat(depth + 2)}}`;
};

const actions = {
  added: ({ name, value }, depth) =>
    makeString(depth, '+', name, customStringify(value, depth)),
  removed: ({ name, value }, depth) =>
    makeString(depth, '-', name, customStringify(value, depth)),
  notChanged: ({ name, value }, depth) =>
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

  const content = ast.reduce((acc, node) => {
    const string = actions[node.type](node, depth, render);

    return `${acc}${newLine}${string}`;
  }, '');

  return `{${content}${newLine}${indent}}`;
};

export default render;
