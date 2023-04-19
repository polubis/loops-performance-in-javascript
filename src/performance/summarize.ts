interface Summary<K extends string> {
  key: K;
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
  const total = parseFloat(
    values
      .reduce(
        (acc, sum) => parseFloat(acc.toFixed(4)) + parseFloat(sum.toFixed(4)),
        0
      )
      .toFixed(4)
  );

  return {
    key,
    total,
  };
};

export { summarize };
