type TTransaction = {
  payDate: string,
  chargeDate: string,
  cardNumber: string,
  type: string,
  details: string,
  incomeBalance: number,
  amountAccountCcy: number,
  amountTransactionCcy: number,
  ccy: TCcy,
  outcomeBalance: number,
  direction: TDirection,
  tags: Set<string>,
};

type TCcy = 'UAH' | 'USD' | 'EUR' | 'HUF' | 'GBP';
type TDirection = 'income' | 'expense' | 'savings';

interface IItemsStorage<T> {
  add(item: T): void;
  filter(cb?: (item: T) => boolean): T[];
}

interface IKeyValueStorage<T, U> {
  add(key: T, item: U): void;
  get(key: T): U;
  keys(): T[];
}

type TTagMatcher = string
  | RegExp
  | ((transaction: TTransaction) => boolean);
