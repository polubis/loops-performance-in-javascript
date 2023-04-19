import { measure } from "./measure";

interface Config {
  func: () => void; // Function to check.
  iterations: number; // Number of checks.
}

// Creates array which contains measured time values.
const runProbes = ({ func, iterations }: Config): number[] => {
  let i = 0;
  const result: number[] = [];

  while (i < iterations) {
    // Rounding and conversion to a number.
    result.push(measure(func));
    i++;
  }

  return result;
};

export { runProbes };
