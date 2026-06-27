import buildDiff from './src/buildDiff.js';
import formatDiff from './src/formatters/index.js';
import readFile from './src/readFile.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diff = buildDiff(data1, data2);

  return formatDiff(diff, format);
};

export default genDiff;
