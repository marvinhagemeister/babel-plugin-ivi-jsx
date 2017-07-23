import { NodePath } from "babel-traverse";
import * as t from "babel-types";

/* tslint:disable:no-var-requires */
const jsx = require("babel-plugin-syntax-jsx");

export default function createParser(search: Record<string, boolean>) {
  return function plugin() {
    return {
      visitor: {
        FunctionDeclaration(path: NodePath<t.FunctionDeclaration>, state: any) {
          const name = path.node.id.name;
          if (search[name] !== undefined) {
            search[name] = false;
          }
        },
        ClassDeclaration(path: NodePath<t.ClassDeclaration>, state: any) {
          const name = path.node.id.name;
          if (search[name] !== undefined) {
            search[name] = true;
          }
        },
      },
      inherits: jsx,
    };
  };
}
