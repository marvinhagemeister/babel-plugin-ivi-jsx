import { NodePath, Visitor } from "babel-traverse";
import * as t from "babel-types";
import { Attributes, Options, isComponentCall, getAttributes } from "./utils";
import { addImport } from "./templates";
import { objToAst, toAst } from "./convert";
import { isPrimitiveProp } from "./optimizations";
import { parseTagName } from "./parser";

/* tslint:disable:no-var-requires */
const jsx = require("babel-plugin-syntax-jsx");

export interface State {
  path: NodePath<t.Program>;
  opts: Options;
}

export interface Visitor2<S = {}> extends Visitor {
  JSXElement(this: S, path: NodePath<t.JSXElement>): void;
  JSXText(this: S, path: NodePath<t.JSXText>): void;
}

export interface PluginObj<S = {}> extends Record<string, any> {
  pre?: (this: S, state: State) => void;
  visitor: Visitor2<S>;
  post?: (this: S, state: State) => void;
  inherits: any;
}

export interface PluginState {
  imports: Map<string, string[]>;
}

export default function convert(): PluginObj<PluginState> {
  return {
    pre() {
      this.imports = new Map();
    },
    visitor: {
      JSXElement(path) {
        const open = path.node.openingElement;
        const name = parseTagName(open);
        const isComponent = isComponentCall(open);
        const attrs = getAttributes(open.attributes);

        if (!isComponent) {
          addImport("ivi-html", [name], this.imports);

          // Add event import
          if (attrs.events !== null) {
            addImport("ivi-events", Object.keys(attrs.events), this.imports);
          }
        }

        // Children
        const children = t.react.buildChildren(path.node) as any;
        const binding = path.scope.getBinding(name);
        const result = !isComponent
          ? hyperscript(name, attrs, children)
          : hyperscriptComponent(name, attrs.props, children, binding);

        path.replaceWith(result);
      },
      JSXText(path) {
        const text =
          path.node === null
            ? t.nullLiteral()
            : t.stringLiteral(path.node.value);
        path.replaceWith(text);
      },
    },
    post(state) {
      const path = state.path;

      // Render imports
      this.imports.forEach((values, key) => {
        path.node.body.unshift(
          t.importDeclaration(
            values
              .sort()
              .map(v => t.importSpecifier(t.identifier(v), t.identifier(v))),
            t.stringLiteral(key),
          ),
        );
      });
    },
    inherits: jsx,
  };
}

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
  binding: any,
  options: { primitiveProp: boolean } = { primitiveProp: false },
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

  return t.callExpression(
    t.identifier(name),
    propExp !== null ? [propExp] : [],
  );
}
