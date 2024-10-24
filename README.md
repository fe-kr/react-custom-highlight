# React Custom Highlight

React hook for highlighting nodes (see [Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API)).

## ⚠️ Warning
This package is based on the Custom Highlight API, which may not be supported by some [browsers](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API#browser_compatibility).

## Installation

```
npm install react-custom-highlight
```

## Usage

To use it, just provide hook's ref to target container and add `::highlight` pseudo-element.


```jsx
// App.tsx
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { useCustomHighlight } from "react-custom-highlight";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const ref = useCustomHighlight({ name: "app", text }, [text]);

  return (
    <div>
      <input
        placeholder="Enter search text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <article ref={ref}>
        <h1>Lorem ipsum dolor sit amet</h1>
        <p>
          Lorem ipsum dolor sit amet
          <span>Lorem ipsum dolor sit amet.</span>
        </p>
      </article>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

// App.css
::highlight(app) {
  color: red;
}
```

And the hook will mark all occurrences of `text` parameter within the container. Add params to `dependency array` for recalculation (if needed).


## Props

| Property               | Type                        | Required? | Description                                                                                                                                                                                                                                                                                                                                                        |
|------------------------|-----------------------------|:---------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `text`      | String                      |     +      | Search text to be highlighted in container                                                                                                                                                                                                                                                                                      |
| `name`          | String                      |    +       | Name of specified [::highlight](https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight) pseudo-element                                                                                                                                                                                                                                                                      |
| `isDeferred`          | Boolean                      |           | Text value should be wrapped with [useDeferredValue](https://react.dev/reference/react/useDeferredValue). Defaults to `true`                                                                                                                                                                                                                                                       |
| `isDebugMode`           | Boolean                     |           | Debug mode flag for inspecting errors. Defaults to `false`                                                                                                                                                                                                                                                   |
| `isCaseSensitive`            | Boolean                      |           | Search should be case sensitive. Defaults to `false`                                                                                                                                                                                                                                                                                                               |
| `shouldResetOnUnmount`        | Boolean                     |           | Highlights should be cleared on hook container unmount. Defaults to `true`    


## License

MIT.