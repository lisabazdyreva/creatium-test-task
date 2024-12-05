export const getNestedArray = <
  T extends { id: string; pid?: string },
  N extends T & { children: N[] },
>(
  arr: T[],
): N[] => {
  const ids: Map<string, N> = new Map();
  const result: N[] = [];

  for (const arrItem of arr) {
    ids.set(arrItem.id, { ...arrItem, children: [] } as unknown as N);
  }

  for (const item of arr) {
    if (item.pid) {
      const parent = ids.get(item.pid);
      const children = ids.get(item.id);

      if (parent && children) {
        parent.children.push(children);
      }
      continue;
    }

    const itemById = ids.get(item.id);

    if (itemById) {
      result.push(itemById);
    }
  }

  return result;
};
