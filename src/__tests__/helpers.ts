import { assert as t } from "chai";
import * as path from "path";
import * as babel from "babel-core";
import * as fs from "fs";

export function run(fixtureFolder: string, plugin: any) {
  const root = path.join(__dirname, "fixtures", fixtureFolder);
  const dirs = fs.readdirSync(root);

  const tests = dirs.map(name => {
    const source = path.join(root, name, "source.jsx");
    const result = fs.readFileSync(path.join(root, name, "result.txt"), "utf8");
    return {
      name,
      source,
      result,
    };
  });

  tests.forEach(test => {
    it("should work for " + test.name, () => {
      const { code } = babel.transformFileSync(test.source, {
        plugins: [plugin],
      });
      t.equal(code, test.result.trim());
    });
  });
}
