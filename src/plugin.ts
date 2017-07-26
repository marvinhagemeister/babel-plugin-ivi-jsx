import { NodePath, Visitor } from "babel-traverse";
import * as t from "babel-types";
import { Options, isComponentCall, getAttributes, parseTagName } from "./utils";
import { hyperscript, hyperscriptComponent } from "./hyperscript";
import { addImport } from "./templates";

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

export default function plugin(): PluginObj<PluginState> {
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
