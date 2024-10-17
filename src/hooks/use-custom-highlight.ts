import { useEffect, useRef, useState, DependencyList } from "react";
import { useTextRegExp } from "./use-text-regexp";
import { CustomHighlight } from "src/utils/custom-highlight";
import { CustomTreeWalker } from "src/utils/custom-tree-walker";
import { UseCustomHighlightParams } from "src/types";

const defaultParams: UseCustomHighlightParams = {
  text: "",
  name: "",
  isDeferred: true,
  isDebugMode: false,
  isCaseSensitive: false,
  shouldResetOnUnmount: true,
};

export const useCustomHighlight = (
  initParams: UseCustomHighlightParams,
  deps: DependencyList,
) => {
  const containerRef = useRef(null);
  const [params, setParams] = useState({ ...defaultParams, ...initParams });
  const textRegExp = useTextRegExp(params);

  useEffect(() => {
    setParams((params) => ({ ...params, ...initParams }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (!params.name) return;

    if (containerRef.current && textRegExp) {
      const treeWalker = new CustomTreeWalker(containerRef.current);
      const { highlight } = new CustomHighlight(
        treeWalker,
        textRegExp,
        params.isDebugMode!,
      );

      CSS.highlights.set(params.name, highlight);
    } else if (!textRegExp) {
      CSS.highlights.delete(params.name);
    }

    return () => {
      if (params.shouldResetOnUnmount) {
        CSS.highlights.delete(params.name);
      }
    };
  }, [
    textRegExp,
    params.name,
    params.shouldResetOnUnmount,
    params.isDebugMode,
  ]);

  return containerRef;
};
