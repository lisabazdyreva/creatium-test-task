<script setup lang="ts">
import { ElSwitch, ElButton } from 'element-plus';
import { ref } from 'vue';

import TickIcon from '../icons/scripts/TickIcon.vue';
import BreadcrumbsList from '@/components/common/BreadcrumbsList.vue';

const isScriptRunning = ref(true);
</script>

<template>
  <div class="home-scripts-header">
    <div class="home-scripts-header__breadcrumbs">
      <BreadcrumbsList />
    </div>

    <div class="home-scripts-header__actions actions">
      <div class="actions__script script">
        <span class="script__status">Сценарий запущен</span>
        <el-switch
          v-model="isScriptRunning"
          style="--el-switch-on-color: #67c23a; --el-switch-off-color: #cccccc"
        />
      </div>

      <el-button
        class="actions__button actions__button--history"
        plain
        style="
          --el-button-bg-color: #ffffff;
          --el-button-border-color: #dcdfe6;
          --el-button-text-color: #606266;

          --el-button-hover-border-color: #8b63ef;
          --el-button-hover-text-color: #8b63ef;
        "
      >
        История запусков
      </el-button>

      <el-button
        class="actions__button actions__button--save"
        disabled
        style="
          --el-button-border-color: #8b63ef;
          --el-button-bg-color: #8b63ef;
          --el-button-text-color: #ffffff;

          --el-button-hover-border-color: #6545b2;
          --el-button-hover-bg-color: #6545b2;
          --el-button-hover-text-color: #ffffff;

          --el-button-disabled-bg-color: #c1a5f3;
          --el-button-disabled-border-color: #c1a5f3;
          --el-button-disabled-text-color: #ffffff;
          margin-left: 0;
        "
      >
        Сохранить
        <TickIcon class="button__icon" />
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.home-scripts-header {
  display: flex;
  align-items: center;
  background-color: var(--bg-white);
  height: var(--content-header-height);
  position: fixed;
  top: 0;
  left: calc(var(--header-width) + var(--left-sidebar-width));
  right: 0;
  padding: 20px 30px;
  border-bottom: 1px solid var(--border-color);

  z-index: 2;

  font-family: 'PingFang', Arial, sans-serif;
}

.actions {
  display: flex;
  margin-left: auto;
  gap: 12px;
}

.script {
  display: flex;
  align-items: center;
}

.script__status {
  font-size: var(--font-size-14);
  line-height: var(--font-size-22);
  color: var(--text-color-primary);
  margin-right: 8px;
}

.actions__button {
  font-size: var(--font-size-14);
  line-height: var(--font-size-22);
  padding: 9px 20px;
  font-weight: 600;
  height: 40px;
}

.button__icon {
  margin-left: 8px;

  width: 16px;
  height: 16px;
  color: inherit;
}
</style>
