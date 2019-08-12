import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parse = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};

export default (extName) => parse[extName];
