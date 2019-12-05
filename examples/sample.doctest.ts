import * as assert from "assert";
import { sum, sub, Duck } from "./sample";
test("/Users/akito.ito/workspace/tsdoc-testify/examples/sample.ts_0", () => {
  assert.equal(sum(2, 1), 3);
});
test("/Users/akito.ito/workspace/tsdoc-testify/examples/sample.ts_1", () => {
  assert.equal(sum(4, 5), 9);
});
test("/Users/akito.ito/workspace/tsdoc-testify/examples/sample.ts_2", () => {
  assert.equal(sub(2, 1), 1);
});
test("/Users/akito.ito/workspace/tsdoc-testify/examples/sample.ts_3", () => {
  assert.equal(sub(4, 5), -1);
});
test("/Users/akito.ito/workspace/tsdoc-testify/examples/sample.ts_4", () => {
  const duck = new Duck();
  assert.equal(duck.quack(), "quack");
});
