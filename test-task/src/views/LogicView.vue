<script setup lang="ts">
import ScriptsHeader from '@/components/logic/ScriptsHeader.vue';
import ScriptsContent from '@/components/logic/ScriptsContent.vue';
import ScriptsListSidebar from '@/components/logic/ScriptsListSidebar.vue';
import AddScriptsSidebar from '@/components/logic/AddScriptsSidebar.vue';

import { useDragnDrop } from '@/composables/useDragnDrop.ts';
import ScriptItemsMock from '@/mocks/scripts.json';
import type { IScriptTreeItem, IScriptTreeItemNested } from '@/types/script.ts';
import { computed, ref } from 'vue';
import { getNestedArray } from '@/utils/getNestedArray.ts';
import { getItemIndexedById } from '@/utils/getItemIndexedById.ts';
import { getSlicedArray } from '@/utils/getSlicedArray.ts';

const scriptData = ref<Array<IScriptTreeItem>>(ScriptItemsMock);
const scriptDataNested = computed<Array<IScriptTreeItemNested>>(() =>
  getNestedArray<IScriptTreeItem, IScriptTreeItemNested>(scriptData.value),
);

const {
  dragId,
  dragOverId,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
} = useDragnDrop();

const updateScriptData = (
  item: IScriptTreeItem,
  arr: IScriptTreeItem[],
  indexR: number,
  indexAdd: number,
) => {
  const dataWithoutDragged = getSlicedArray<IScriptTreeItem>(
    arr,
    'remove',
    indexR,
  );

  scriptData.value = getSlicedArray<IScriptTreeItem>(
    dataWithoutDragged,
    'add',
    indexAdd,
    item,
  );
};

const updateChildrenIds = (arr: IScriptTreeItem, id: string, pid: string) => {
  return arr.map((item) => {
    if (id !== item?.pid) {
      return item;
    }
    return {
      ...item,
      pid,
    };
  });
};

const updateData = () => {
  const { item: itemDragged, index: indexDragged } =
    getItemIndexedById<IScriptTreeItem>(scriptData.value, dragId.value);

  const { item: itemToCopy, index: indexCopied } =
    getItemIndexedById<IScriptTreeItem>(scriptData.value, dragOverId.value);

  if (!itemToCopy || !itemToCopy?.pid || !itemDragged) {
    return;
  }

  const itemToAdd: IScriptTreeItem = {
    ...itemDragged,
    pid: itemToCopy?.pid,
    id: Math.random().toString(),
  };

  const updatedDataChildren: IScriptTreeItem[] = updateChildrenIds(
    scriptData.value,
    dragId.value,
    itemToAdd.id,
  );
  updateScriptData(itemToAdd, updatedDataChildren, indexDragged, indexCopied);
};

const handleItemDrop = () => {
  handleDrop(updateData);
};

// todo lisa написать отдельный старт для сайдбара
</script>

<template>
  <div class="home-view">
    <ScriptsListSidebar class="home-view__left-aside" />
    <main class="home-view__main">
      <ScriptsHeader class="home-view__scripts-header" />
      <section class="home-view__content content">
        <ScriptsContent
          class="content__scripts-content"
          :data="scriptDataNested"
          :drag-over-id="dragOverId"
          @drag-start="handleDragStart"
          @drag-over="handleDragOver"
          @drag-drop="handleItemDrop"
          @drag-end="handleDragEnd"
        />

        <AddScriptsSidebar
          class="content__right-aside"
          @drag-start="handleDragStart"
        />
      </section>
    </main>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  width: 100%;
}
.home-view__main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100svh;
  border-left: 1px solid var(--border-color);
}

.home-view__content {
  flex: 1;
}

.content {
  display: grid;
  grid-template-columns: auto 320px;
}

.content__scripts-content {
  background-color: var(--bg-white);
}

.content__right-aside {
  background-color: var(--bg-white);
  border-left: 1px solid var(--border-color);
}
</style>
