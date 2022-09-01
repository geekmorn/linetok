export const compose = <R>(
  fn1: (element: R) => R,
  ...fns: Array<(element: R) => R>
) => fns.reduce((prevFn, nextFn) => (element) => prevFn(nextFn(element)), fn1)
