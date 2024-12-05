<script setup lang="ts">
import ArrowIcon from '@/components/icons/common/ArrowIcon.vue';

import { ref } from 'vue';

const isShowContent = ref(true);
/*todo lisa fix styles*/
</script>

<template>
  <div class="content__action-item action-item">
    <button
      class="action-item__button"
      @click="() => (isShowContent = !isShowContent)"
    >
      <span class="action-item__subtitle">
        <slot name="title" />
      </span>
      <ArrowIcon
        class="action-item__icon"
        :class="{ 'action-item__icon--active': isShowContent }"
      />
    </button>
    <template v-if="isShowContent">
      <slot name="list"> </slot>
    </template>
  </div>
</template>

<style scoped>
.action-item__button {
  display: flex;
  align-items: center;
  font: inherit;
  width: 100%;
  padding: 13px 12px 12px 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.action-item__icon {
  margin-left: auto;
  transition: transform ease-in-out 0.1s;
}

.action-item__icon--active {
  transform: rotate(180deg);
}

.action-item__subtitle {
  font-size: var(--font-size-14);
  line-height: var(--font-size-24);
  font-weight: 500;
}
</style>
