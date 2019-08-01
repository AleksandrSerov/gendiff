import pretty from './pretty';

const formatters = {
  pretty,
};

export default (format, ast) => formatters[format](ast);
