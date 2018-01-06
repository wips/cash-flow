const storage = new Set<Transaction>();

export default {
  add(item: Transaction) {
    storage.add(item);
  },
  filter(cb?: (item: Transaction) => boolean) {
    return [...storage]
      .filter(cb || (() => true));
  },
};
