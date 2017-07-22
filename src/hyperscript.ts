import { NodePath } from "babel-traverse";
import * as t from "babel-types";
import {
  Options,
  isComponentCall,
  getAttributes,
  getProgram,
  addImport,
} from "./utils";
import { buildImport, wildCardImport } from "./templates";
import { objToAst, toAst } from "./convert";
import { isPrimitiveProp } from "./optimizations";

/* tslint:disable:no-var-requires */
const jsx = require("babel-plugin-syntax-jsx");

export default function convert(babel: any) {
  return {
    visitor,
    inherits: jsx,
  };
}

export interface State {
  opts: Options;
}

export const visitor = {
  JSXElement(path: NodePath<t.JSXElement>, state: State) {
    const opts = state.opts;
    if (!opts._pragmaIncluded && !path.scope.hasBinding("h")) {
      opts._pragmaIncluded = true;

      const program = getProgram(path);
      addImport(program.node, wildCardImport("h", "ivi-html"));
    }

    const open = path.node.openingElement;
    const attrs = getAttributes(open.attributes);

    // Add event import
    if (attrs.events !== null) {
      const program = getProgram(path);
      addImport(
        program.node,
        buildImport(Object.keys(attrs.events), "ivi-events"),
      );
    }

    // Children
    const children = t.react.buildChildren(path.node) as any;

    open.name = open.name as t.JSXIdentifier;
    const name = open.name.name;

    const binding = path.scope.getBinding(name);

    const result = !isComponentCall(open)
      ? hyperscript(
          name,
          attrs.className,
          attrs.key,
          attrs.props,
          attrs.events,
          children,
        )
      : hyperscriptComponent(name, attrs.props, children, binding);

    path.replaceWith(result);
  },
  JSXText(path: NodePath<t.JSXText>) {
    const text =
      path.node === null ? t.nullLiteral() : t.stringLiteral(path.node.value);
    path.replaceWith(text);
  },
};

export function hyperscript(
  tag: string,
  className: string | null,
  key: null | string,
  props: null | Record<string, any>,
  events: null | Record<string, any>,
  children: null | any,
) {
  let ast = t.callExpression(
    t.memberExpression(t.identifier("h"), t.identifier(tag)),
    className !== null ? [t.stringLiteral(className)] : [],
  );

  if (props !== null) {
    ast = t.callExpression(t.memberExpression(ast, t.identifier("props")), [
      objToAst(props),
    ]);
  }

  if (key !== null) {
    ast = t.callExpression(t.memberExpression(ast, t.identifier("key")), [
      t.stringLiteral(key),
    ]);
  }

  if (events !== null) {
    const eventExp = Object.keys(events).map(name =>
      t.callExpression(t.identifier(name), [events[name]]),
    );

    ast = t.callExpression(
      t.memberExpression(ast, t.identifier("events")),
      eventExp.length > 1 ? [t.arrayExpression(eventExp)] : [eventExp[0]],
    );
  }

  if (children !== null) {
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
  binding: any,
  options: { primitiveProp: boolean } = { primitiveProp: false },
) {
  let propExp:
    | t.ObjectExpression
    | t.StringLiteral
    | t.NumericLiteral
    | t.NullLiteral
    | t.ArrayExpression = objToAst(props);

  const childAst = children.length === 1 ? children[0] : children;

  const keys = Object.keys(props);
  if (
    options.primitiveProp &&
    keys.length === 1 &&
    isPrimitiveProp(binding, keys[0])
  ) {
    propExp = toAst(props[keys[0]]);
  } else if (children.length > 0) {
    propExp.properties.push(
      t.objectProperty(t.identifier("children"), childAst),
    );
  }

  return t.callExpression(t.identifier(name), [propExp]);
}
