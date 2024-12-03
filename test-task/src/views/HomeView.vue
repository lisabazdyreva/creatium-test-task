<script setup lang="ts">
import ScriptsHeader from '@/components/home/ScriptsHeader.vue';
import ScriptsAside from '@/components/home/ScriptsAside.vue';
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue';
</script>

<template>
  <main class="home-view">
    <ScriptsHeader class="home-view__scripts-header" />
    <section class="home-view__content content">
      <div class="content__scripts-content">
        Схема сценария
      </div>
      <ScriptsAside class="content__scripts-aside" />
    </section>
  </main>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100svh;
  border-left: 1px solid var(--border-color);
}

.home-view__content {
  flex: 1;
}

.content {
  display: grid;
  grid-template-columns: auto 320px;
}

.content__scripts-content {
  background-color: var(--bg-white);
}

.content__scripts-aside {
  background-color: var(--bg-white);
  border-left: 1px solid var(--border-color);
}
</style>
