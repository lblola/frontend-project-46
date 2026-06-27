import fs from 'node:fs';
import path from 'node:path';

import parse from './parsers.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(filepath);

  return parse(data, format);
};

export default readFile;
