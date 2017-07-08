import { assert as t } from "chai";
import * as path from "path";
import * as babel from "babel-core";
import { readDir, readFile } from "nicer-fs";
import * as fs from "fs";
import plugin from "../";

function run() {
  const root = path.join(__dirname, "fixtures");
  const dirs = fs.readdirSync(root);

  const tests = dirs.map(name => {
    const source = fs.readFileSync(path.join(root, name, "source.tsx"), "utf8");
    const result = fs.readFileSync(path.join(root, name, "result.txt"), "utf8");
    return {
      name,
      source,
      result,
    };
  });

  tests.forEach(test => {
    it("should work for " + test.name, () => {
      const { code } = babel.transform(test.source, { plugins: [plugin] });
      t.equal(code, test.result);
    });
  });
}

describe("Replace JSX with VNodes", () => {
  run();
});
