import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = {
  '.json': config => JSON.parse(fs.readFileSync(path.resolve(config), 'utf8')),
  '.yml': config => yaml.safeLoad(fs.readFileSync(path.resolve(config), 'utf8')),
};

export default config => parse[path.extname(path.resolve(config))](config);
