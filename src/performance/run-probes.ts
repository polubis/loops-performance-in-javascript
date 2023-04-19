import { measure } from "./measure";

interface Config {
  func: () => void; // Function to check.
  iterations: number; // Number of checks.
  digits?: number; // Number of decimal places
}

// Creates array which contains measured time values.
const runProbes = ({ func, iterations, digits = 4 }: Config): number[] => {
  let i = 0;
  const result: number[] = [];

  while (i < iterations) {
    // Rounding and conversion to a number.
    result.push(Number(measure(func).toFixed(digits)));
    i++;
  }

  return result;
};

export { runProbes };
