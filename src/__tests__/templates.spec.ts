import { assert as t } from "chai";
import generate from "babel-generator";
import { wildCardImport, defaultImport, buildImport } from "../templates";

describe("buildWildCardImport", () => {
  it("should create correct ast", () => {
    const ast = wildCardImport("bar", "foo");
    t.equal(generate(ast).code, `import * as bar from "foo";`);
  });
});

describe("buildDefaultImport", () => {
  it("should create correct ast", () => {
    const ast = defaultImport("bar", "foo");
    t.equal(generate(ast).code, `import bar from "foo";`);
  });
});

describe("buildImport", () => {
  it("should create correct ast", () => {
    const ast = buildImport(["bar", "boof"], "foo");
    t.equal(generate(ast).code, `import { bar, boof } from "foo";`);
  });
});
