import fs from 'fs';
import path from 'path';

export default (firstConfig, secondConfig) => {
  const firstObj = JSON.parse(
    fs.readFileSync(path.resolve(firstConfig), 'utf8'),
  );
  const secondObj = JSON.parse(
    fs.readFileSync(path.resolve(secondConfig), 'utf8'),
  );
  const allKeys = [
    ...new Set([...Object.keys(firstObj), ...Object.keys(secondObj)]),
  ];

  const diffStr = allKeys.reduce((acc, key) => {
    if (firstObj[key] === undefined && secondObj[key] !== undefined) {
      return `${acc}
      + ${key}: ${secondObj[key]}`;
    }
    if (secondObj[key] === undefined && firstObj[key] !== undefined) {
      return `${acc}
      - ${key}: ${firstObj[key]}`;
    }

    if (firstObj[key] === secondObj[key]) {
      return `${acc}
        ${key}: ${secondObj[key]}`;
    }
    return `${acc}
      + ${key}: ${secondObj[key]}
      - ${key}: ${firstObj[key]}`;
  }, '');
  const res = `
    {${diffStr}
    }`;
  console.log(res);
  return res;
};
