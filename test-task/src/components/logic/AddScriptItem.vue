<script setup lang="ts">
import type { IAddScriptItem } from '@/types/script.ts';

defineProps<{
  item: IAddScriptItem;
}>();
</script>

<template>
  <li class="add-script-item">
    <div class="add-script-item__icon-wrapper">
      <img
        class="add-script-item__icon"
        :src="item.icon.src"
        :alt="item.title"
      />
    </div>
    <div class="add-script-item__title">
      {{ item.title }}
    </div>
  </li>
</template>

<style scoped>
.add-script-item {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 4px;
  background-color: var(--bg-light-gray);
  margin-bottom: 8px;
}

.add-script-item__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.add-script-item__icon {
  display: block;
  width: 20px;
  height: 20px;
  color: var(--sec-accent-color);
}

.add-script-item__title {
  font-size: var(--font-size-14);
  line-height: var(--font-size-24);
  color: var(--text-color-primary);
}
</style>
