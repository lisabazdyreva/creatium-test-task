<script setup lang="ts">
import { RouterView } from 'vue-router';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
</script>

<template>
  <div class="app">
    <LayoutHeader />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  display: flex;
}
</style>
