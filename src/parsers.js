import { safeLoad } from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const parse = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};

export default (config) => {
  const fullPath = path.resolve(config);
  const extName = path.extname(fullPath);
  const fileObj = fs.readFileSync(fullPath, 'utf8');

  return parse[extName](fileObj);
};
