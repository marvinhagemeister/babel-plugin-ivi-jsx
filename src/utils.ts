import * as t from "babel-types";

export function isComponentCall(node: t.JSXOpeningElement): boolean {
  let name = "";
  if (t.isJSXIdentifier(node.name)) {
    name = node.name.name;
  } else {
    if (t.isJSXIdentifier(node.name.object)) {
      name = node.name.object.name + "." + node.name.property.name;
    } else {
      throw new Error("Unknown node: " + JSON.stringify(node.name, null, 2));
    }
  }

  return name.length > 0 && name.charAt(0) === name.charAt(0).toUpperCase();
}

export interface Options {
  primitiveProps: boolean;
  _fileId?: number;
}

export interface Attributes {
  key: null | string;
  events: null | Record<string, any>;
  props: null | Record<string, any>;
  className: null | string;
  style: null | t.ObjectExpression;
  unsafeHTML: null | string;
  checked: null | boolean;
  value: null | t.NumericLiteral | t.StringLiteral;
}

export function getAttributes(
  attrs: any[] | null,
  isComponent: boolean = false,
): Attributes {
  if (attrs === null) {
    return {
      key: null,
      events: null,
      props: null,
      className: null,
      style: null,
      unsafeHTML: null,
      value: null,
      checked: null,
    };
  }

  return attrs.reduce(
    (obj: Attributes, item) => {
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
        if (t.isJSXIdentifier(item.name, { name: "checked" })) {
          value = item.value !== null || item.value !== false;
        } else {
          value = item.value.value;
        }
      }

      if (name === "key") {
        obj.key = value;
      } else if (!isComponent && (name === "class" || name === "className")) {
        obj.className = value;
      } else if (!isComponent && name.startsWith("on")) {
        if (obj.events === null) {
          obj.events = {};
        }
        obj.events[name] = item.value.expression;
      } else if (!isComponent && name === "style") {
        obj.style = value;
      } else if (
        !isComponent &&
        (name === "unsafeHTML" || name === "dangerouslySetInnerHTML")
      ) {
        obj.unsafeHTML = value;
      } else if (!isComponent && name === "value") {
        obj.value = value;
      } else if (!isComponent && name === "checked") {
        obj.checked = value;
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
      unsafeHTML: null,
      value: null,
      checked: null,
    },
  );
}

export function camelCaseEvent(name: string): string {
  return "on" + name.slice(2, 3).toUpperCase() + name.slice(3);
}

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
