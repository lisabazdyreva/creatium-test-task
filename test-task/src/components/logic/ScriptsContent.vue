<script setup lang="ts">
import ScriptTreeItem from '@/components/logic/ScriptTreeItem.vue';
import type { IScriptTreeItemNested } from '@/types/script.ts';
import { ItemPlace } from '@/const';

defineProps<{
  data: Array<IScriptTreeItemNested> | null;
  dragOverId: string | null;
  dragId: string | null;
}>();

defineEmits<{
  (e: 'drag-start', id: string): void;
  (e: 'drag-over', id: string): void;
  (e: 'drag-drop', value: ItemPlace): void;
  (e: 'drag-end'): void;
}>();
</script>

<template>
  <div class="scripts-content">
    <p v-if="!data?.length">Сценария для запуска нет</p>

    <div v-else class="scripts-content__scripts scripts">
      <ul class="scripts__list">
        <ScriptTreeItem
          v-for="(item, i) in data"
          :key="item.id"
          class="scripts__item"
          :item="item"
          :is-last="i === item.children.length - 1"
          :drag-over-id="dragOverId"
          :drag-id="dragId"
          :nested-level="0"
          @handle-dragstart="(value: string) => $emit('drag-start', value)"
          @handle-dragover="(value: string) => $emit('drag-over', value)"
          @handle-drop="(value: ItemPlace) => $emit('drag-drop', value)"
          @handle-dragend="$emit('drag-end')"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.scripts-content {
  font-family: 'Rubik', 'Arial', sans-serif;
  margin-top: 24px;
  margin-right: 10px;
  margin-left: 16px;
}
</style>
