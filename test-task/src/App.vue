<script setup lang="ts">
import { RouterView } from 'vue-router';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue';
</script>

<template>
  <div class="app">
<!--    <LayoutHeader />-->
<!--    <LayoutSidebar />-->
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  display: flex;
}
</style>
