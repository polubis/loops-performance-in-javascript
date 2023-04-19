interface Summary<K extends string> {
  key: K;
  average: number;
  total: number;
}

interface Config<K extends string> {
  key: K;
  values: number[];
  digits?: number;
}

const summarize = <K extends string>({
  key,
  values,
  digits = 4,
}: Config<K>): Summary<K> => {
  // The total duration.
  const total = Number(
    values.reduce((acc, sum) => acc + sum, 0).toFixed(digits)
  );
  // The arithmetic average.
  const average = Number((total / values.length).toFixed(digits));

  return {
    key,
    total,
    average,
  };
};

export { summarize };
