import readFile from './src/readFile.js';

const genDiff = (filepath1, filepath2) => {
  readFile(filepath1);
  readFile(filepath2);

  return '';
};

export default genDiff;
