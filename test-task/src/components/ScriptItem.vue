<script setup lang="ts">
import ActionBadge from '@/components/common/ActionBadge.vue';
import { ref } from 'vue';

const props = defineProps<{
  item: any; // todo lisa
  nestedLevel: number;
  dragOverId: string | null;
}>();

defineEmits<{
  (e: 'handle-dragstart', id: string): void;
  (e: 'handle-dragover', id: string): void;
  (e: 'handle-dragenter', id: string): void;
  (e: 'handle-drop', id: string): void;
  (e: 'handle-dragend'): void;
}>();

const isShow = ref(true);
</script>

<template>
  <li>
    <div
      class="script-item"
      :class="{ 'script-item--drag-over': dragOverId === item.id }"
      :style="{
        marginLeft: item?.children
          ? `${nestedLevel * 10}px`
          : `${nestedLevel * 24 + 10}px`,
      }"
      draggable="true"
      @dragstart="$emit('handle-dragstart', item.id)"
      @dragenter.prevent="$emit('handle-dragenter', item.id)"
      @dragover.prevent="$emit('handle-dragover', item.id)"
      @drop="$emit('handle-drop', item.id)"
      @dragend="$emit('handle-dragend')"
    >
      <div v-if="item?.children && item.id !== 'main'">
        <button @click="() => (isShow = !isShow)">C</button>
      </div>
      <div class="script-item__icon-wrapper">
        <component
          :is="item.icon.component"
          :type="item.icon.type"
          class="script-item__icon"
        />
      </div>
      <div class="script-item__info info">
        <div class="info__main-info">
          <div class="info__title">{{ item.title }}</div>
          <ActionBadge v-if="item?.action" class="info__badge">
            {{ item.action }}
          </ActionBadge>
        </div>
        <div class="info__caption">
          <span v-if="item?.value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div v-if="item?.children" class="script__item--children">
      <ul v-show="isShow">
        <ScriptItem
          v-for="childItem in item.children"
          :key="childItem.id"
          :item="childItem"
          :dragOverId="dragOverId"
          :nested-level="nestedLevel + 1"
          @handle-drop="(id: string) => $emit('handle-drop', id)"
          @handle-dragenter="(id: string) => $emit('handle-dragenter', id)"
          @handle-dragstart="(id: string) => $emit('handle-dragstart', id)"
          @handle-dragover="(id: string) => $emit('handle-dragover', id)"
        />
      </ul>
    </div>
  </li>
</template>

<style scoped>
.script-item__icon-wrapper {
  display: flex;
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--border-color-dark);
}

.script-item__icon {
  display: block;
}

.script-item {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 26px;
}

.script-item__info {
  display: flex;
  flex-direction: column;
}

.info__main-info {
  display: flex;
  gap: 8px;
  align-items: center;
}

.info__title {
  font-size: var(--font-size-14);
  line-height: var(--font-size-24);
  font-weight: 500;
}

.info__caption {
  font-size: var(--font-size-12);
  line-height: var(--font-size-16);
  color: var(--text-color-gray);
  height: 16px;
}

.script-item--drag-over {
  background-color: red;
}
</style>
