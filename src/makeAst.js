import _ from 'lodash';

const makeAST = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const actions = [
    {
      check: (key) => !_.has(obj1, key) && _.has(obj2, key),
      action: (key) => ({ type: 'added', value: obj2[key], name: key }),
    },
    {
      check: (key) => _.has(obj1, key) && !_.has(obj2, key),
      action: (key) => ({ type: 'removed', value: obj1[key], name: key }),
    },
    {
      check: (key) => _.isEqual(obj1[key], obj2[key]),
      action: (key) => ({ type: 'unchanged', value: obj1[key], name: key }),
    },
    {
      check: (key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
      action: (key) => ({
        type: 'children',
        value: makeAST(obj1[key], obj2[key]),
        name: key,
      }),
    },
    {
      action: (key) => ({
        type: 'changed',
        name: key,
        prevValue: obj1[key],
        currentValue: obj2[key],
      }),
      check: (key) => obj1[key] !== obj2[key],
    },
  ];

  return keys.reduce((acc, key) => {
    const { action } = actions.find(({ check }) => check(key));
    return [...acc, action(key)];
  }, []);
};

export default makeAST;
