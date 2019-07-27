import _ from 'lodash';

const baseSpaceSize = ' '.repeat(2);

const renderKey = (key, obj) => {
  const actions = {
    added: () => `${baseSpaceSize}+ ${key}: ${obj.value}`,
    removed: () => `${baseSpaceSize}- ${key}: ${obj.value}`,
    notChanged: () => `${baseSpaceSize.repeat(2)}${key}: ${obj.value}`,
    changed: () =>
      `${baseSpaceSize}+ ${key}: ${obj.currentValue}
${baseSpaceSize}- ${key}: ${obj.prevValue}`,
  };
  return actions[obj.type](key);
};

const render = (ast) => {
  const keys = _.keys(ast);

  const res = keys.reduce(
    (acc, key) => `${acc}
${renderKey(key, ast[key])}`,
    `{`,
  );
  return `${res}
}`;
};

export default render;
