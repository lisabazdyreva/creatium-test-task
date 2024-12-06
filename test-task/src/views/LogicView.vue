<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ElDialog } from 'element-plus';

import ScriptsHeader from '@/components/logic/ScriptsHeader.vue';
import ScriptsContent from '@/components/logic/ScriptsContent.vue';
import ScriptsListSidebar from '@/components/logic/ScriptsListSidebar.vue';
import AddScriptsSidebar from '@/components/logic/AddScriptsSidebar.vue';
import AddActionForm from '@/components/logic/AddActionForm.vue';

import { useDragnDrop } from '@/composables/useDragnDrop.ts';
import type { IScriptTreeItem, IScriptTreeItemNested } from '@/types/script.ts';

import { getNestedArray } from '@/utils/getNestedArray.ts';
import { getItemIndexedById } from '@/utils/getItemIndexedById.ts';
import { getNewAction } from '@/utils/getNewAction.ts';

import { ActionType } from '@/const/scriptType.ts';
import { ItemPlace } from '@/const';
import { useScriptsStore } from '@/stores/scripts.ts';
import { getActionTitle } from '@/utils/getActionTitle.ts';
import { getDescendants } from '@/utils/getDescendants.ts';

const store = useScriptsStore();

const scriptDataNested = computed<Array<IScriptTreeItemNested> | null>(() => {
  if (store.editScript?.scriptsData) {
    return getNestedArray<IScriptTreeItem, IScriptTreeItemNested>(
      store.editScript?.scriptsData,
    );
  }
  return null;
});

const dialogVisible = ref(false);
const formType = ref<null | ActionType>(null);
const newActionItem = ref<null | IScriptTreeItem>(null);
const itemPlace = ref<null | ItemPlace>(null);

const {
  dragId,
  dragOverId,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  setIsClearable,
} = useDragnDrop();

const excludedChildrenIds = computed(() => {
  if (!dragId.value || !store.editScript) {
    return [];
  }

  return getDescendants<IScriptTreeItem>(
    store.editScript.scriptsData,
    dragId.value,
  );
});

const getAddIndex = (place: ItemPlace | null, prevIndex: number) => {
  if (!place || !store.editScript?.scriptsData?.length) {
    return 0;
  }

  switch (place) {
    case ItemPlace.Inside: {
      return store.editScript.scriptsData.length - 1;
    }
    case ItemPlace.Bottom: {
      return prevIndex + 1;
    }
    case ItemPlace.Top: {
      return prevIndex;
    }
  }
};

const getPid = (item: IScriptTreeItem, place: ItemPlace | null) => {
  if (!place) {
    return;
  }

  switch (place) {
    case ItemPlace.Bottom: {
      return item.pid;
    }
    case ItemPlace.Inside: {
      return item.id;
    }
  }
};

const checkIsTryingParentPasteInChild = (
  draggedItem: IScriptTreeItem,
  dragOverItem: IScriptTreeItem,
) => {
  if (draggedItem.id === dragOverItem.pid) {
    return true;
  }

  return !excludedChildrenIds.value.length
    ? false
    : excludedChildrenIds.value.includes(dragOverItem.id);
};

const updateActions = (item?: IScriptTreeItem) => {
  if (!dragId.value || !dragOverId.value || !store.editScript) {
    return;
  }

  const data = getItemIndexedById<IScriptTreeItem>(
    store.editScript.scriptsData,
    dragId.value,
  );

  const insertData = getItemIndexedById<IScriptTreeItem>(
    store.editScript.scriptsData,
    dragOverId.value,
  );

  if (!insertData.item || insertData.index === null) {
    return;
  }

  const isAdd = Boolean(item);

  if (isAdd) {
    const itemToPaste: IScriptTreeItem = {
      ...item,
      pid: getPid(insertData.item, itemPlace.value),
    } as IScriptTreeItem;

    store.addScriptAction({
      item: itemToPaste,
      index: getAddIndex(itemPlace.value, insertData.index),
    });
    itemPlace.value = null;
    return;
  }

  if (!data.item || data.index === null) {
    return;
  }

  const isTryingPasteInChild = checkIsTryingParentPasteInChild(
    data.item,
    insertData.item,
  );

  if (isTryingPasteInChild) {
    return;
  }

  const itemToPaste: IScriptTreeItem = {
    ...data.item,
    pid: getPid(insertData.item, itemPlace.value),
    id: Math.random().toString(),
  };

  if (insertData.index > data.index) {
    itemPlace.value = ItemPlace.Top;
  }

  store.updateScriptActions({
    idToUpdate: dragId.value,
    itemToPaste: itemToPaste,
    indexToRemove: data.index,
    indexToPaste: getAddIndex(itemPlace.value, insertData.index),
  });
  itemPlace.value = null;
};

