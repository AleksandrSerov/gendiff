import yaml from 'js-yaml';

export default obj => yaml.safeLoad(obj);
