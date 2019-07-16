import _ from 'lodash';
import parse from './parsers';

export default (firstConfig, secondConfig) => {
  const firstParsedObj = parse(firstConfig);
  const secondParsedObj = parse(secondConfig);

  const allKeys = [
    ...new Set([
      ...Object.keys(firstParsedObj),
      ...Object.keys(secondParsedObj),
    ]),
  ];

  const diffStr = allKeys.reduce((acc, key) => {
    if (!_.has(firstParsedObj, key) && _.has(secondParsedObj, key)) {
      return `${acc}
      + ${key}: ${secondParsedObj[key]}`;
    }

    if (!_.has(secondParsedObj, key) && _.has(firstParsedObj, key)) {
      return `${acc}
      - ${key}: ${firstParsedObj[key]}`;
    }

    if (firstParsedObj[key] === secondParsedObj[key]) {
      return `${acc}
        ${key}: ${secondParsedObj[key]}`;
    }

    return `${acc}
      + ${key}: ${secondParsedObj[key]}
      - ${key}: ${firstParsedObj[key]}`;
  }, '');
  const res = `
    {${diffStr}
    }`;

  return res;
};
