<script setup lang="ts">
import { RouterView } from 'vue-router';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
</script>

<template>
  <div class="app">
    <LayoutHeader class="app__header" />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  display: flex;
}
.app__header {
  position: fixed;
  top: 0;
}
</style>
