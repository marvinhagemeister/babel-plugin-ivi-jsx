import { NodePath, Visitor } from "babel-traverse";
import * as t from "babel-types";
import { Options, isComponentCall, getAttributes } from "./utils";
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

export interface PluginObj {
  pre?: (state: State) => void;
  visitor: Visitor;
  post?: (state: State) => void;
  inherits: any;
}

export default function convert(): PluginObj {
  /**
   * Because the current file is always "unkown", we use a custom counter to
   * identify a file. The structure is: `File -> import path -> imported`.
   *
   * An Example:
   * ```
   * Map(0, Map("ivi-html", ["h1, div"])
   * ```
   */
  const fileImports = new Map<number, Map<string, string[]>>();
  let id: number = 0;

  return {
    visitor: {
      Program(path, state: State) {
        state.opts._fileId = id++;
      },
      JSXElement(path: NodePath<t.JSXElement>, state: State) {
        const open = path.node.openingElement;
        const name = parseTagName(open);
        const isComponent = isComponentCall(open);
        const attrs = getAttributes(open.attributes);

        if (!isComponent) {
          addImport(
            state.opts._fileId as number,
            "ivi-html",
            [name],
            fileImports,
          );

          // Add event import
          if (attrs.events !== null) {
            addImport(
              state.opts._fileId as number,
              "ivi-events",
              Object.keys(attrs.events),
              fileImports,
            );
          }
        }

        // Children
        const children = t.react.buildChildren(path.node) as any;

        const binding = path.scope.getBinding(name);

        const result = !isComponent
          ? hyperscript(
              name,
              attrs.className,
              attrs.key,
              attrs.props,
              attrs.style,
              attrs.events,
              attrs.value,
              attrs.checked,
              attrs.unsafeHTML,
              children,
            )
          : hyperscriptComponent(name, attrs.props, children, binding);

        path.replaceWith(result);
      },
      JSXText(path: NodePath<t.JSXText>) {
        const text =
          path.node === null
            ? t.nullLiteral()
            : t.stringLiteral(path.node.value);
        path.replaceWith(text);
      },
    },
    pre(state) {
      state.opts._fileId = id;
    },
    post(state) {
      const counter = state.opts._fileId as number;
      const path = state.path;

      // Render imports
      const file = fileImports.get(counter) as Map<string, string[]>;
      file.forEach((values, key) => {
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
  className: string | null,
  key: null | string,
  props: null | Record<string, any>,
  style: null | t.ObjectExpression,
  events: null | Record<string, any>,
  value: null | t.StringLiteral | t.NumericLiteral,
  checked: null | boolean,
  unsafeHTML: null | string,
  children: null | any,
) {
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
