import { useEffect, useRef, useState, DependencyList } from "react";
import { useFilterRegExp } from "./use-filter-regexp";
import { CustomHighlight, TextTreeWalker } from "../utils";

const defaultParams: CustomHighlightParams = {
  text: "",
  name: "",
  isDeferred: true,
  isCaseSensitive: false,
  isDebugMode: false,
};

export const useCustomHighlight = (
  initParams: CustomHighlightParams,
  deps: DependencyList,
) => {
  const containerRef = useRef(null);
  const [params, setParams] = useState({ ...defaultParams, ...initParams });
  const textRegExp = useFilterRegExp(params);

  useEffect(() => {
    setParams((params) => ({ ...params, ...initParams }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (containerRef.current && textRegExp && params.name) {
      const treeWalker = new TextTreeWalker(containerRef.current);
      const { highlight } = new CustomHighlight(
        treeWalker,
        textRegExp,
        params.isDebugMode!,
      );

      CSS.highlights.set(params.name, highlight);
    }

    return () => {
      CSS.highlights.delete(params.name);
    };
  }, [textRegExp, params.name, params.isDebugMode]);

  return containerRef;
};
