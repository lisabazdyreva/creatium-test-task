<script setup lang="ts">
import { computed, ref } from 'vue';

import ActionBadge from '@/components/common/ActionBadge.vue';
import StructureLines from '@/components/common/StructureLines.vue';
import ShowDirectoryButton from '@/components/common/ShowDirectoryButton.vue';

import type { IScriptTreeItemNested } from '@/types/script.ts';
import { ItemPlace } from '@/const';

const props = defineProps<{
  item: IScriptTreeItemNested;
  nestedLevel: number;
  isLast: boolean;
  dragOverId: string | null;
  dragId: string | null;
  excludedChildrenIds: string[];
}>();

const emit = defineEmits<{
  (e: 'handle-dragstart', id: string): void;
  (e: 'handle-dragover', id: string): void;
  (e: 'handle-dragenter', id: string): void;
  (e: 'handle-drop', place: ItemPlace): void;
}>();

const isShow = ref(true);
const isInsidePaste = ref(false);
const isBottomPaste = ref(false);

const marginLeft = computed(() =>
  props.item.pid && props.item?.children?.length
    ? `${props.nestedLevel * 45 - (17 + 14)}px`
    : `${props.nestedLevel * 45}px`,
);

const handleDragOver = (id: string, evt: DragEvent) => {
  const target = evt.target as HTMLElement;
  const rect = target.getBoundingClientRect();

  const isInsideCurrent =
    evt.clientY <= rect.top + Math.round(rect.height / 2) + 10;
  const isBottomCurrent =
    evt.clientY > rect.top + Math.round(rect.height / 2) + 10;

  if (isInsideCurrent !== isInsidePaste.value) {
    isInsidePaste.value = isInsideCurrent;
  }

  if (isBottomCurrent !== isBottomPaste.value) {
    isBottomPaste.value = isBottomCurrent;
  }

  emit('handle-dragover', id);
};
const handleDrop = () => {
  const place = isInsidePaste.value ? ItemPlace.Inside : ItemPlace.Bottom;
  emit('handle-drop', place);
  isInsidePaste.value = false;
  isBottomPaste.value = false;
};
</script>

<template>
  <li class="script-tree-item">
    <div
      class="script-tree-item__wrapper"
      :class="{
        'script-tree-item__wrapper--drag-over':
          dragOverId === item.id &&
          !excludedChildrenIds.includes(item.id) &&
          dragId !== item.id,
        'script-tree-item__wrapper--root': !item?.pid,
        'script-tree-item__wrapper--inside': isInsidePaste,
        'script-tree-item__wrapper--bottom': isBottomPaste,
      }"
      :style="{ marginLeft }"
      :draggable="Boolean(item.pid)"
      @dragstart="$emit('handle-dragstart', item.id)"
      @dragenter.prevent="$emit('handle-dragenter', item.id)"
      @dragover.prevent="(evt) => handleDragOver(item.id, evt)"
      @drop="() => handleDrop()"
    >
      <ShowDirectoryButton
        v-if="item?.children?.length && item.pid"
        :is-show="isShow"
        @click="() => (isShow = !isShow)"
      />
      <div class="script-tree-item__icon-wrapper">
        <img
          class="script-tree-item__icon"
          :src="item.icon.src"
          :alt="item.title"
        />
      </div>
      <div class="script-tree-item__info info">
        <div class="info__main-info">
          <div class="info__title">{{ item.title }}</div>
          <ActionBadge v-if="item.showAction" class="info__badge">
            {{ item.action }}
          </ActionBadge>
        </div>
        <div class="info__caption">
          <span v-if="item?.value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <template v-if="item.children?.length">
      <ul v-show="isShow">
        <ScriptTreeItem
          v-for="(childItem, i) in item.children"
          :key="childItem.id"
          :is-last="i === item.children.length - 1"
          :item="childItem"
          :dragOverId="dragOverId"
          :drag-id="dragId"
          :excluded-children-ids="excludedChildrenIds"
          :nested-level="nestedLevel + 1"
          @handle-drop="(place: ItemPlace) => $emit('handle-drop', place)"
          @handle-dragenter="(id: string) => $emit('handle-dragenter', id)"
          @handle-dragstart="(id: string) => $emit('handle-dragstart', id)"
          @handle-dragover="(id: string) => $emit('handle-dragover', id)"
        />
      </ul>
    </template>

    <StructureLines
      :is-last="isLast"
      :children-length="item.children?.length"
      :is-root="!item.pid"
      :pid="item?.pid"
      :nested-level="nestedLevel"
    />
  </li>
</template>

<style scoped>
.script-tree-item {
  position: relative;
}

.script-tree-item__wrapper {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  overflow: hidden;
}

.script-tree-item__wrapper:hover {
  background-color: var(--bg-white-hover);
}

.script-tree-item__wrapper--drag-over::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  height: 58px;
  left: calc(v-bind(nestedLevel) * 45px - 22px);
  right: 0;
}

.script-tree-item__wrapper--drag-over.script-tree-item__wrapper--inside {
  border-radius: 4px;
  box-shadow: 1px 2px 2px #8b63ef22;
  background: linear-gradient(to bottom, #ffffffaa, #8b63ef55 100%);
}

.script-tree-item__wrapper--drag-over.script-tree-item__wrapper--bottom::after {
  box-shadow: -1px 3px 2px #8b63efaa;
}

.script-tree-item__wrapper--root {
  cursor: default;
  margin-bottom: 26px;
}

.script-tree-item__icon-wrapper {
  display: flex;
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--border-color-dark);
}

.script-tree-item__icon {
  display: block;
}

.script-tree-item__info {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.info__main-info {
  display: flex;
  gap: 8px;
  align-items: center;
}

.info__title {
  font-size: var(--font-size-14);
  line-height: var(--font-size-24);
  font-weight: 500;
}

.info__caption {
  font-size: var(--font-size-12);
  line-height: var(--font-size-16);
  color: var(--text-color-gray);
  height: 16px;
}

.info__caption > span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
