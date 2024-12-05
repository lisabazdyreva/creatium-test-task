import { DataMethod } from '@/const';

export const getSlicedArray = <T>(
  arr: T[],
  method: DataMethod,
  index: number,
  item?: T,
): T[] => {
  switch (method) {
    case DataMethod.Add: {
      if (item) {
        return [...arr.slice(0, index), item, ...arr.slice(index)];
      }
      return arr.slice();
    }
    case DataMethod.Remove: {
      return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
  }
};
