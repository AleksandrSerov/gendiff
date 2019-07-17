import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const parse = {
  '.json': (config) => JSON.parse(config),
  '.yml': (config) => yaml.safeLoad(config),
  '.ini': (config) => ini.parse(config),
};

export default (config) => {
  const fullPath = path.resolve(config);
  const extName = path.extname(fullPath);
  const fileObj = fs.readFileSync(fullPath, 'utf8');

  return parse[extName](fileObj);
};
