/** @jsx createElement */
import MiniReact from "../MiniReact";

const { render, createElement } = MiniReact;

const tree = (
  <div id="container">
    <h1>Title</h1>
    <h2>Subtitle</h2>
    <p>Some dummy text</p>
  </div>
);

function App(props) {
  return <div>{props.name}</div>
}

render(<App name="Ted" />, document.getElementById("root"));
