import { useDeferredValue, useMemo } from "react";

export const useFilterRegExp = ({
  text,
  isCaseSensitive,
  isDeferred,
}: CustomHighlightParams) => {
  const textRegExp = useMemo(
    () => (text ? new RegExp(text, `g${isCaseSensitive ? "i" : ""}`) : null),
    [text, isCaseSensitive],
  );

  const deferredTextRegExp = useDeferredValue(textRegExp);

  return isDeferred ? deferredTextRegExp : textRegExp;
};
