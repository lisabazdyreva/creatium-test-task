<script setup lang="ts">
import type { IAddScriptItem } from '@/types/script.ts';

defineProps<{
  item: IAddScriptItem;
}>();
</script>

<template>
  <div class="script-aside-item">
    <div class="script-aside-item__icon-wrapper">
      <component
        class="script-aside-item__icon"
        :is="item.icon.component"
        :type="item.icon?.type"
      />
    </div>
    <div class="script-aside-item__title">
      {{ item.title }}
    </div>
  </div>
</template>

<style scoped>
.script-aside-item {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 4px;
  background-color: var(--bg-light-gray);
  margin-bottom: 8px;
}

.script-aside-item__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.script-aside-item__icon {
  display: block;
  width: 20px;
  height: 20px;
  color: var(--sec-accent-color);
}

.script-aside-item__title {
  font-size: var(--font-size-14);
  line-height: var(--font-size-24);
  color: var(--text-color-primary);
}
</style>
