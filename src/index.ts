import * as csvParse from 'csv-parse';
import * as fs from 'fs';
import { resolve } from 'path';
import storage from './data-source/generic-storage';

const ENCODING = 'UTF-8';

main()
  .catch(console.error);

async function main() {
  await bootstrap();
  console.log('Stats: ', gatherStats());
}

function gatherStats() {
  const stats = {
    income: 0,
    savings: 0,
    expenses: 0,
    total: 0,
  };
//
  return storage.filter()
    .reduce((acc, transaction: Transaction) => {
      const amount = transaction[6];
      if (amount > 0) {
        acc.income += amount;
      } else {
        acc.expenses += -amount;
      }
      acc.savings = acc.income - acc.expenses;
      acc.total += amount;
      return acc;
    }, stats);
}

async function bootstrap() {
  const fileContents = await whenFileRead(resolve(__dirname, '../imported-data/all-26.11.2017-26.12.2017.csv'));
  const items = await whenCsvParsed(normalizeEOLs(fileContents));
  items
    // .filter((_, idx) => idx <= 150 - 5)
    .filter(isFilledInLine)
    .map(toTransaction)
    .forEach(storage.add);
  return Promise.resolve();
}

function normalizeEOLs(fileContents: string) {
  return fileContents.replace(/\r/g, '');
}

function isFilledInLine(line: string[]) {
  return line.length >= 8 && line[6] !== 'Сума у валюті рахунку';
}

function toTransaction(line: string[], index: number): Transaction {
  const amount = parseFloat(line[6].replace(/\s/g, ''));
  if (isNaN(amount)) {
    throw new Error(`Amount is not a number: ${amount}. Line #${index}. Transaction: ${JSON.stringify(line)}`);
  }
  return [
    line[0] || '',
    line[1] || '',
    line[2] || '',
    line[3] || '',
    line[4] || '',
    parseFloat(line[5]),
    amount,
    parseFloat(line[7]),
    line[8] || '',
  ];
}

async function whenCsvParsed(fileContents: string) {
  const options = {
    relax_column_count: true,
    relax: true,
    skip_empty_lines: true,
  };
  return new Promise<string[][]>((res, rej) => {
    csvParse(fileContents, options, (err, pojo) => err ? rej(err) : res(pojo));
  });
}

async function whenFileRead(fileName: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(fileName, ENCODING, (err, buffer) => {
      err ? reject(err) : resolve(Buffer.from(buffer).toString(ENCODING));
    });
  });
}
