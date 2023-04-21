// We calculate the duration of any function.
const measure = (func: () => void): number => {
  const start = performance.now();
  func();
  const end = performance.now();

  return end - start;
};

export { measure };
