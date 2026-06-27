import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@jest/globals';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['json', 'file1.json', 'file2.json'],
  ['yml', 'file1.yml', 'file2.yml'],
  ['yaml', 'file1.yaml', 'file2.yaml'],
])('genDiff compares flat %s files', (_format, file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8').trimEnd();

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

test.each([
  ['json', 'nested-file1.json', 'nested-file2.json'],
  ['yml', 'nested-file1.yml', 'nested-file2.yml'],
])('genDiff compares nested %s files', (_format, file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = fs.readFileSync(getFixturePath('nested-expected.txt'), 'utf-8').trimEnd();

  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
