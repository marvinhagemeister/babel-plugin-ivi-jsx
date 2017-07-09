import * as t from "babel-types";

export function wildCardImport(
  name: string,
  from: string,
): t.ImportDeclaration {
  return t.importDeclaration(
    [t.importNamespaceSpecifier(t.identifier(name))],
    t.stringLiteral(from),
  );
}

export function defaultImport(name: string, from: string): t.ImportDeclaration {
  return t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(name))],
    t.stringLiteral(from),
  );
}

export function buildImport(ids: string[], from: string): t.ImportDeclaration {
  return t.importDeclaration(
    ids.map(id => t.importSpecifier(t.identifier(id), t.identifier(id))),
    t.stringLiteral(from),
  );
}
