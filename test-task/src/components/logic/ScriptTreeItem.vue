<script setup lang="ts">
import { computed, ref } from 'vue';

import ActionBadge from '@/components/common/ActionBadge.vue';
import StructureLines from '@/components/common/StructureLines.vue';
import ShowDirectoryButton from '@/components/common/ShowDirectoryButton.vue';

import type { IScriptTreeItemNested } from '@/types/script.ts';

const props = defineProps<{
  item: IScriptTreeItemNested;
  nestedLevel: number;
  isLast: boolean;
  dragOverId: string | null;
}>();

defineEmits<{
  (e: 'handle-dragstart', id: string): void;
  (e: 'handle-dragover', id: string): void;
  (e: 'handle-dragenter', id: string): void;
  (e: 'handle-drop'): void;
}>();

const isShow = ref(true);

const marginLeft = computed(() =>
  props.item.pid && props.item?.children?.length
    ? `${props.nestedLevel * 45 - (17 + 14)}px`
    : `${props.nestedLevel * 45}px`,
);
</script>

<template>
  <li class="script-tree-item">
    <div
      class="script-tree-item__wrapper"
      :class="{
        'script-tree-item__wrapper--drag-over': dragOverId === item.id,
        'script-tree-item__wrapper--root': !item?.pid,
      }"
      :style="{ marginLeft }"
      :draggable="Boolean(item.pid)"
      @dragstart="$emit('handle-dragstart', item.id)"
      @dragenter.prevent="$emit('handle-dragenter', item.id)"
      @dragover.prevent="$emit('handle-dragover', item.id)"
      @drop="$emit('handle-drop')"
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
          :nested-level="nestedLevel + 1"
          @handle-drop="$emit('handle-drop')"
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
}

.script-tree-item__wrapper:hover {
  background-color: var(--bg-white-hover);
}

.script-tree-item__wrapper--root {
  cursor: default;
  margin-bottom: 26px;
}
/*todo lisa посмотреть еще */
.script-tree-item__wrapper--drag-over::before {
  content: '';
  position: absolute;
  background: linear-gradient(
    to bottom,
    #ffffffaa,
    #e8e0fcaa 40%,
    #8b63efaa 100%
  );
  width: 100%;
  height: 10px;
  top: 45px;
  border-radius: 0 0 1px 1px;
  box-shadow: 1px 2px 2px #8b63ef22;
}

.script-tree-item__icon-wrapper {
  display: flex;
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
  /* todo lisa add truncate */
}
</style>
