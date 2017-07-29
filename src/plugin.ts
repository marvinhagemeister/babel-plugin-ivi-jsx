import { NodePath, Visitor } from "babel-traverse";
import { dirname, join, extname } from "path";
import * as ts from "typescript";
import * as fs from "fs";
import * as t from "babel-types";
import { Options, isComponentCall, getAttributes, parseTagName } from "./utils";
import { hyperscript, hyperscriptComponent } from "./hyperscript";
import { addImport } from "./templates";
import importPlugin from "./importVisitor";
import { transformFileSync } from "babel-core";

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

        // Check if is class component
        // TODO: Update typings, may return undefined.
        const binding = path.scope.getBinding(name);

        let isClass: boolean = false;
        if (isComponent && binding !== undefined) {
          const iNode = binding.path.findParent(node =>
            t.isImportDeclaration(node),
          ) as NodePath<t.ImportDeclaration> | null;
          if (iNode !== null) {
            const source = (this as any).file.opts.filename;

            // TODO: Refactor this to be more performant and less brittle.
            if (source !== undefined && source !== "unknown") {
              const file = iNode.node.source.value;

              // We simply assume that both files share the same extension

              const cache: Record<string, boolean> = {
                [name]: false,
              };

              const files = fs.readdirSync(dirname(source));
              const res2 = files.find(
                item =>
                  item.startsWith(join(file)) &&
                  (item.endsWith("js") ||
                    item.endsWith("jsx") ||
                    item.endsWith("ts") ||
                    item.endsWith("tsx")),
              );

              const sourceFile = join(
                dirname(source),
                res2 === undefined ? file + extname(source) : res2,
              );

              let content = fs.readFileSync(sourceFile, "utf-8");

              // TypeScript support
              if (sourceFile.endsWith(".ts") || sourceFile.endsWith(".tsx")) {
                const compilerOptions = require(join(process.cwd(), "tsconfig"))
                  .compilerOptions;

                const res1 = ts.transpileModule(content, {
                  compilerOptions,
                  moduleName: "myModule2",
                });

                content = res1.outputText;
              }

              transformFileSync(sourceFile, {
                plugins: [importPlugin(cache)],
              });
              isClass = cache[name];
            } else {
              throw new Error(
                `Could not detect source file of which "${name}" is imported.`,
              );
            }
          }
        }

        // Children
        const children = t.react.buildChildren(path.node) as any;

        const result = !isComponent
          ? hyperscript(name, attrs, children)
          : hyperscriptComponent(name, attrs.props, children, binding, {
              primitiveProp: false,
              isClass,
            });

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
