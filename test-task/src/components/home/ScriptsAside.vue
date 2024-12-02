<script setup lang="ts">
import {ref} from 'vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';

const isShowDBContent = ref(true);
const isShowConditionsContent = ref(true);
const isShowUserContent = ref(true);
</script>

<template>
  <aside class="home-scripts-aside">
    <div class="home-scripts-aside__header">
      <h3 class="home-scripts-aside__title">Добавить действие</h3>
    </div>

    <div class="home-scripts-aside__content content">
      <div class="content__wrapper">
        <div class="content__action-item action-item">
          <button class="action-item__button" @click="() => isShowDBContent = !isShowDBContent">
            <span class="action-item__subtitle">База данных</span>
            <ArrowIcon
              class="action-item__icon"
              :class="{ 'action-item__icon--active': isShowDBContent }"
            />
          </button>


          <ul v-show="isShowDBContent">
            <li>Создать запись</li>
            <li>Обновить записи</li>
            <li>Найти запись</li>
            <li>Удалить запись</li>
          </ul>
        </div>


        <div class="content__action-item action-item">
          <button class="action-item__button" @click="() => isShowConditionsContent = !isShowConditionsContent">
            <span class="action-item__subtitle">Условия и действия</span>
            <ArrowIcon
              class="action-item__icon"
              :class="{ 'action-item__icon--active': isShowConditionsContent }"
            />
          </button>

          <ul v-show="isShowConditionsContent">
            <li>Если</li>
            <li>Иначе</li>
            <li>Таймер</li>
            <li>Выполнить код</li>
          </ul>
        </div>

        <div class="content__action-item action-item">
          <button class="action-item__button" @click="() => isShowUserContent = !isShowUserContent">
            <span class="action-item__subtitle">Пользователи</span>
            <ArrowIcon
              class="action-item__icon"
              :class="{ 'action-item__icon--active': isShowUserContent }"
            />
          </button>

          <ul v-show="isShowUserContent">
            <li>Создать пользователя</li>
            <li>Изменить почту</li>
            <li>Восстановить пароль</li>
            <li>Выполнить код</li>
          </ul>
        </div>
      </div>
    </div>

  </aside>
</template>

<style scoped>
.home-scripts-aside {
  --content-gutter: 0;
  --fixed-header-height: 30px;

  padding: var(--content-gutter);
  position: relative;

  .home-scripts-aside__header {
    position: fixed;
    width: 100%;
    height: var(--fixed-header-height);
    background-color: var(--bg-white);
  }

  .home-scripts-aside__title {
    font-size: var(--font-size-16);
    /*todo lisa line-height*/
    margin-bottom: 17px;
    color: var(--text-color-primary);
  }

  .home-scripts-aside__content {
    position: relative;
    top: var(--fixed-header-height);
    height: calc(100svh - var(--content-header-height) - var(--content-gutter) - var(--fixed-header-height));
    overflow: auto;
  }

  .content__wrapper {
    display: flex;
    flex-direction: column;
  }

  .action-item {
    border-bottom: 1px solid var(--border-color);
  }

  .action-item__button {
    display: flex;
    width: 100%;
    padding: 13px 10px 12px 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .action-item__icon {
    margin-left: auto;
    transition: transform ease-in-out 0.1s;
  }

  .action-item__icon--active {
    transform: rotate(180deg);
  }

  .action-item__subtitle {
    font-size: var(--font-size-14);
    font-weight: 500;
    /*todo lisa line height*/
  }
}
</style>
