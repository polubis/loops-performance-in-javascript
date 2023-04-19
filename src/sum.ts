const reduceSum = (...items: number[]): number => {
  return items.reduce((acc, item) => acc + item, 0);
};

const whileSum = (...items: number[]): number => {
  let sum = 0;
  let i = 0;

  while (i < items.length) {
    sum += items[i];
    i++;
  }

  return sum;
};

const forSum = (...items: number[]): number => {
  let sum = 0;

  for (let i = 0; i < items.length; i++) {
    sum += items[i];
  }

  return sum;
};

const forEachSum = (...items: number[]): number => {
  let sum = 0;

  items.forEach((item) => {
    sum += item;
  });

  return sum;
};

const recursiveSum = (...items: number[]): number => {
  const calculate = (i = 0, sum = 0): number => {
    if (i === items.length) {
      return sum;
    }

    return calculate(i + 1, (sum += items[i]));
  };

  return calculate();
};

export { reduceSum, whileSum, forSum, forEachSum, recursiveSum };
