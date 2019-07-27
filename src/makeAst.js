import _ from 'lodash';

const makeAST = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const actions = [
    {
      action: (key) => ({ type: 'added', value: obj2[key] }),
      check: (key) => !_.has(obj1, key) && _.has(obj2, key),
    },
    {
      action: (key) => ({ type: 'removed', value: obj1[key] }),
      check: (key) => _.has(obj1, key) && !_.has(obj2, key),
    },
    {
      action: (key) => ({ type: 'notChanged', value: obj1[key] }),
      check: (key) => _.isEqual(obj1[key], obj2[key]),
    },
    {
      action: (key) => makeAST(obj1[key], obj2[key]),
      check: (key) => obj2[key] instanceof Object,
    },
    {
      action: (key) => ({
        type: 'changed',
        prevValue: obj1[key],
        currentValue: obj2[key],
      }),
      check: (key) => obj1[key] !== obj2[key],
    },
  ];

  return keys.reduce((acc, key) => {
    const { action } = actions.find(({ check }) => check(key));
    return { ...acc, [key]: action(key) };
  }, {});
};

export default makeAST;
