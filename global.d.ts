declare global {
  interface IterableClass<T> {
    [Symbol.iterator](): Iterator<T>;
  }

  interface CustomHighlightParams {
    name: string;
    text: string;
    isDeferred?: boolean;
    isCaseSensitive?: boolean;
    isDebugMode?: boolean;
  }
}

export {};
