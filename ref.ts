// Shorthand for reference.
export class Ref<T> {
  val?: T;
}

// Wraps `val` inside `ref` while returns `val`.
export function assign<T>(ref: Ref<T>, val: T): T {
  ref.val = val;
  return val;
}
