import React from "react";

import { useTextRegExp } from "../src/hooks/use-text-regexp";
import { UseTextRegExpParams } from "../src/types";
import { renderHook } from "@testing-library/react";

describe(useTextRegExp.name, () => {
  test("should convert text into regex", () => {
    const initialProps: UseTextRegExpParams = { text: "test" };
    const hook = renderHook(useTextRegExp, { initialProps });

    expect(hook.result.current).toBeInstanceOf(RegExp);
  });

  test("should not convert text into regex if empty", () => {
    const initialProps: UseTextRegExpParams = { text: "" };
    const hook = renderHook(useTextRegExp, { initialProps });

    expect(hook.result.current).not.toBeInstanceOf(RegExp);
  });

  test("should receive isCaseSensitive", () => {
    const initialProps: UseTextRegExpParams = {
      text: "test",
      isCaseSensitive: true,
    };
    const hook = renderHook(useTextRegExp, { initialProps });

    expect(hook.result.current!.flags).not.toContain("i");
  });

  test("should not be case sensitive by default", () => {
    const initialProps: UseTextRegExpParams = { text: "test" };
    const hook = renderHook(useTextRegExp, { initialProps });

    expect(hook.result.current!.flags).toContain("i");
  });

  test("should be deferred by default", () => {
    const initialProps: UseTextRegExpParams = { text: "test" };

    jest.spyOn(React, "useDeferredValue");

    renderHook(useTextRegExp, { initialProps });

    expect(React.useDeferredValue).toHaveBeenCalledWith(initialProps.text);
  });
});
