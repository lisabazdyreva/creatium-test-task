<script setup lang="ts">
import { ref } from 'vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import CoinIcon from '@/components/icons/navigation/CoinIcon.vue';
import ScriptAsideItem from '@/components/home/ScriptAsideItem.vue';
import DatabaseIcon from '@/components/icons/actions/DatabaseIcon.vue';
import { DatabaseActionType, UserActionType } from '@/const/actions.ts';
import ConditionIcon from '@/components/icons/actions/ConditionIcon.vue';
import TimerIcon from '@/components/icons/actions/TimerIcon.vue';
import CodeIcon from '@/components/icons/actions/CodeIcon.vue';
import UserIcon from '@/components/icons/actions/UserIcon.vue';

const isShowDBContent = ref(true);
const isShowConditionsContent = ref(true);
const isShowUserContent = ref(true);

const databaseActionList = [
  {
    id: '1',
    title: 'Создать запись',
    icon: {
      component: DatabaseIcon,
      type: DatabaseActionType.Create,
    },
  },
  {
    id: '2',
    title: 'Обновить записи',
    icon: {
      component: DatabaseIcon,
      type: DatabaseActionType.Update,
    },
  },
  {
    id: '3',
    title: 'Найти запись',
    icon: {
      component: DatabaseIcon,
      type: DatabaseActionType.Search,
    },
  },
  {
    id: '4',
    title: 'Удалить запись',
    icon: {
      component: DatabaseIcon,
      type: DatabaseActionType.Delete,
    },
  },
];

const conditionActionList = [
  {
    id: '1',
    title: 'Если',
    icon: {
      component: ConditionIcon,
    },
  },
  {
    id: '2',
    title: 'Иначе',
    icon: {
      component: ConditionIcon,
    },
  },
  {
    id: '3',
    title: 'Таймер',
    icon: {
      component: TimerIcon,
    },
  },
  {
    id: '4',
    title: 'Выполнить код',
    icon: {
      component: CodeIcon,
    },
  },
];

const usersActionList = [
  {
    id: '1',
    title: 'Создать пользователя',
    icon: {
      component: UserIcon,
      type: UserActionType.Create,
    },
  },
  {
    id: '2',
    title: 'Изменить почту',
    icon: {
      component: UserIcon,
      type: UserActionType.ChangeEmail,
    },
  },
  {
    id: '3',
    title: 'Восстановить пароль',
    icon: {
      component: UserIcon,
      type: UserActionType.RestorePassword,
    },
  },
];
</script>

<template>
  <aside class="home-scripts-aside">
    <div class="home-scripts-aside__header">
      <h3 class="home-scripts-aside__title">Добавить действие</h3>
    </div>

    <div class="home-scripts-aside__content content">
      <div class="content__wrapper">
        <div class="content__action-item action-item">
          <button
            class="action-item__button"
            @click="() => (isShowDBContent = !isShowDBContent)"
          >
            <span class="action-item__subtitle">База данных</span>
            <ArrowIcon
              class="action-item__icon"
              :class="{ 'action-item__icon--active': isShowDBContent }"
            />
          </button>
          <ul v-show="isShowDBContent" class="action-item__list">
            <li v-for="item in databaseActionList" :key="item.id">
              <ScriptAsideItem :item="item" />
            </li>
          </ul>
        </div>

        <div class="content__action-item action-item">
          <button
            class="action-item__button"
            @click="() => (isShowConditionsContent = !isShowConditionsContent)"
          >
            <span class="action-item__subtitle">Условия и действия</span>
            <ArrowIcon
              class="action-item__icon"
              :class="{ 'action-item__icon--active': isShowConditionsContent }"
            />
          </button>

          <ul v-show="isShowConditionsContent" class="action-item__list">
            <li v-for="item in conditionActionList" :key="item.id">
              <ScriptAsideItem :item="item" />
            </li>
          </ul>
        </div>

        <div class="content__action-item action-item">
          <button
            class="action-item__button"
            @click="() => (isShowUserContent = !isShowUserContent)"
          >
            <span class="action-item__subtitle">Пользователи</span>
            <ArrowIcon
              class="action-item__icon"
              :class="{ 'action-item__icon--active': isShowUserContent }"
            />
          </button>

          <ul v-show="isShowUserContent" class="action-item__list">
            <li v-for="item in usersActionList" :key="item.id">
              <ScriptAsideItem :item="item" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.home-scripts-aside {
  --content-gutter: 0;
  --fixed-header-height: 64px;

  //padding: var(--content-gutter);
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

  .action-item__button {
    display: flex;
    width: 100%;
    padding: 13px 12px 12px 20px;
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

  .action-item__list {
    padding: 0 20px;
  }
}
</style>
