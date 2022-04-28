/** @jsx createElement */
import MiniReact from "../MiniReact";

const { render, createElement } = MiniReact;

const component = <div id="container">text</div>;

render(component, document.getElementById("root"));
