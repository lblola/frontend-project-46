import readFile from './src/readFile.js';

const formatValue = (value) => `${value}`;

const getLine = (key, value, sign = ' ') => `  ${sign} ${key}: ${formatValue(value)}`;

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();

  const lines = keys.flatMap((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    if (!hasKey1) {
      return getLine(key, data2[key], '+');
    }

    if (!hasKey2) {
      return getLine(key, data1[key], '-');
    }

    if (data1[key] === data2[key]) {
      return getLine(key, data1[key]);
    }

    return [getLine(key, data1[key], '-'), getLine(key, data2[key], '+')];
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
