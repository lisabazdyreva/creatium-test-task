<script setup lang="ts">
import AddScriptItem from '@/components/logic/AddScriptItem.vue';
import ButtonAccordion from '@/components/common/ButtonAccordion.vue';

import databaseScriptItems from '@/mocks/databaseScriptItems.json';
import conditionScriptItems from '@/mocks/conditionScriptItems.json';
import userScriptItems from '@/mocks/userScriptItems.json';

import type { IAddScriptItem } from '@/types/script.ts';
import type { ActionType } from '@/const/scriptType.ts';

defineEmits<{
  (e: 'drag-start', id: string, type: ActionType): void;
}>();

const databaseScriptsList = databaseScriptItems as Array<IAddScriptItem>;
const conditionActionList = conditionScriptItems as Array<IAddScriptItem>;
const usersActionList = userScriptItems as Array<IAddScriptItem>;

const allScripts = [
  {
    title: 'База данных',
    list: databaseScriptsList,
  },
  {
    title: 'Условия и действия',
    list: conditionActionList,
  },
  {
    title: 'Пользователи',
    list: usersActionList,
  },
];
</script>

<template>
  <aside class="add-scripts-sidebar">
    <div class="add-scripts-sidebar__header">
      <h3 class="add-scripts-sidebar__title">Добавить действие</h3>
    </div>

    <div class="add-scripts-sidebar__content content">
      <div class="content__wrapper">
        <ButtonAccordion
          v-for="script in allScripts"
          :key="script.title"
          class="content__action-item action-item"
        >
          <template #title> {{ script.title }} </template>
          <template #list>
            <ul class="action-item__list actions-list">
              <AddScriptItem
                :item="item"
                v-for="item in script.list"
                :key="item.id"
                class="actions-list__item"
                draggable="true"
                @dragstart="() => $emit('drag-start', item.id, item.action)"
              />
            </ul>
          </template>
        </ButtonAccordion>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.add-scripts-sidebar {
  font-family: 'Rubik', 'Arial', sans-serif;

  --content-gutter: 0;
  overflow: auto;
  scrollbar-width: thin;

  .add-scripts-sidebar__header {
    width: 100%;
    padding-left: 20px;
    padding-top: 24px;
  }

  .add-scripts-sidebar__title {
    font-size: var(--font-size-16);
    line-height: var(--font-size-24);
    font-weight: 500;
    color: var(--text-color-primary);
    margin-bottom: 17px;
  }

  .content__wrapper {
    display: flex;
    flex-direction: column;
  }

  .action-item {
    border-bottom: 1px solid var(--border-color);
  }

  .action-item:last-child {
    border-bottom: none;
  }

  .action-item__list {
    padding: 0 20px;
  }

  .actions-list__item {
    cursor: pointer;
  }
  .actions-list__item:hover {
    background-color: var(--bg-white-hover);
  }
}
</style>
