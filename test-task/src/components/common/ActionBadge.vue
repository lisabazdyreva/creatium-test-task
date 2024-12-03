<script setup lang="ts"></script>

<template>
  <div class="action-badge">
    <slot />
  </div>
</template>

<style scoped>
.action-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9px;
  background-color: var(--violet-accent-color);
  padding: 1px 6px;

  color: var(--sec-accent-color);
  font-size: var(--font-size-12);
  line-height: var(--font-size-16);
}
</style>
