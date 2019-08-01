import pretty from './pretty';
import plain from './plain';

const formatters = {
  pretty,
  plain,
};

export default (format, ast) => formatters[format](ast);
