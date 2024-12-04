export const getItemIndexedById = <T>(
  arr: T[],
  id: string,
): { item: T | null; index: number | null } => {
  let indexToFind: number | null = null;

  const item = arr.find((item, index) => {
    if (id === item.id) {
      indexToFind = index;
      return id === item.id;
    }
  });

  return {
    item,
    index: indexToFind,
  };
};
