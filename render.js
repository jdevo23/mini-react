const { log } = console;

let currentInstance = null;

function createVNode(element) {
  if (element.type instanceof Function) {
    element = element.type(element.props);
  }

  let { type, props } = element;

  let node;
  let children = [];


  if (type === "textElement") {
    node = document.createTextNode("");
  } else {
    node = document.createElement(type);
  }

  if (props) {
    for (const propName in props) {
      if (propName !== "children") {
        node[propName] = element.props[propName];
      }
    }

    if (props.children) {
      children = props.children.map(createVNode);
      // log("children:", children)
      children.map((c) => c.node).forEach((cn) => node.appendChild(cn));
    }
  }

  return { node, element, children };
}

function render(newVNode, parentDom) {
  let currentVNode = currentInstance;
  currentInstance = diff(parentDom, currentVNode, newVNode);
}

function diff(parentDom, currentVNode, newVNode) {
  // initial render (dom is empty)
  if (currentInstance == null) {
    const node = createVNode(newVNode);
    parentDom.append(node.node);
    return node;
  } else if (newVNode == null) {
    // for when a dom node has been deleted
    parentDom.removeChild(currentInstance.node);
    return null;
  } else if (currentVNode.node.type == newVNode.type) {
    // diff children
    currentVNode.children = diffChildren(currentVNode, newVNode);
    currentVNode.node = newVNode;
    return currentVNode;
  } else {
    // update type and props
    const node = createVNode(newVNode);
    parentDom.replaceChild(node.node, currentVNode.node);
    return node;
  }
}

function diffChildren(currentVNode, newVNode) {
  const { node, children } = currentVNode;
  const nextChildren = newVNode.props.children;

  const newChildren = [];

  for (let i = 0; i < Math.max(children.length, nextChildren.length); i++) {
    newChildren.push(diff(node, children[i], nextChildren[i]));
  }

  return newChildren.filter((child) => child != null);
}

export default render;
