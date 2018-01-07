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

//
// interface IStrategyOptionsWithRequest {
//     usernameField?: string;
//     passwordField?: string;
//     passReqToCallback: boolean;
// }
//
// interface IVerifyOptions {
//     message: string;
// }
//
// interface VerifyFunction {
//     (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void;
// }
