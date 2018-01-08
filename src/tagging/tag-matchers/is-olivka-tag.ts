export default function isOlivkaTag(transaction: TTransaction): boolean {
  return transaction.details.includes('205 - Безготівковий платіж."OLIVKA" KIEV');
}
