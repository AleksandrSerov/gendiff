import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import JSONParser from './parsers/jsonParser';
import YMLParser from './parsers/ymlParser';

const parse = {
  '.json': obj => JSONParser(obj),
  '.yml': obj => YMLParser(obj),
};

export default (firstConfig, secondConfig) => {
  const firstFile = path.resolve(firstConfig);
  const firstObj = fs.readFileSync(firstFile, 'utf8');
  const firstFileExt = path.extname(firstFile);

  const secondFile = path.resolve(secondConfig);
  const secondObj = fs.readFileSync(secondFile, 'utf8');
  const secondFileExt = path.extname(secondFile);
  const extension = firstFileExt === secondFileExt ? secondFileExt : null;
  if (!extension) {
    return 'Not one format';
  }

  const firstParsedObj = parse[extension](firstObj);
  const secondParsedObj = parse[extension](secondObj);

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
