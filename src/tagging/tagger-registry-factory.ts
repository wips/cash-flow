import logger from '../logging/logger';

export default function taggerRegistryFactory() {
  const registry = new Map<string, TTagMatcher>();

  return {
    add,
    get,
    keys,
  };

  function keys(): string[] {
    return [...registry.keys()];
  }

  function add(key: string, item: TTagMatcher): void {
    registry.set(key, item);
  }

  function get(key: string): TTagMatcher {
    const matcher = registry.get(key);
    if (!matcher) {
      logger.warn(`Tag matcher for "${key}" wasn't found. Using default matcher`);
      return defaultMatcher;
    }
    return matcher;
  }
}

function defaultMatcher() {
  return false;
}
