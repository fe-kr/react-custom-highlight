export interface UseCustomHighlightParams {
  name: string;
  text: string;
  isDeferred?: boolean;
  isDebugMode?: boolean;
  isCaseSensitive?: boolean;
  shouldResetOnUnmount?: boolean;
}

export type UseTextRegExpParams = Pick<
  UseCustomHighlightParams,
  "text" | "isDeferred" | "isCaseSensitive"
>;
