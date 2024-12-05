<script setup lang="ts">
defineProps<{
  isShow: boolean;
}>();
</script>

<template>
  <button class="show-button" :class="{ 'show-button--show': isShow }"></button>
</template>

<style scoped>
.show-button {
  display: flex;
  flex-shrink: 0;
  padding: 0;
  width: 14px;
  height: 14px;
  margin-right: 2px;
  border: 1px solid var(--border-color-light);
  border-radius: 2px;
  background-color: var(--bg-white);

  position: relative;
  z-index: 1;
  cursor: pointer;
}

.show-button::before {
  content: '';
  position: absolute;
  top: calc((100% - 1px) / 2);
  left: calc((100% - 8px) / 2);
  height: 1px;
  width: 8px;
  z-index: 1;
  background-color: #000000;
  border-radius: 1px;
}

.show-button::after {
  content: '';
  position: absolute;
  top: calc((100% - 8px) / 2);
  left: calc((100% - 1px) / 2);
  height: 8px;
  width: 1px;
  z-index: 1;
  background-color: #000000;
  border-radius: 1px;
  transition: opacity ease-in-out 0.1s;
}

.show-button.show-button--show::after {
  opacity: 0;
}
</style>
