<script setup lang="ts">
import { ElSwitch, ElButton } from 'element-plus';
import {ref} from 'vue';
import TickIcon from '@/components/icons/TickIcon.vue';

const isScriptRunning = ref(true);
</script>

<template>
  <div class="home-scripts-header">
    <div>
      Сценарии / Новый сценарий
    </div>

    <div class="home-scripts-header__actions actions">
      <div>
        <span class="status">Сценарий запущен</span>
        <el-switch
          v-model="isScriptRunning"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #cccccc"
        />
      </div>

      <el-button
        plain
        style="
          --el-button-bп-color: #FFFFFF;
          --el-button-border-color: #DCDFE6;
          --el-button-text-color: #606266;

          --el-button-hover-border-color: #8B63EF;
          --el-button-hover-text-color: #8B63EF;
        "
      >
        История запусков
      </el-button>

      <el-button
        style="
          --el-button-border-color: #8B63EF;
          --el-button-bg-color: #8B63EF;
          --el-button-text-color: #FFFFFF;
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
  background-color: red;
  height: 78px;
  padding: 20px 30px;
  border-bottom: 1px solid var(--border-color);
}

.actions {
  display: flex;
  margin-left: auto;
  gap: 12px;
}

.button__icon {
  margin-left: 8px;

  width: 16px;
  height: 16px;
  color: inherit;
}
</style>
