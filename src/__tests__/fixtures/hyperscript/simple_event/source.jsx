const noop = () => {
  /* noop */
};

function Foo() {
  return <div onClick={noop}>Hello World</div>;
}
