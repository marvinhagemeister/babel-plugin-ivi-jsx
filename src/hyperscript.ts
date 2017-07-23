import * as t from "babel-types";
import { Binding } from "babel-traverse";
import { Attributes } from "./utils";
import { objToAst, toAst } from "./convert";
import { isPrimitiveProp } from "./optimizations";

export function hyperscript(
  tag: string,
  attrs: Attributes,
  children: null | any,
) {
  const {
    className,
    key,
    props,
    style,
    value,
    checked,
    unsafeHTML,
    events,
  } = attrs;

  let ast = t.callExpression(
    t.identifier(tag),
    className !== null ? [t.stringLiteral(className)] : [],
  );

  if (key !== null) {
    ast = t.callExpression(t.memberExpression(ast, t.identifier("key")), [
      t.stringLiteral(key),
    ]);
  }

  if (props !== null) {
    ast = t.callExpression(t.memberExpression(ast, t.identifier("props")), [
      objToAst(props),
    ]);
  }

  if (style !== null) {
    ast = t.callExpression(t.memberExpression(ast, t.identifier("style")), [
      style,
    ]);
  }

  if (value !== null) {
    ast = t.callExpression(t.memberExpression(ast, t.identifier("value")), [
      toAst(value),
    ]);
  }

  if (checked !== null) {
    ast = t.callExpression(t.memberExpression(ast, t.identifier("checked")), [
      t.booleanLiteral(checked),
    ]);
  }

  let hasUnsafe = false;
  if (unsafeHTML !== null) {
    hasUnsafe = true;
    ast = t.callExpression(
      t.memberExpression(ast, t.identifier("unsafeHTML")),
      [t.stringLiteral(unsafeHTML)],
    );
  }

  if (events !== null) {
    const eventExp = Object.keys(events).map(name =>
      t.callExpression(t.identifier(name), [events[name]]),
    );

    if (eventExp.length > 0) {
      ast = t.callExpression(
        t.memberExpression(ast, t.identifier("events")),
        eventExp.length > 1 ? [t.arrayExpression(eventExp)] : [eventExp[0]],
      );
    }
  }

  if (
    children !== null &&
    !hasUnsafe &&
    (Array.isArray(children) && children.length > 0)
  ) {
    ast = t.callExpression(
      t.memberExpression(ast, t.identifier("children")),
      children,
    );
  }

  return t.expressionStatement(ast);
}

export function hyperscriptComponent(
  name: string,
  props: any,
  children: any,
  binding: Binding,
  options: { primitiveProp: boolean; isClass: boolean } = {
    primitiveProp: false,
    isClass: false,
  },
) {
  const childAst =
    children !== null && children.length === 1 ? children[0] : children;

  let propExp:
    | null
    | t.ObjectExpression
    | t.StringLiteral
    | t.NumericLiteral
    | t.NullLiteral
    | t.ArrayExpression = null;

  if (props !== null) {
    propExp = objToAst(props);
    const keys = Object.keys(props);
    if (
      options.primitiveProp &&
      keys.length === 1 &&
      isPrimitiveProp(binding, keys[0])
    ) {
      propExp = toAst(props[keys[0]]);
    } else if (children !== null && children.length > 0) {
      propExp.properties.push(
        t.objectProperty(t.identifier("children"), childAst),
      );
    }
  }

  const args = propExp !== null ? [propExp] : [];

  return options.isClass
    ? t.newExpression(t.identifier(name), args)
    : t.callExpression(t.identifier(name), args);
}
