import { onMounted, onUnmounted, ref } from 'vue';

export function useDragnDrop() {
  const dragId = ref<string | null>(null);
  const dragOverId = ref<string | null>(null);

  const isDataClearable = ref(true);

  const handleDragStart = (id: string) => {
    dragId.value = id;
  };

  const handleDragOver = (id: string) => {
    dragOverId.value = id;
  };

  const _clearIds = () => {
    if (isDataClearable.value) {
      dragId.value = null;
      dragOverId.value = null;
    }
  };

  const handleDrop = (cd: () => void) => {
    if (dragId.value !== null && dragId.value !== dragOverId.value) {
      cd();
    }
    _clearIds();
  };

  const setIsClearable = (value: boolean) => {
    isDataClearable.value = value;
  };

  const handleDragEnd = () => {
    _clearIds();
  };

  const handleDocumentDrop = () => {
    _clearIds();
  };

  onMounted(() => {
    document.addEventListener('dragend', handleDocumentDrop);
  });

  onUnmounted(() => {
    document.removeEventListener('dragend', handleDocumentDrop);
  });

  return {
    dragId,
    dragOverId,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    setIsClearable,
  };
}
