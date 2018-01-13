import getTaggerRegistry from './get-tagger-registry';

export default function getTags(transaction: TTransaction): string[] {
  const tags: string[] = [];
  for (const key of getTaggerRegistry().keys()) {
    tags.push(...getTagsByMatcher(key, getTaggerRegistry().get(key), transaction));
  }
  return tags;
}

function getTagsByMatcher(tag: string, matcher: TTagMatcher, transaction: TTransaction): string[] {
  const { details } = transaction;
  const tags: string[] = [];
  if (typeof matcher === 'string' && details === matcher) {
    tags.push(tag);
  } else if (matcher instanceof RegExp && typeof matcher.test === 'function' && matcher.test(details)) {
    tags.push(tag);
  } else if (typeof matcher === 'function' && matcher(transaction)) {
    tags.push(tag);
  } else if (Array.isArray(matcher)) {
    matcher.forEach(matchingItem => tags.push(...getTagsByMatcher(tag, matchingItem, transaction)));
  }
  return tags;
}
