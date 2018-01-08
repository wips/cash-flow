import taggerRegistryFactory from '../tagging/tagger-registry-factory';
import tagMatchersConfig from '../tagging/tag-matchers-config';

import isOlivkaTag from '../tagging/tag-matchers/is-olivka-tag';

let instance: IKeyValueStorage<string, TTagMatcher>;

export default function getTaggerRegistry() {
  if (!instance) {
    instance = initTaggerRegistry();
  }
  return instance;
}

function initTaggerRegistry(): IKeyValueStorage<string, TTagMatcher> {
  const registry = taggerRegistryFactory();
  registry.add('olivka', isOlivkaTag);
  Object.keys(tagMatchersConfig)
    .forEach(tag => registry.add(tag, tagMatchersConfig[tag]));
  return registry;
}
