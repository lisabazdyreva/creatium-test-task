<script setup lang="ts">
import { ref } from 'vue';

import { ProcessStatusLabel } from '@/const/process.ts';

import PlayIcon from '@/components/icons/navigation/PlayIcon.vue';
import DotsIcon from '@/components/icons/common/DotsIcon.vue';
import FullFolderIcon from '@/components/icons/scripts/FullFolderIcon.vue';
import ArrowIcon from '@/components/icons/common/ArrowIcon.vue';
import type { IScriptDirectoryItem } from '@/types/script.ts';

defineProps<{
  item: IScriptDirectoryItem;
  activeId?: string;
}>();

defineEmits<{
  (e: 'set-active-item', id: string): void;
}>();
const isOpen = ref(false);
</script>

<template>
  <div class="process-item">
    <div
      v-if="!item?.children"
      class="process-item__last-child"
      :class="{ 'process-item__active': activeId === item.id }"
      @click="$emit('set-active-item', item.id)"
    >
      <div class="process-item__main-info">
        <div class="process-item__icon-wrapper">
          <PlayIcon v-if="item?.status" class="process-item__icon" />
        </div>
        <div class="process-item__title">{{ item.title }}</div>
        <button class="process-item__options">
          <DotsIcon class="process-item__dots-icon" />
        </button>
      </div>
      <div
        v-if="item?.status"
        class="process-item__status"
        :class="[`process-item__status--${item.status}`]"
      >
        {{ ProcessStatusLabel[item.status] }}
      </div>
    </div>

    <template v-if="item?.children">
      <button
        class="process-item__nested-child"
        @click="() => (isOpen = !isOpen)"
      >
        <span class="process-item__main-info">
          <span class="process-item__icon-wrapper">
            <ArrowIcon
              class="process-item__arrow-icon"
              :class="{ 'process-item__arrow-icon--open': isOpen }"
            />
            <FullFolderIcon class="process-item__icon" />
          </span>
          <span class="process-item__title">{{ item.title }}</span>
          <span class="process-item__options">
            <DotsIcon class="process-item__dots-icon" />
          </span>
        </span>
        <span class="process-item__count"
          >{{ item.children.length }} сценария</span
        >
      </button>
      <ul v-show="isOpen" class="process-item__children-list">
        <li v-for="childItem in item.children" :key="childItem.id">
          <ScriptsListItem
            class="process-item"
            :item="childItem"
            :active-id="activeId"
            @click="$emit('set-active-item', childItem.id)"
          />
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.process-item__last-child {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px 10px 4px 18px;

  &:hover {
    background-color: var(--bg-white-hover);
  }
}

.process-item__nested-child {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px 10px 4px 4px;
  background-color: transparent;
  border: none;
  font: inherit;

  &:hover {
    background-color: var(--bg-white-hover);
  }
}

.process-item__active {
  background-color: var(--bg-white-active);
  &:hover {
    background-color: var(--bg-white-active);
  }
}

.process-item__icon-wrapper {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.process-item__icon {
  width: 16px;
  height: 16px;
  color: var(--dark-gray-color);
}

.process-item__dots-icon {
  width: 12px;
  height: 12px;
  color: var(--light-gray-color);
}

.process-item__arrow-icon {
  width: 10px;
  height: 10px;
  margin-right: 4px;
  transform: rotate(-90deg);
  transition: transform ease-in-out 0.1s;
}

.process-item__arrow-icon + .process-item__icon {
  color: var(--yellow-accent-color);
}

.process-item__arrow-icon--open {
  transform: rotate(0);
}

.process-item__main-info {
  display: flex;
  align-items: center;
  width: 100%;
}

.process-item__options {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 24px;
  margin-left: auto;
  background-color: transparent;
  border: none;
  font: inherit;
  padding: 0;
  cursor: pointer;
}

.process-item__title {
  font-size: var(--font-size-14);
  line-height: var(--font-size-24);
}

.process-item__status {
  font-size: var(--font-size-12);
  line-height: var(--font-size-20);
  color: var(--text-color-gray);
  margin-left: 21px;
}

.process-item__count {
  font-size: var(--font-size-12);
  line-height: var(--font-size-20);
  color: var(--text-color-gray);
  margin-left: 35px;
}

.process-item__status--started {
  color: var(--green-accent-color);
}

.process-item__children-list {
  display: flex;
  flex-direction: column;
  margin-left: 14px;
  width: calc(100% - 14px);
}
</style>
