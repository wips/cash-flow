export default function genericStorageFactory<T>(): IItemsStorage<T> {
  const storage = new Set<T>();

  return {
    add(item: T) {
      storage.add(item);
    },
    filter(cb?: (item: T) => boolean) {
      return [...storage]
        .filter(cb || (() => true));
    },
  };
}
