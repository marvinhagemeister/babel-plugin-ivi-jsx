import * as t from "babel-types";
import { NodePath } from "babel-traverse";

export function isComponentCall(node: t.JSXOpeningElement): boolean {
  const name = t.isJSXIdentifier(node.name) ? node.name.name : "";
  return name.length > 0 && name.charAt(0) === name.charAt(0).toUpperCase();
}

export interface Options {
  imports: string;
  primitiveProps: boolean;
  _pragmaIncluded: boolean;
}

export function getProgram<T>(path: NodePath<T>): NodePath<t.Program> {
  return path.findParent(p => p.isProgram()) as any;
}

export function addImport(node: t.Program, importExp: t.ImportDeclaration) {
  if (node.body === undefined) {
    node.body = [];
  }

  return node.body.unshift(importExp);
}

export interface Attributes {
  key: null | string;
  events: null | Record<string, (ev: any) => void>;
  props: null | Record<string, any>;
  className: null | string;
  style: null | t.ObjectExpression;
}

export function getAttributes(
  attrs: any[] | null,
  /* tslint:disable:next-line no-shadowed-variable */
  isComponent: boolean = false,
): Attributes {
  if (attrs === null) {
    return {
      key: null,
      events: null,
      props: null,
      className: null,
      style: null,
    };
  }

  return attrs.reduce(
    (obj, item) => {
      const name = item.name.name;

      /* tslint:disable:prefer-conditional-expression */
      let value: any;
      if (t.isJSXExpressionContainer(item.value)) {
        if (t.isObjectExpression(item.value.expression)) {
          value = item.value.expression;
        } else {
          value = item.value.expression.value;
        }
      } else {
        value = item.value.value;
      }

      if (name === "class" || name === "className") {
        obj.className = value;
      } else if (!isComponent && name.startsWith("on")) {
        if (obj.events === null) {
          obj.events = {};
        }
        obj.events[name] = item.value.expression;
      } else if (name === "key") {
        obj.key = value;
      } else if (name === "style") {
        obj.style = value;
      } else {
        if (obj.props === null) {
          obj.props = {};
        }

        obj.props[name] = value;
      }

      return obj;
    },
    {
      key: null,
      events: null,
      props: null,
      className: null,
      style: null,
    },
  );
}

export function camelCaseEvent(name: string): string {
  return "on" + name.slice(2, 3).toUpperCase() + name.slice(3);
}
