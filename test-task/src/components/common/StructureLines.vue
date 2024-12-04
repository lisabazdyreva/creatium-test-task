<script setup lang="ts">
defineProps<{
  size: 45;
  nestedLevel: number;

  isLast?: boolean;
  isRoot?: boolean;
  childrenLength?: number;
  pid?: string;
  gap?: number;
}>();
</script>

<template>
  <div>
    <div
      v-if="pid && !isLast"
      class="line line--vertical"
      :style="{
        left: `${nestedLevel * size - Math.ceil(size / 2)}px`,
      }"
    />

    <div
      v-if="pid && isLast && !childrenLength"
      class="line line--last-child"
      :style="{
        left: `${nestedLevel * size - Math.ceil(size / 2)}px`,
        bottom: `${Math.ceil(size / 2)}px`,
      }"
    />

    <div
      v-if="pid && isLast"
      class="line line--last-child"
      :style="{
        left: `${nestedLevel * size - Math.ceil(size / 2)}px`,
        height: `${Math.ceil(size / 2) + gap}px`,
      }"
    ></div>

    <div
      v-if="!pid && childrenLength"
      class="line line--fix-margin"
      :style="{
        left: `${Math.ceil(size / 2 - 1)}px`,
      }"
    ></div>

    <div
      v-if="pid"
      class="line line--horizontal"
      :style="{
        left: `${nestedLevel * size - Math.ceil(size / 2)}px`,
        width: `${Math.ceil(size / 2)}px`,
      }"
    ></div>
  </div>
</template>

<style scoped>
.line {
  position: absolute;
  background-color: var(--border-color-dark);
}

.line--horizontal {
  top: 22px;
  height: 1px;
}

.line--fix-margin {
  top: 45px;
  height: 6px;
  width: 1px;
}

.line--last-child {
  top: -20px;
  width: 1px;
}

.line--vertical {
  top: -20px;
  bottom: 0;
  width: 1px;
}
</style>
