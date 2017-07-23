const { transform } = require("babel-core");

function plugin() {
  return {
    visitor: {
      FunctionDeclaration(path) {
        console.log(
          path.scope.getBinding("baz"),
          path.scope.getOwnBinding("baz"),
        );
      },
    },
  };
}

transform(`function foo() {}`, { plugins: [plugin] });
