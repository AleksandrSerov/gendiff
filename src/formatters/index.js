import pretty from './pretty';
import plain from './plain';
import json from './json';

const formatters = {
  pretty,
  plain,
  json,
};

export default (format, ast) => formatters[format](ast);
