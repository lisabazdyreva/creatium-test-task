export const getSlicedArray = <T>(
  arr: T[],
  method: 'add' | 'remove',
  index: number,
  item?: T,
): T[] => {
  switch (method) {
    case 'add': {
      if (item) {
        return [...arr.slice(0, index), item, ...arr.slice(index)];
      }
      return arr.slice();
    }
    case 'remove': {
      return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
  }
};
