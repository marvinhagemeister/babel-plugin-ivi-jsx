import { assert as t } from "chai";
import * as babel from "babel-core";
import plugin from "../";

const example = `
function Foo() {
  return <div>
    <span>Foo</span>
  </div>;
}
`;

describe("foo", () => {
  it("should return foo", () => {
    const { code } = babel.transform(example, { plugins: [plugin] });
    t.equal(code, "foo");
  });
});
