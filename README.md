## tsdoc-testify

documentation testing for [tsdoc](https://github.com/microsoft/tsdoc).

Inspired by [Rust documentation tests](https://doc.rust-lang.org/rustdoc/documentation-tests.html),
this tool extracts code from `@example` block of tsdoc style comments and generate [jest](https://jestjs.io/) friendly test codes.

## Getting Started

### Prerequisites

- Node.js v12+
- [jest](https://www.npmjs.com/package/jest)

### Installing

```
$ npm install -g tsdoc-testify
```

### How to use

1. Prepare `.ts` file with [tsdoc](https://github.com/microsoft/tsdoc) style docs.

````ts
/**
 * sub function
 *
 * @remarks
 * demo
 *
 * @example
 *
 * ```
 * import * as assert from "assert";
 * import { sub } from "./sample";
 *
 * assert.equal(sub(2, 1), 1);
 * ```
 *
 * @example
 *
 * ```
 * import * as assert from "assert";
 * import { sub } from "./sample";
 *
 * assert.equal(sub(4, 5), -1);
 * ```
 * @param a
 * @param b
 */
export function sub(a: number, b: number) {
  return a - b;
}
````

2. Generate test code

```
$ tsdoc-testify --filepath path/to/file.ts  # (or also accepts glob with --fileMatch flag)
```

By default, generate testcode file in the same directory as original file with `.doctest.ts` extension.

```ts
// Code generated by "tsdoctestify"; DO NOT EDIT.

import * as assert from "assert";
import { sum, sub, Duck } from "./sample";
test("/Users/akito/workspace/tsdoc-testify/examples/sample.ts_1", () => {
  assert.equal(sub(2, 1), 1);
});
test("/Users/akito/workspace/tsdoc-testify/examples/sample.ts_2", () => {
  assert.equal(sub(4, 5), -1);
});
```

3. Setup `jest`

Add `.doctest.ts` pattern to `testMatch` directive of `jest` config.

```json
  "jest": {
    "moduleFileExtensions": [
      "ts",
      "tsx"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "globals": {
      "ts-jest": {
        "tsConfig": "tsconfig.json"
      }
    },
    "testMatch": [
      "**/__tests__/*.+(ts|tsx|js)",
      "**/*.doctest.ts" // add
    ],
    "testPathIgnorePatterns": [
      "/node_modules/"
    ]
  },
```

4. Run

```sh
$ jest

 PASS  examples/sample.doctest.ts
  ✓ /Users/akito/workspace/tsdoc-testify/examples/sample.ts_0 (2ms)
  ✓ /Users/akito/workspace/tsdoc-testify/examples/sample.ts_1

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.857s, estimated 3s
```

## Custom tags

### @exampleCaseName

Test case name (the first argument of `test` function) is `original filename + order no` by default.
It can be modified by using `@exampleCaseName` inline tag.

For example.

````ts
/**
 *
 * @example
 * {@exampleCaseName custom name here}
 *
 * ```
 * import * as assert from "assert";
 * import { sub } from "./sample";
 *
 * assert.equal(sub(2, 1), 1);
 * ```
 *
 */
export function sub(a: number, b: number) {
  return a - b;
}
````

then:

```ts
// Code generated by "tsdoctestify"; DO NOT EDIT.

import * as assert from "assert";
import { sum, sub, Duck } from "./sample";

test("custom name here", () => {
  assert.equal(sub(2, 1), 1);
});
```

### @ignoreExample

If you want to skip generation for specific `@example` case, you can use `@ignoreExample` inline tag.

````ts
/**
 * @example
 *
 * ```
 * import * as assert from "assert";
 * import { sub } from "./sample";
 *
 * assert.equal(sub(3, 2), 1);
 * ```
 *
 * @example
 * {@ignoreExample}
 *
 * ```
 * import * as assert from "assert";
 * import { sub } from "./sample";
 *
 * assert.equal(sub(2, 1), 1);
 * ```
 *
 */
export function sub(a: number, b: number) {
  return a - b;
}
````

then:

```ts
// Code generated by "tsdoctestify"; DO NOT EDIT.

import * as assert from "assert";
import { sum, sub, Duck } from "./sample";

test("/Users/akito/workspace/tsdoc-testify/examples/sample.ts_2", () => {
  assert.equal(sub(3, 2), 1);
});
```

Second block is ignored.

## Examples

see [examples](./examples)

## Options

```
NAME:
   tsdoc-testify - documentation testing generator for tsdoc

USAGE:
   tsdoc-testify [OPTIONS]

VERSION:
  0.0.1


OPTIONS:
	--help  	 show help
	--filepath  	 src file path (only single file accepted)
	--fileMatch  	 src file path (regexp).
```

## License

This project is licensed under the Apache License 2.0 License - see the [LICENSE](LICENSE) file for details
