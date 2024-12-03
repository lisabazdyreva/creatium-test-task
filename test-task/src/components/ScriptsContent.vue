<script setup lang="ts">
import ScriptItem from '@/components/ScriptItem.vue';

import ScriptItemsMock from '@/mocks/scripts.json';
import { useDragnDrop } from '@/components/composables/useDragnDrop.ts';

const scriptData = ScriptItemsMock as any; // todo lisa

const {
  dragOverId,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
} = useDragnDrop();
</script>

<template>
  <div class="scripts-content">
    <p v-if="!scriptData?.length">Сценария для запуска нет</p>

    <div v-else class="scripts-content__scripts scripts">
      <ul class="scripts__list">
        <ScriptItem
          v-for="item in scriptData"
          :key="item.id"
          class="scripts__item"
          :item="item"
          :drag-over-id="dragOverId"
          :nested-level="1"
          @handle-dragstart="handleDragStart"
          @handle-dragover="handleDragOver"
          @handle-drop="(value: string) => handleDrop(value)"
          @handle-dragend="handleDragEnd"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.scripts-content {
  margin-top: 24px;
  margin-right: 10px;
  margin-left: 16px;
}
</style>
