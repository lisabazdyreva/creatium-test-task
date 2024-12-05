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
</script>

<template>
  <aside class="scripts-list-sidebar">
    <div class="scripts-list-sidebar__wrapper">
      <div class="scripts-list-sidebar__search-wrapper">
        <ElInput
          v-model="searchValue"
          class="scripts-list-sidebar__search-input"
          placeholder="Поиск"
          size="large"
        >
          <template #prefix>
            <SearchIcon />
          </template>
        </ElInput>
      </div>

      <div class="scripts-list-sidebar__lists-wrapper">
        <ul>
          <ScriptsListItem
            v-for="item in processList"
            :key="item.id"
            :item="item"
          />
        </ul>
      </div>
    </div>

    <div class="scripts-list-sidebar__actions actions">
      <ElButton class="actions__new-script-button" plain>
        <PlusIcon size="large" class="actions__new-script-icon" /> Новый
        сценарий
      </ElButton>

      <ElButton class="actions__new-directory-button" plain>
        <NewDirectoryIcon class="actions__new-directory-icon" />
      </ElButton>
    </div>
  </aside>
</template>

<style scoped>
.scripts-list-sidebar {
  display: flex;
  flex-direction: column;
  width: var(--left-sidebar-width);
  border-left: 1px solid var(--border-color);

  max-height: 100svh;
  max-height: 100vh;

  --search-block-height: 78px;
  --search-height: 40px;

  .scripts-list-sidebar__wrapper {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .scripts-list-sidebar__search-wrapper {
    position: sticky;
    top: 0;
    display: flex;
    background-color: var(--bg-white);
  }

  .scripts-list-sidebar__search-input {
    width: 284px;
    margin: calc((var(--search-block-height) - var(--search-height)) / 2) auto;
  }

  .scripts-list-sidebar__lists-wrapper {
    margin-bottom: 16px;
  }

  .scripts-list-sidebar__actions {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding: 16px;
  }

  .actions__new-script-button {
    flex: 1;
    height: 40px;
  }

  .actions__new-script-icon {
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    color: inherit;
  }

  .actions__new-directory-button {
    width: 40px;
    height: 40px;
    padding: 0;
  }
}
</style>
