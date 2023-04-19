interface Summary<K extends string> {
  key: K;
  average: number;
  total: number;
}

interface Config<K extends string> {
  key: K;
  values: number[];
}

const summarize = <K extends string>({
  key,
  values,
}: Config<K>): Summary<K> => {
  // The total duration.
  const total = values.reduce(
    (acc, sum) => parseFloat(acc.toFixed(4)) + parseFloat(sum.toFixed(4)),
    0
  );
  // The arithmetic average.
  const average = parseFloat((total / values.length).toFixed(4));

  return {
    key,
    total,
    average,
  };
};

export { summarize };
