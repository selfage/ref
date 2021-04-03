# @selfage/ref

## Install

`npm install @selfage/ref`

## Overview

Written in TypeScript and compiled to ES6 with inline source map & source. See [@selfage/tsconfig](https://www.npmjs.com/package/@selfage/tsconfig) for full compiler options. Provides a simple wrapper for any values, which can then be passed around by reference. The primary motivation is to pass wrappers to functions as output arguments, just like using C++ output pointer arguments.

## Output argument

See `Ref`'s [definition](https://github.com/selfage/ref/blob/main/ref.ts#L2).

```TypeScript
import { Ref } from '@selfage/ref';

function add(a: number, b: number, res: Ref<number>): void {
  res.val = a + b;
}

let outputArg = new Ref<number>();
add(1, 2, outputArg);
console.log(outputArg.val);
// Prints 3.
```

## Assign output argument while return value

See `assign()`'s [definition](https://github.com/selfage/ref/blob/main/ref.ts#L7).

```TypeScript
import { Ref, assign } from '@selfage/ref';

function add(a: number, b: number, res: Ref<number>): number {
  let value = a + b;
  return assign(res, value);
}

let res = new Ref<number>();
let ret = add(1, 2, res);
// res.val === 3
// ret == 3
```

## Intercept output

Another way to `assign()` is to intercept output while keep returning it.

```TypeScript
import { Ref, assign } from '@selfage/ref';

function add(a: number, b: number): number {
  return a + b;
}

let res1 = new Ref<number>();
let res2 = new Ref<number>();
let res3 = add(assign(res1, add(1,2)), assign(res2, add(3,4)));
// res1.val === 3
// res2.val === 7
// res3 === 10
```

Without `Ref` and `assign()`, the equivalent looks like the following.

```TypeScript
function add(a: number, b: number): number {
  return a + b;
}

let res1 = add(1,2);
let res2 = add(3,4;
let res3 = add(res1, res2);
// res1 === 3
// res2 === 7
// res3 === 10
```

## Return multiple values?

TypeScript/JavaScript can easily return an object as a way to return multiple values. Therefore this package isn't designed for that purpose.

