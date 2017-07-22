# babel-plugin-ivi-jsx

`babel-plugin-ivi-jsx` is a jsx plugin for [ivi](https://github.com/ivijs/ivi) and
is fully typed for TypeScript users.

## Installation

```bash
# npm
npm install --save-dev babel-plugin-ivi-jsx

# yarn
yarn add --dev babel-plugin-ivi-jsx
```

## Usage

In your `.babelrc`

```json
{
  "plugins": ["ivi-jsx"]
}
```

And now this:

```jsx
function Foo(props) {
  return <div>
    <h1>{props.text}</h1>
    <div class="content">{props.children}</div>
  </div>;
}
```

is compiled to:

```js
import * as h from "ivi-html";

function Foo(props) {
  return h.div().children(
      h.h1().children(props.text),
      h.div("content").children(props.children)
  );
}
```

### Usage with TypeScript

Since `babel-plugin-ivi-jsx` is not required explicitely in your code your
editor will not load the types automatically. This is solved by simply adding
`jsx.d.ts` to your `tsconfig.json` to have a fully typed programming experience.

```js
{
  "compilerOptions": {...},
  "files": [
    "node_modules/babel-plugin-ivi-jsx/jsx.d.ts", // <- Add this
    "path/to/your/entry.ts"
  ]
}
```

### For React users

Since most people dealing with `jsx` come from the react world, this plugin eases the transition by allowing react-specific attributes:

- both `class` and `className` are supported
- both `unsafeHTML` and `setDangerouslyInnerHTML` are supported

```jsx
function Foo(props) {
  return <div className="foobar">
    <div setDangerouslyInnerHTML="<h1>Hello World</h1>" />
  </div>;
}

// ... is the same as
function Foo(props) {
  return <div class="foobar">
    <div unsafeHTML="<h1>Hello World</h1>" />
  </div>;
}
```

## Limitations

Currently props which are not of type `object` are not supported. For those you
should fall back to simple function calls.

Example:

```jsx
function Article(text) {
  return <article>{text}</article>;
}

function Foo() {
  return <div>{Article("Some Content")}</div>;
}
```

## License

`MIT`, see [LICENSE](LICENSE.md).