const addAction = () => {
  if (!newActionItem.value?.action) {
    return;
  }

  setFormType(newActionItem.value.action);
  openModal();
};

const openModal = () => {
  dialogVisible.value = true;
  setIsClearable(false);
};

const handleBeforeCloseModal = (done: () => void) => {
  newActionItem.value = null;
  done();
};

const closeModal = () => {
  setIsClearable(true);
  handleDragEnd();

  dialogVisible.value = false;
  newActionItem.value = null;
  formType.value = null;
  itemPlace.value = null;
};

const setFormType = (value: ActionType) => {
  formType.value = value;
};

const checkIsAddNewAction = (arr: IScriptTreeItem[], id: string | null) => {
  return arr.findIndex((item) => item.id === id) < 0;
};

const handleActionDrop = (place: ItemPlace) => {
  if (!store.editScript) {
    return;
  }

  const isAddNewAction = checkIsAddNewAction(
    store.editScript?.scriptsData,
    dragId.value,
  );
  itemPlace.value = place;

  if (isAddNewAction) {
    addAction();
    return;
  }

  handleDrop(() => updateActions());
};

const handleNewActionDragStart = (id: string, type: ActionType) => {
  newActionItem.value = getNewAction(type);
  handleDragStart(id);
};

const handleDragActionStart = (id: string) => {
  handleDragStart(id);
};

const handleAddActionFormSubmit = (value: string) => {
  if (!newActionItem.value) {
    return;
  }
  newActionItem.value = {
    ...newActionItem.value,
    value: getActionTitle(newActionItem.value.action, value),
  } as IScriptTreeItem;

  updateActions(newActionItem.value);
  closeModal();
};

onMounted(() => {
  store.initScripts();
});
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
          :drag-id="dragId"
          :excluded-children-ids="excludedChildrenIds"
          @drag-start="handleDragActionStart"
          @drag-over="handleDragOver"
          @drag-drop="handleActionDrop"
          @drag-end="handleDragEnd"
        />

        <AddScriptsSidebar
          class="content__right-aside"
          @drag-start="handleNewActionDragStart"
        />
      </section>
    </main>

    <ElDialog
      v-model="dialogVisible"
      title="Создать действие"
      width="500"
      :before-close="handleBeforeCloseModal"
    >
      <AddActionForm
        :type="formType"
        @close="closeModal"
        @update-data="handleAddActionFormSubmit"
      />
    </ElDialog>
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
  position: relative;
  left: 390px;
  max-width: calc(
    100vw - var(--left-sidebar-width) - var(--left-sidebar-width) -
      var(--header-width) - 10px
  );
  width: 100%;
}

.home-view__content {
  flex: 1;
}

.content {
  position: relative;
  top: var(--content-header-height);
  left: 0;
}

.content__scripts-content {
  background-color: var(--bg-white);
}

.home-view__left-aside {
  width: var(--left-sidebar-width);
  position: fixed;
  top: 0;
  bottom: 0;
  left: var(--header-width);
  border-right: 1px solid var(--border-color);
  z-index: 1;
}

.content__right-aside {
  background-color: var(--bg-white);
  border-left: 1px solid var(--border-color);
  width: var(--right-sidebar-width);
  position: fixed;
  top: 78px;
  bottom: 0;
  right: 0;
  z-index: 1;
}
</style>
