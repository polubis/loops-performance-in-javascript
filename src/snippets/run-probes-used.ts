import { runProbes } from "../performance/run-probes";

// Our function, of which performance we want to measure.
const sum = (...items: number[]): number => {
  return items.reduce((acc, sum) => acc + sum, 0);
};

// The sum function will be run 1000 times with the same parameters.
runProbes({
  iterations: 1000,
  func: () => sum(1, 2, 3, 4, 5, 6),
});
