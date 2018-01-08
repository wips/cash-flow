import getTaggerRegistry from './get-tagger-registry';

export default function getTags(transaction: TTransaction): string[] {
  const { details } = transaction;
  const tags: string[] = [];
  for (const key of getTaggerRegistry().keys()) {
    const matcher = getTaggerRegistry().get(key);
    if (typeof matcher === 'string' && details === matcher) {
      tags.push(key);
    } else if (matcher instanceof RegExp && typeof matcher.test === 'function' && matcher.test(details)) {
      tags.push(key);
    } else if (typeof matcher === 'function' && matcher(transaction)) {
      tags.push(key);
    }
  }
  return tags;
}
