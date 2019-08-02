const newLine = '\n';

const customStringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }

  if (typeof value === 'boolean') {
    return `${value}`;
  }

  return `'${value}'`;
};

const renderChildren = ({ name, value }, path, render) => {
  const content = `Property '${path}${name}' was updated. From ${customStringify(
    value,
  )} to ${customStringify(value)}${newLine}${render(value, `${path}${name}.`)}`;

  return content;
};

const actions = {
  added: ({ name, value }, path) =>
    `Property '${path}${name}' was added with value: ${customStringify(value)}`,
  removed: ({ name }, path) => `Property '${path}${name}' was removed`,
  notChanged: ({ name }, path) => `Property '${path}${name}' unchanged`,
  changed: ({ name, currentValue, prevValue }, path) =>
    `Property '${path}${name}' was updated. From ${customStringify(
      prevValue,
    )} to ${customStringify(currentValue)}`,
  children: renderChildren,
};

const render = (ast, path = '') => {
  const content = ast.reduce((acc, node, index) => {
    const string = actions[node.type](node, path, render);

    return `${acc}${index ? newLine : ''}${string}`;
  }, '');

  return content;
};

export default render;
