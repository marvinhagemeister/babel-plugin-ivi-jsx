import * as t from "babel-types";

export function parseTagName(open: t.JSXOpeningElement) {
  let name: string = "";
  if (t.isJSXIdentifier(open.name)) {
    name = open.name.name;
  } else if (t.isJSXMemberExpression(open.name)) {
    if (t.isJSXIdentifier(open.name.object)) {
      name = open.name.object.name + "." + open.name.property.name;
    } else {
      throw new Error(
        "Unsupported node: " + JSON.stringify(open.name, null, 2),
      );
    }
  }
  return name;
}
