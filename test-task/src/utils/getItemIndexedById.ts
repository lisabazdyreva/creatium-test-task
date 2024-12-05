export const getItemIndexedById = <T extends { id: string }>(
  arr: T[],
  id: string,
): { item: T | null; index: number | null } => {
  let indexToFind: number | null = null;

  const item = arr.find((item, index) => {
    if (id === item?.id) {
      indexToFind = index;
      return id === item.id;
    }
  });

  return {
    item: item || null,
    index: indexToFind,
  };
};
