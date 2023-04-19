// We will receive function as a parameter, call it, and then
// measure the time it took to call it.
const measure = (func: () => void): number => {
  const start = performance.now();
  func();
  const end = performance.now();

  return end - start;
};

export { measure };
