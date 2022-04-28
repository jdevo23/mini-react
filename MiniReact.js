const render = function (element, parent) {
  let node;

  if (!element.type) {
    node = document.createTextNode(element);
  } else {
    node = document.createElement(element.type);
  }

  if (element.props) {
    for (const propName in element.props) {
      if (propName !== "children") {
        node[propName] = element.props[propName];
      }
    }

    /* 
      This recursive call will need refactoring because the entire tree is being rendered at once which can interrupt the user's experience
      by forcing the browser to delay important tasks. One way of doing it is to separate the work into blocks.

      Run block ->
      Check and run any browser tasks ->
      Repeat until finished

      React uses the scheduler package to handle this.
    */
    if (element.props.children) {
      element.props.children.forEach((child) => render(child, node));
    }
  }

  parent.appendChild(node);
};

const createElement = function (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
};

// Using createElement until I figure out how to get JSX working
// we need to use babel to transpile it to become JSX
// https://betterprogramming.pub/how-to-use-jsx-without-react-21d23346e5dc
const MiniReact = { render, createElement };

export default MiniReact ;