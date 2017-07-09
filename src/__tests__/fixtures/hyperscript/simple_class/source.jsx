const noop2 = () => {
  /* noop */
};

function Foo() {
  return (
    <div class="foo" onClick={noop2}>
      Hello World
    </div>
  );
}
