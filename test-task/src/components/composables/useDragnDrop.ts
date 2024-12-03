import { ref } from 'vue';

export function useDragnDrop() {
  const dragId = ref<string | null>(null);
  const dragOverId = ref<string | null>(null);

  const handleDragStart = (id: string) => {
    dragId.value = id;
  };

  const handleDragOver = (id: string) => {
    dragOverId.value = id;
  };

  const _clearIds = () => {
    dragId.value = null;
    dragOverId.value = null;
  };

  const handleDrop = (id: string) => {
    if (dragId.value !== null && dragId.value !== id) {
      console.log(dragId.value, dragOverId.value);
      // replace items
    }
    _clearIds();
  };

  const handleDragEnd = () => {
    _clearIds();
  };

  return {
    dragId,
    dragOverId,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}
