export interface UseCustomHighlightParams {
  name: string;
  text: string;
  isDeferred?: boolean;
  isDebugMode?: boolean;
  isCaseSensitive?: boolean;
  shouldResetOnUnmount?: boolean;
  nodeFilter?: NodeFilter;
}

export type UseTextRegExpParams = Pick<
  UseCustomHighlightParams,
  "text" | "isDeferred" | "isCaseSensitive"
>;

export interface IterableClass<T> {
  [Symbol.iterator](): Iterator<T>;
}
