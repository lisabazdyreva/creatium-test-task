<script setup lang="ts">
import AddScriptItem from '@/components/logic/AddScriptItem.vue';

import databaseScriptItems from '@/mocks/databaseScriptItems.json';
import conditionScriptItems from '@/mocks/conditionScriptItems.json';
import userScriptItems from '@/mocks/userScriptItems.json';

import type { IAddScriptItem } from '@/types/script.ts';
import ButtonAccordion from '@/components/common/ButtonAccordion.vue';

const emit = defineEmits<{
  (e: 'drag-start', id: string): void;
}>();

const databaseScriptsList = databaseScriptItems as Array<IAddScriptItem>;
const conditionActionList = conditionScriptItems as Array<IAddScriptItem>;
const usersActionList = userScriptItems as Array<IAddScriptItem>;

const handleDragStart = (id: string) => {
  // todo lisa implement
  // emit id
  emit('drag-start', id);
};
</script>

<template>
  <aside class="home-scripts-aside">
    <div class="home-scripts-aside__header">
      <h3 class="home-scripts-aside__title">Добавить действие</h3>
    </div>

    <!--   todo lisa add recursion -->
    <div class="home-scripts-aside__content content">
      <div class="content__wrapper">
        <ButtonAccordion class="content__action-item action-item">
          <template #title> База данных </template>
          <template #list>
            <ul class="action-item__list">
              <li
                v-for="item in databaseScriptsList"
                :key="item.id"
                draggable="true"
                @dragstart="() => handleDragStart(item.id)"
              >
                <AddScriptItem :item="item" />
              </li>
            </ul>
          </template>
        </ButtonAccordion>

        <ButtonAccordion class="content__action-item action-item">
          <template #title> Условия и действия </template>
          <template #list>
            <ul class="action-item__list">
              <li
                v-for="item in conditionActionList"
                :key="item.id"
                draggable="true"
                @dragstart="() => handleDragStart(item.id)"
              >
                <AddScriptItem :item="item" />
              </li>
            </ul>
          </template>
        </ButtonAccordion>

        <ButtonAccordion class="content__action-item action-item">
          <template #title> Пользователи </template>
          <template #list>
            <ul class="action-item__list">
              <li
                v-for="item in usersActionList"
                :key="item.id"
                draggable="true"
                @dragstart="() => handleDragStart(item.id)"
              >
                <AddScriptItem :item="item" />
              </li>
            </ul>
          </template>
        </ButtonAccordion>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.home-scripts-aside {
  font-family: 'Rubik', 'Arial', sans-serif;
  --content-gutter: 0;
  --fixed-header-height: 64px;

  /*//padding: var(--content-gutter);*/
  position: relative;

  .home-scripts-aside__header {
    position: sticky;
    top: 10px;
    width: 100%;
    height: var(--fixed-header-height);
    padding-left: 20px;
    padding-top: 24px;
    /* background-color: red;*/
    z-index: 1;
  }

  .home-scripts-aside__title {
    font-size: var(--font-size-16);
    line-height: var(--font-size-24);
    font-weight: 500;
    /*todo lisa line-height*/
    margin-bottom: 17px;
    color: var(--text-color-primary);
  }

  .home-scripts-aside__content {
    position: relative;
    /*top: var(--fixed-header-height);*/
    height: calc(
      100svh - var(--content-header-height) - var(--content-gutter) -
        var(--fixed-header-height)
    );
    overflow: auto;
  }

  .content__wrapper {
    display: flex;
    flex-direction: column;
  }

  .action-item {
    border-bottom: 1px solid var(--border-color);
  }

  .action-item__list {
    padding: 0 20px;
  }
}
</style>
