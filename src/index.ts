import { VNode, VNodeFlags } from "ivi";
import { SVG_ELEMENTS } from "vdom-utils";
import * as Babel from "babel-core";
import * as t from "babel-types";
import traverse from "babel-traverse";

/* tslint:disable:no-bitwise no-var-requires */
const jsx = require("babel-plugin-syntax-jsx");

export default function convert(babel: any) {
  const t = babel.types;

  return {
    visitor: {
      JSXElement(path: any) {
        const open = path.node.openingElement;
        const name = open.name.name;

        const flags = getFlags(t, name);
        const attrs = getAttributes(t, open.attributes);
        const props = Object.keys(attrs.props).length > 0 ? attrs.props : null;

        path.replaceWith(
          buildExpression(t, flags, name, props, attrs.className, null),
        );
      },
    },
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

  const propExp = props === null ? t.nullLiteral() : props;
  const childrenExp = t.nullLiteral();

  return t.newExpression(t.identifier("VNode"), [
    t.numericLiteral(flags),
    nameExp,
    propExp,
    classExp,
    childrenExp,
  ]);
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

export function getAttributes(t: any, attrs: any[]) {
  return attrs.reduce(
    (obj, item) => {
      const name = item.name.name;
      const value = item.value.value;

      if (name === "class" || name === "className") {
        obj.props.className = value;
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
