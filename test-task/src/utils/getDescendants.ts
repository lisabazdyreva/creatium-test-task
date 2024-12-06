export const getDescendants = <T extends { pid?: string; id: string }>(
  items: T[],
  pid: string,
): string[] => {
  const descendants: string[] = [];
  for (const item of items) {
    if (item?.pid === pid) {
      descendants.push(item.id, ...getDescendants(items, item.id));
    }
  }
  return descendants;
};
