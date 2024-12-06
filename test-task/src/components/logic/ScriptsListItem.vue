<script setup lang="ts">
import { computed, ref } from 'vue';

import { ProcessStatusLabel } from '@/const/process.ts';

import PlayIcon from '@/components/icons/navigation/PlayIcon.vue';
import DotsIcon from '@/components/icons/common/DotsIcon.vue';
import FullFolderIcon from '@/components/icons/scripts/FullFolderIcon.vue';
import ArrowIcon from '@/components/icons/common/ArrowIcon.vue';

import type { IScriptDirectoryItem } from '@/types/script.ts';
import { useScriptsStore } from '@/stores/scripts.ts';

defineProps<{
  item: IScriptDirectoryItem;
}>();

const store = useScriptsStore();
const activeId = computed(() => store.editScript?.id);

const isOpen = ref(Boolean(activeId));

const setActiveItemId = (id: string) => {
  store.setEditScript(id);
};
</script>

<template>
  <li class="scripts-list-item">
    <div
      v-if="!item?.children"
      class="scripts-list-item__last-child"
      :class="{ 'scripts-list-item__active': activeId === item.id }"
      @click="() => setActiveItemId(item.id)"
    >
      <div class="scripts-list-item__main-info">
        <div class="scripts-list-item__icon-wrapper">
          <PlayIcon v-if="item?.status" class="scripts-list-item__icon" />
        </div>
        <div class="scripts-list-item__title">{{ item.title }}</div>
        <button class="scripts-list-item__options">
          <DotsIcon class="scripts-list-item__dots-icon" />
        </button>
      </div>
      <div
        v-if="item?.status"
        class="scripts-list-item__status"
        :class="[`scripts-list-item__status--${item.status}`]"
      >
        {{ ProcessStatusLabel[item.status] }}
      </div>
    </div>

    <template v-if="item?.children">
      <button
        class="scripts-list-item__nested-child"
        @click="() => (isOpen = !isOpen)"
      >
        <span class="scripts-list-item__main-info">
          <span class="scripts-list-item__icon-wrapper">
            <ArrowIcon
              class="scripts-list-item__arrow-icon"
              :class="{ 'scripts-list-item__arrow-icon--open': isOpen }"
            />
            <FullFolderIcon class="scripts-list-item__icon" />
          </span>
          <span class="scripts-list-item__title">{{ item.title }}</span>
          <span class="scripts-list-item__options">
            <DotsIcon class="scripts-list-item__dots-icon" />
          </span>
        </span>
        <span class="scripts-list-item__count"
          >{{ item.children.length }} сценария</span
        >
      </button>
      <ul v-show="isOpen" class="scripts-list-item__children-list">
        <ScriptsListItem
          v-for="childItem in item.children"
          :key="childItem.id"
          class="scripts-list-item"
          :item="childItem"
          :active-id="activeId"
          @click="() => setActiveItemId(childItem.id)"
        />
      </ul>
    </template>
  </li>
</template>

<style scoped>
.scripts-list-item__last-child {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px 10px 4px 18px;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-white-hover);
  }
}

.scripts-list-item__nested-child {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px 10px 4px 4px;
  background-color: transparent;
  border: none;
  font: inherit;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-white-hover);
  }
}

.scripts-list-item__active {
  background-color: var(--bg-white-active);
  &:hover {
    background-color: var(--bg-white-active);
  }
}

.scripts-list-item__icon-wrapper {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.scripts-list-item__icon {
  width: 16px;
  height: 16px;
  color: var(--dark-gray-color);
}

.scripts-list-item__dots-icon {
  width: 12px;
  height: 12px;
  color: var(--light-gray-color);
}

.scripts-list-item__arrow-icon {
  width: 10px;
  height: 10px;
  margin-right: 4px;
  transform: rotate(-90deg);
  transition: transform ease-in-out 0.1s;
}

.scripts-list-item__arrow-icon + .scripts-list-item__icon {
  color: var(--yellow-accent-color);
}

.scripts-list-item__arrow-icon--open {
  transform: rotate(0);
}

.scripts-list-item__main-info {
  display: flex;
  align-items: center;
  width: 100%;
}

.scripts-list-item__options {
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

.scripts-list-item__title {
  font-size: var(--font-size-14);
  line-height: var(--font-size-24);
}

.scripts-list-item__status {
  font-size: var(--font-size-12);
  line-height: var(--font-size-20);
  color: var(--text-color-gray);
  margin-left: 21px;
}

.scripts-list-item__count {
  font-size: var(--font-size-12);
  line-height: var(--font-size-20);
  color: var(--text-color-gray);
  margin-left: 35px;
  text-align: start;
}

.scripts-list-item__status--started {
  color: var(--green-accent-color);
}

.scripts-list-item__children-list {
  display: flex;
  flex-direction: column;
  margin-left: 14px;
  width: calc(100% - 14px);
}
</style>
