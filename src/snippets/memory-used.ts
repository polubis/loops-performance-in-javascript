import { measure } from "../performance/measure";

// Our patient to test.
const sum = (...items: number[]): number => {
  return items.reduce((acc, sum) => acc + sum, 0);
};

// We are converting to a number and rounding to four decimal places.
// Different results are displayed with each use but they're very close to each other.
console.log(Number(measure(() => sum(1, 2, 3, 4, 5, 6)).toFixed(4))); // 0.0162
console.log(Number(measure(() => sum(1, 2, 3, 4, 5, 6)).toFixed(4))); // 0.0151
console.log(Number(measure(() => sum(1, 2, 3, 4, 5, 6)).toFixed(4))); // 0.0161
