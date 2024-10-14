import { useDeferredValue, useMemo } from "react";
import { UseTextRegExpParams } from "src/types";

export const useTextRegExp = ({
  text,
  isCaseSensitive,
  isDeferred,
}: UseTextRegExpParams) => {
  const deferredText = useDeferredValue(text);

  const textData = isDeferred ? deferredText : text;

  return useMemo(
    () =>
      textData ? new RegExp(textData, `g${isCaseSensitive ? "i" : ""}`) : null,
    [textData, isCaseSensitive],
  );
};
