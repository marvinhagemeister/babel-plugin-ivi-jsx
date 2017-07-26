import plugin from "../plugin";
import { run } from "./helpers";

describe("Replace JSX with VNodes", () => {
  run("hyperscript", plugin);
});
