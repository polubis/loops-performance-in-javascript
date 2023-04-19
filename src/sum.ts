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

export { reduceSum, whileSum, forSum, forEachSum };
