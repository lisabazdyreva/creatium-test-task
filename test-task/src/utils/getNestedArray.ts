export const getNestedArray = <T, N>(arr: T[]): N[] => {
  const ids: Map<string, string> = new Map();
  const result: N[] = [];

  arr.forEach((item) => {
    ids.set(item.id, { ...item, children: [] });
  });

  arr.forEach((item) => {
    if (item.pid) {
      const parent = ids.get(item.pid);
      if (parent) {
        parent.children.push(ids.get(item.id));
      }
    } else {
      result.push(ids.get(item.id));
    }
  });
  return result;
};
