import { Binding } from "babel-traverse";
import * as t from "babel-types";

/**
 * `ivi` allows non-object props such as simple `strings`. This is obviously a lot
 * faster than a shallow `object` or `array` comparison.
 */
export function isPrimitiveProp(binding: Binding, name: string) {
  if (t.isFunctionDeclaration(binding.path.node)) {
    const params = binding.path.node.params;
    if (params.length === 1) {
      const first = params[0];

      if (t.isIdentifier(first) && first.name === name) {
        return true;
      }
    }
  } else {
    // FXIME: Component is in another file
  }

  return false;
}
