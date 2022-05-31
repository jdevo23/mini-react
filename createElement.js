function createElement(type, props, ...children) {
  // TODO: normalise props as in Preact. Add keys

  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "textElement",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export default createElement;
