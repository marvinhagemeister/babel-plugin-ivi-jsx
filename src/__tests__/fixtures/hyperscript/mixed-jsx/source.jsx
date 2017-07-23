import * as h from "ivi-html";

export function Foo() {
  return h.div().children("Hello World");
}

export function Text() {
  return (
    <div>
      <Heading text="foo">Hello World</Heading>
      <p>Lorem Ipsum</p>
      <div>The End</div>
    </div>
  );
}

export function Heading(props) {
  return h.h1().children(props.text + " - " + props.children);
}
