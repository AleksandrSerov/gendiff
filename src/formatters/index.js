import pretty from './pretty';
import plain from './plain';

const formatters = {
  pretty,
  plain,
  json: JSON.stringify,
};

export default (format) => formatters[format];
