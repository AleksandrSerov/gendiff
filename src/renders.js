import _ from 'lodash';

const baseSpaceSize = ' '.repeat(2);

const renderValue = (value, space) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const keys = _.keys(value).sort();
  const res = keys.reduce(
    (acc, key) => `${acc}
  ${space}${baseSpaceSize.repeat(2)}${key}: ${value[key]}`,
    '',
  );
  return `{${res}
  ${space}}`;
};

const render = (ast, curSpace = '') => {
  const keys = _.keys(ast).sort();
  const space = `${curSpace}${baseSpaceSize.repeat(2)}`;

  const actions = {
    added: (key, { value }) => `+ ${key}: ${renderValue(value, space)}`,
    removed: (key, { value }) => `- ${key}: ${renderValue(value, space)}`,
    notChanged: (key, { value }) =>
      `${baseSpaceSize}${key}: ${renderValue(value, space)}`,
    children: (key, { value }) => {
      return `${key}: ${render(value, space)}`;
    },
    changed: (key, { currentValue, prevValue }) =>
      `- ${key}: ${renderValue(prevValue, space)}
      ${baseSpaceSize}+ ${key}: ${renderValue(currentValue, space)}`,
  };

  const res = keys.reduce(
    (acc, key) => `${acc}
${space}${actions[ast[key].type](key, ast[key])}`,
    '',
  );
  return `{${res}
${curSpace}}`;
};

export default render;
