import * as csvParse from 'csv-parse';
import * as fs from 'fs';
import { resolve } from 'path';
import storage from './data-source/transaction-storage';
import { toTransaction } from './mappers/transaction';

const ENCODING = 'UTF-8';

main()
  .catch(console.error);

async function main() {
  await bootstrap();
  console.log('Stats: ', gatherStats(storage.filter()));
  console.log('Olivka: ', gatherStats(storage.filter(({ tags }) => tags.size > 0)));
}

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
  if (transaction.details.includes('205 - Безготівковий платіж."OLIVKA" KIEV')) {
    transaction.tags.add('living');
    transaction.tags.add('cafe');
    transaction.tags.add('olivka');
  }
}

function normalizeEOLs(fileContents: string) {
  return fileContents.replace(/\r/g, '');
}

function isFilledInLine(line: string[]) {
  return line.length >= 8 && line[6] !== 'Сума у валюті рахунку';
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
