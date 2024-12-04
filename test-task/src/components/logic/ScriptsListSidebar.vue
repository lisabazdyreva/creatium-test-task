<script setup lang="ts">
import { ElInput, ElButton } from 'element-plus';
import { ref } from 'vue';

import ScriptsListItem from '@/components/logic/ScriptsListItem.vue';
import SearchIcon from '@/components/icons/common/SearchIcon.vue';
import NewDirectoryIcon from '@/components/icons/scripts/NewDirectoryIcon.vue';
import PlusIcon from '@/components/icons/common/PlusIcon.vue';

import scriptsListMocks from '@/mocks/scriptsDataList.json';
import type { IScriptDirectoryItem } from '@/types/script.ts';

const processList = scriptsListMocks as Array<IScriptDirectoryItem>;

const searchValue = ref('');
const activeItemId = ref<string>();

const setActiveItemId = (id: string) => {
  activeItemId.value = id;
};
</script>

<template>
  <aside class="layout-sidebar">
    <div class="layout-sidebar__wrapper">
      <ElInput
        v-model="searchValue"
        class="layout-sidebar__search-input"
        placeholder="Поиск"
      >
        <template #prefix>
          <SearchIcon />
        </template>
      </ElInput>

      <ul>
        <li v-for="item in processList" :key="item.id">
          <ScriptsListItem
            :item="item"
            :active-id="activeItemId"
            @set-active-item="setActiveItemId"
          />
        </li>
      </ul>

      <div>
        <ElButton> <PlusIcon /> Новый сценарий </ElButton>

        <ElButton>
          <NewDirectoryIcon />
        </ElButton>
      </div>
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
