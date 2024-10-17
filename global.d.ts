declare global {
  interface IterableClass<T> {
    [Symbol.iterator](): Iterator<T>;
  }
}

export {};
