<script setup lang="ts">
import { ElInput } from 'element-plus';
import { ref } from 'vue';
import PlayIcon from '@/components/icons/navigation/PlayIcon.vue';
import FullFolderIcon from '@/components/icons/FullFolderIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import DotsIcon from '@/components/icons/DotsIcon.vue';
import { ProcessStatus } from '@/const/process.ts';
import ProcessItem from '@/components/ProcessItem.vue';

const searchValue = ref('');
const activeItemId = ref<string>();

const processList = [
  {
    id: '1',
    title: 'Telegram-бот',
    status: ProcessStatus.Started,
  },
  {
    id: '2',
    title: 'Сайт',
    children: [
      {
        id: '2a',
        title: '1 сценарий',
        status: ProcessStatus.Started,
      },
      {
        id: '2b',
        title: '2 сценарий',
        status: ProcessStatus.Started,
      },
      {
        id: '2c',
        title: '3 сценарий',
        status: ProcessStatus.Paused,
      },
      {
        id: '2d',
        title: '4 сценарий',
        status: ProcessStatus.Paused,
      },
    ],
  },
  {
    id: '3',
    title: 'Новый сценарий',
    // status: ProcessStatus.Started,
    children: [
      {
        id: '3a',
        title: '1 сценарий',
        status: ProcessStatus.Started,
      },
      {
        id: '3b',
        title: '2 сценарий',
        status: ProcessStatus.Started,
      },
      {
        id: '3c',
        title: '3 сценарий',
        status: ProcessStatus.Paused,
      },
      {
        id: '3d',
        title: '4 сценарий',
        status: ProcessStatus.Paused,
      },
    ],
  },
  {
    id: '4',
    title: 'Регистрация',
    status: ProcessStatus.Paused,
  },
  {
    id: '5',
    title: 'API: Список объявлений',
    status: ProcessStatus.Started,
  },
];

const setActiveItemId = (id: string) => {
  activeItemId.value = id;
};
</script>

<template>
  <aside class="layout-sidebar">
    <div class="layout-sidebar__wrapper">
      <el-input
        v-model="searchValue"
        class="layout-sidebar__search-input"
        placeholder="Поиск"
      >
        <template #prefix>
          <SearchIcon />
        </template>
      </el-input>

      <ul>
        <li v-for="item in processList" :key="item.id">
          <ProcessItem
            :item="item"
            :active-id="activeItemId"
            @set-active-item="setActiveItemId"
          />
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.layout-sidebar {
  width: var(--layout-sidebar-width);
  border-left: 1px solid var(--border-color);
}

.layout-sidebar__wrapper {
  display: flex;
  flex-direction: column;
}

.layout-sidebar__search-input {
  width: 284px;
  margin: 19px auto;
}
</style>
