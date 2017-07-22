import { assert as tc } from "chai";
import * as t from "babel-types";
import { camelCaseEvent, isComponentCall } from "../utils";

describe("camelCaseEvent", () => {
  it("should camelCase Event", () => {
    tc.equal(camelCaseEvent("onclick"), "onClick");
    tc.equal(camelCaseEvent("onmouseover"), "onMouseover");
  });
});

describe("isComponentCall", () => {
  it("should detect components", () => {
    const node = t.jSXOpeningElement(t.jSXIdentifier("Component"), []);
    tc.equal(isComponentCall(node), true);
  });

  it("should detect Foo.default", () => {
    const node = t.jSXOpeningElement(
      t.jSXMemberExpression(
        t.jSXIdentifier("Component"),
        t.jSXIdentifier("default"),
      ),
      [],
    );

    tc.equal(isComponentCall(node), true);
  });
});
