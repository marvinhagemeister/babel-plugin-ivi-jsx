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
  return t.div().children(
      t.h1().children(props.text),
      t.div(content).children(props.children)
  );
}
```

## Limitations

Currently props which are not of type `object` are not supported. For those you
should fall back to simple function calls.

Example:

```jsx
function Article(text: string) {
  return <article>{text}</article>;
}

function Foo() {
  return <div>{Article("Some Content")}</div>;
}
```

## License

`MIT`, see [LICENSE.md](License.md).
