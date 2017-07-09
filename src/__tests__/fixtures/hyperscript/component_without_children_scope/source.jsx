export function Foo(text) {
  return (
    <h1>
      {text}
    </h1>
  );
}

export function Text() {
  return (
    <div>
      <Foo text="Lorem Ipsum" />
    </div>
  );
}
