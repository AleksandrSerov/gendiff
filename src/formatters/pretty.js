import _ from 'lodash';

const newLine = '\n';

const tab = (count) => '  '.repeat(count);

const makeString = (depth, prefix, name, data) =>
  `${tab(depth)}${prefix} ${name}: ${data}`;

const customStringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const content = _.keys(value).map((key) =>
    makeString(depth + 2, ' ', key, value[key]),
  );

  return `{${newLine}${content}${newLine}${tab(depth + 1)}}`;
};

const actions = {
  added: ({ name, value }, depth) =>
    makeString(depth, '+', name, customStringify(value, depth)),
  removed: ({ name, value }, depth) =>
    makeString(depth, '-', name, customStringify(value, depth)),
  unchanged: ({ name, value }, depth) =>
    makeString(depth, ' ', name, customStringify(value, depth)),
  changed: ({ name, currentValue, prevValue }, depth) => [
    makeString(depth, '-', name, customStringify(prevValue, depth)),
    makeString(depth, '+', name, customStringify(currentValue, depth)),
  ],
  children: ({ name, value }, depth, render) =>
    makeString(depth, ' ', name, render(value, depth + 2)),
};

const render = (ast, depth = 1) => {
  const content = _.flattenDeep(
    ast.map((node) => actions[node.type](node, depth, render)),
  ).join(newLine);

  return `{${newLine}${content}${newLine}${tab(depth - 1)}}`;
};

export default render;
