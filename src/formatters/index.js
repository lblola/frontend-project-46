import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  json,
  plain,
  stylish,
};

const formatDiff = (diff, format) => {
  const formatter = formatters[format];

  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatter(diff);
};

export default formatDiff;
