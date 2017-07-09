import { assert as t } from "chai";
import { camelCaseEvent } from "../utils";

describe("camelCaseEvent", () => {
  it("should camelCase Event", () => {
    t.equal(camelCaseEvent("onclick"), "onClick");
    t.equal(camelCaseEvent("onmouseover"), "onMouseover");
  });
});
