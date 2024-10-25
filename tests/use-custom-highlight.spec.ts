import { createElement } from "react";

import { useCustomHighlight } from "../src/hooks/use-custom-highlight";
import { UseCustomHighlightParams } from "../src/types";
import { render, renderHook } from "@testing-library/react";
import {
  highlightsMock,
  HighlightMock,
  RangeMock,
  rangeMock,
} from "./utils/mocks";

global.CSS ??= { ...global.CSS, highlights: highlightsMock };
global.Highlight ??= HighlightMock;
global.Range = RangeMock;

const initialProps: UseCustomHighlightParams = { name: "", text: "" };

const initialRender = (props: UseCustomHighlightParams) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCustomHighlight(props, [props]);
};

describe(useCustomHighlight.name, () => {
  test("should return nullable ref", () => {
    const hook = renderHook(initialRender, { initialProps });

    expect(hook.result.current.current).toBe(null);
  });

  test("should set highlight", () => {
    const props: UseCustomHighlightParams = { name: "custom", text: "text" };

    const hook = renderHook(initialRender, { initialProps });

    const [textNode] = render(
      createElement("div", { ref: hook.result.current, children: props.text }),
    ).getByText(props.text).childNodes;

    hook.rerender(props);

    expect(rangeMock.setStart).toHaveBeenCalledWith(textNode, 0);
    expect(rangeMock.setEnd).toHaveBeenCalledWith(textNode, props.text.length);
    expect(highlightsMock.set).toHaveBeenCalledWith(
      props.name,
      expect.anything(),
    );
  });

  test("should set empty highlight without match", () => {
    const props: UseCustomHighlightParams = { name: "custom", text: "text" };

    const hook = renderHook(initialRender, { initialProps });

    render(createElement("div", { ref: hook.result.current }));

    hook.rerender(props);

    expect(HighlightMock).toHaveBeenCalledWith();
    expect(highlightsMock.set).toHaveBeenCalledWith(
      props.name,
      expect.anything(),
    );
  });

  test("should not set highlight with empty text", () => {
    const props: UseCustomHighlightParams = { name: "custom", text: "" };

    const hook = renderHook(initialRender, { initialProps: props });

    render(createElement("div", { ref: hook.result.current }));

    expect(highlightsMock.set).not.toHaveBeenCalledWith(
      props.name,
      expect.anything(),
    );
  });

  test("should unset highlight on unmount", () => {
    const props: UseCustomHighlightParams = { name: "custom", text: "text" };

    const hook = renderHook(initialRender, { initialProps: props });

    render(createElement("div", { ref: hook.result.current }));

    hook.unmount();

    expect(highlightsMock.delete).toHaveBeenCalledWith(props.name);
  });

  test("should receive nodeFilter", () => {
    const props: UseCustomHighlightParams = {
      name: "custom",
      text: "text",
      nodeFilter: ({ parentNode }) =>
        parentNode?.nodeName !== "BUTTON"
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    };

    const hook = renderHook(initialRender, { initialProps });
    const [textNode] = render(
      createElement("button", {
        ref: hook.result.current,
        children: props.text,
      }),
    ).getByText(props.text).childNodes;

    hook.rerender(props);

    expect(rangeMock.setStart).not.toHaveBeenCalledWith(textNode, 0);
    expect(rangeMock.setEnd).not.toHaveBeenCalledWith(
      textNode,
      props.text.length,
    );
  });

  test("should receive shouldResetOnUnmount", () => {
    const props: UseCustomHighlightParams = {
      name: "custom",
      text: "text",
      shouldResetOnUnmount: false,
    };

    const hook = renderHook(initialRender, { initialProps: props });

    render(createElement("div", { ref: hook.result.current }));

    hook.unmount();

    expect(highlightsMock.delete).not.toHaveBeenCalledWith(props.name);
  });

  test("should receive isDebugMode", () => {
    const props: UseCustomHighlightParams = {
      name: "custom",
      text: "text",
      isDebugMode: true,
    };

    jest.spyOn(rangeMock, "setStart").mockImplementation(() => {
      throw new Error();
    });

    const consoleMock = jest
      .spyOn(global.console, "error")
      .mockImplementation((err) => err);

    const hook = renderHook(initialRender, { initialProps });

    render(
      createElement("div", { ref: hook.result.current, children: props.text }),
    );

    hook.rerender(props);

    expect(consoleMock).toHaveBeenCalledWith(expect.anything());
  });
});
