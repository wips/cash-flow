export function toTransaction(line: string[], index: number): TTransaction {
  const amountAccountCcy = toFloat(line[6]);
  if (isNaN(amountAccountCcy)) {
    throw new Error(`Amount is not a number: ${amountAccountCcy}. Line #${index}. Transaction: ${JSON.stringify(line)}`);
  }
  return {
    payDate: line[0] || '',
    chargeDate: line[1] || '',
    cardNumber: line[2] || '',
    type: line[3] || '',
    details: line[4] || '',
    incomeBalance: parseFloat(line[5]),
    amountAccountCcy,
    amountTransactionCcy: parseFloat(line[7]),
    ccy: toCcy(line[8]),
    outcomeBalance: parseFloat(line[9]),
    direction: toDirection(line),
    tags: new Set<string>(),
  };
}

export function toDirection(line: string[]): TDirection {
  if (line[4].startsWith('Зняття готівки.')) {
    return 'savings';
  } else if (toFloat(line[6]) < 0) {
    return 'expense';
  }
  return 'income';
}

export function toFloat(text: string): number {
  return parseFloat(text.replace(/\s/g, ''));
}

export function toCcy(text: string): TCcy {
  if (text === 'USD') {
    return 'USD';
  } else if (text === 'EUR') {
    return 'EUR';
  } else if (text === 'GBP') {
    return 'GBP';
  } else if (text === 'HUF') {
    return 'HUF';
  } else {
    return 'UAH';
  }
}
