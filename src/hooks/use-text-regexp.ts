import { useDeferredValue, useMemo } from "react";
import { UseTextRegExpParams } from "../types";

const escapeRegExp = /[\\^$.*+?()[\]{}|]/g;

export const useTextRegExp = ({
  text,
  isCaseSensitive,
  isDeferred,
}: UseTextRegExpParams) => {
  const deferredText = useDeferredValue(text);

  const textData = isDeferred ? deferredText : text;

  return useMemo(() => {
    if (!textData) return null;

    const pattern = textData.replace(escapeRegExp, "\\$&");
    const flags = `g${!isCaseSensitive ? "i" : ""}`;

    return new RegExp(pattern, flags);
  }, [textData, isCaseSensitive]);
};
