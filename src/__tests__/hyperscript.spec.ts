import plugin from "../hyperscript";
import { run } from "./helpers";

describe("Replace JSX with VNodes", () => {
  run("hyperscript", plugin);
});
