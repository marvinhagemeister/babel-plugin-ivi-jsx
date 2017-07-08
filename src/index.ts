import { VNode, VNodeFlags } from "ivi";
import { SVG_ELEMENTS } from "vdom-utils";
import * as Babel from "babel-core";
import * as t from "babel-types";
import traverse from "babel-traverse";

/* tslint:disable:no-bitwise no-var-requires */
const jsx = require("babel-plugin-syntax-jsx");

const visitor = {
  JSXElement(path: any) {
    const open = path.node.openingElement;
    const name = open.name.name;

    const flags = getFlags(t, name);
    const attrs = getAttributes(t, open.attributes);
    const props = Object.keys(attrs.props).length > 0 ? attrs.props : null;

    path.node.children = (t as any).react.buildChildren(path.node);

    const callExpr = buildExpression(
      t,
      flags,
      name,
      props,
      attrs.className,
      path.node.children,
    );

    path.replaceWith((t as any).inherits(callExpr, path.node));
  },
  JSXText(path: any) {
    const text = path.node === null
      ? t.nullLiteral()
      : t.stringLiteral(path.node.value);
    path.replaceWith(text);
  },
};

export default function convert(babel: any) {
  const t = babel.types;

  return {
    visitor,
    inherits: jsx,
  };
}

export function buildExpression(
  t: any,
  flags: VNodeFlags,
  name: string,
  props: any,
  className: string | null,
  children: any,
) {
  const nameExp = t.stringLiteral(name); // TODO: Components
  const classExp = className === null
    ? t.nullLiteral()
    : t.stringLiteral(className);

  let propExp = t.nullLiteral();
  if (props !== null) {
    propExp = objToExpression(t, props);
  }

  let childrenExp = t.nullLiteral();
  if (children !== null) {
    if (Array.isArray(children)) {
      const filtered = children
        .map(node => {
          if (node.value !== undefined) {
            node.value = node.value.replace(/\n\s+/g, "\n");
          }

          return node;
        })
        .filter(node => node.value !== "\n");
      if (filtered.length === 1) {
        childrenExp = filtered[0];
      } else if (filtered.length > 1) {
        childrenExp = filtered;
      }
    } else {
      childrenExp = t.stringLiteral(children);
    }
  }

  return t.newExpression(t.identifier("VNode"), [
    t.numericLiteral(flags),
    nameExp,
    propExp,
    classExp,
    childrenExp,
  ]);
}

export function objToExpression(t: any, obj: any) {
  const keys = Object.keys(obj);
  return t.ObjectExpression(
    keys.map(key => {
      const name = getName(t, key);
      const value = getValue(t, obj[key]);
      return t.ObjectProperty(name, value);
    }),
  );
}

export function getName(t: any, name: string) {
  if (name.indexOf("-") > -1) {
    return t.StringLiteral(name);
  }
  return t.identifier(name);
}

function getValue(t: any, value: any) {
  if (!value) {
    return t.BooleanLiteral(true);
  }

  if (t.isJSXExpressionContainer(value)) {
    return value.expression;
  }

  return t.stringLiteral(value);
}

export function getFlags(t: any, name: string) {
  if (name.charAt(0) === name.charAt(0).toLocaleLowerCase()) {
    if (SVG_ELEMENTS.has(name)) {
      return VNodeFlags.Element | VNodeFlags.SvgElement;
    } else if (name === "textarea") {
      return (
        VNodeFlags.Element |
        VNodeFlags.InputElement |
        VNodeFlags.TextAreaElement
      );
    } else if (name === "input") {
      return VNodeFlags.Element | VNodeFlags.InputElement;
    } else if (name === "audio" || name === "video") {
      return VNodeFlags.Element | VNodeFlags.MediaElement;
    } else {
      return VNodeFlags.Element;
    }
  }

  throw new Error("Not implemented");
}

export function getAttributes(t: any, attrs: any[] | null) {
  if (attrs === null) {
    return {
      props: null,
      className: null,
    };
  }

  return attrs.reduce(
    (obj, item) => {
      const name = item.name.name;
      const value = item.value === null ? null : item.value.value;

      if (name === "class" || name === "className") {
        obj.className = value;
      } else {
        obj.props[name] = value;
      }

      return obj;
    },
    {
      props: {},
      className: null,
    },
  );
}
