import * as t from "babel-types";

export function objToAst(obj: Record<string, any>) {
  return t.objectExpression(
    Object.keys(obj).map(key => {
      const name = getName(key);
      const value = getValue(obj[key]);
      return t.objectProperty(name, value);
    }),
  );
}

export function toAst(
  value: any,
):
  | t.StringLiteral
  | t.NullLiteral
  | t.NumericLiteral
  | t.ObjectExpression
  | t.ArrayExpression {
  if (typeof value === "string") {
    return t.stringLiteral(value);
  } else if (typeof value === "number") {
    return t.numericLiteral(value);
  } else if (value !== null && typeof value === "object") {
    return objToAst(value);
  } else if (Array.isArray(value)) {
    return t.arrayExpression(value.map(v => toAst(v)));
  }

  return t.nullLiteral();
}

export function getName(name: string) {
  if (name.indexOf("-") > -1) {
    return t.stringLiteral(name);
  }
  return t.identifier(name);
}

function getValue(value: string | number | t.JSXExpressionContainer) {
  if (value === null || value === undefined) {
    return t.booleanLiteral(true);
  } else if (typeof value === "number") {
    return t.numericLiteral(value);
  } else if (typeof value === "string") {
    return t.stringLiteral(value);
  } else if (t.isJSXExpressionContainer(value)) {
    return value.expression;
  }

  return t.nullLiteral();
}
