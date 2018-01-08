import * as csvParse from 'csv-parse';
import * as fs from 'fs';
import { resolve } from 'path';
import storage from './data-source/transaction-storage';
import { toTransaction } from './mappers/transaction';
import getTags from './tagging/get-tags';

const ENCODING = 'UTF-8';

async function main() {
  await bootstrap();
  console.log('Stats: ', gatherStats(storage.filter()));
  ['olivka', 'living', 'cafe']
    .forEach(tag => console.log(`${tag}:`, gatherStats(storage.filter(({ tags }) => tags.has(tag)))));
}

main()
  .catch(console.error);

function gatherStats(transactions: TTransaction[]) {
  const stats = {
    income: 0,
    savings: 0,
    expenses: 0,
  };
  return transactions
    .reduce((acc, transaction: TTransaction) => {
      const amount = transaction.amountAccountCcy;
      if (transaction.direction === 'income') {
        acc.income += amount;
      } else if (transaction.direction === 'expense') {
        acc.expenses += -amount;
      } else {
        acc.savings += Math.abs(amount);
      }
      return acc;
    }, stats);
}

async function bootstrap() {
  const fileContents = await whenFileRead(resolve(__dirname, '../imported-data/all-26.11.2017-26.12.2017.csv'));
  const items = await whenCsvParsed(normalizeEOLs(fileContents));
  items
    .filter(isFilledInLine)
    .map(toTransaction)
    .forEach(storage.add);
  tagStorage(storage);
  return Promise.resolve();
}

function tagStorage(store: IItemsStorage<TTransaction>) {
  store.filter()
    .forEach(tagTransaction);
}

function tagTransaction(transaction: TTransaction) {
  // if (transaction.details.includes('205 - Безготівковий платіж."OLIVKA" KIEV')) {
  //   transaction.tags.add('living');
  //   transaction.tags.add('cafe');
  //   transaction.tags.add('olivka');
  // }
  getTags(transaction)
    .forEach(tag => transaction.tags.add(tag));
}

function normalizeEOLs(fileContents: string) {
  return fileContents.replace(/\r/g, '');
}

function isFilledInLine(line: string[]) {
  return line.length >= 8 && line[6] !== 'Сума у валюті рахунку';
}

async function whenCsvParsed(contents: string) {
  const options = {
    relax_column_count: true,
    relax: true,
    skip_empty_lines: true,
  };
  return new Promise<string[][]>((res, rej) => csvParse(contents, options, (err, arr) => err ? rej(err) : res(arr)));
}

async function whenFileRead(fileName: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(fileName, ENCODING, (err, buffer) => {
      err ? reject(err) : resolve(Buffer.from(buffer).toString(ENCODING));
    });
  });
}
