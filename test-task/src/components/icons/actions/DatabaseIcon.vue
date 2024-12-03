<script setup lang="ts">
import { DatabaseActionType } from '@/const/actions.ts';

defineProps<{
  type?: DatabaseActionType;
}>();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.3334 4.58334C18.3334 4.58334 18.3334 15.026 18.3334 15.8333C18.3334 17.2141 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.6667 17.2141 1.6667 15.8333C1.6667 15.0593 1.66669 4.58334 1.66669 4.58334" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.3334 12.0833C18.3334 13.4641 14.6024 14.5833 10 14.5833C5.39765 14.5833 1.66669 13.4641 1.66669 12.0833" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.3334 8.33334C18.3334 9.71405 14.6024 10.8333 10 10.8333C5.39765 10.8333 1.66669 9.71405 1.66669 8.33334" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 6.66666C14.6024 6.66666 18.3334 5.54737 18.3334 4.16666C18.3334 2.78594 14.6024 1.66666 10 1.66666C5.39765 1.66666 1.66669 2.78594 1.66669 4.16666C1.66669 5.54737 5.39765 6.66666 10 6.66666Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="14.0741" cy="14.0741" r="5.92593" fill="currentColor"/>

    <path v-if="type === DatabaseActionType.Create" d="M11.8519 15.7558L15.4074 11.1111L16.9312 12.2322L13.2064 17.037H11.8519V15.7558Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>

    <g v-if="type === DatabaseActionType.Update">
      <path xmlns="http://www.w3.org/2000/svg" d="M17.037 15.1478C16.6413 16.4075 15.4644 17.3213 14.074 17.3213C12.6837 17.3213 11.5068 16.4075 11.1111 15.1478V17.0108" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      <path xmlns="http://www.w3.org/2000/svg" d="M17.037 11.4216V13.2847C16.6413 12.0249 15.4644 11.1111 14.074 11.1111C12.6837 11.1111 11.5068 12.0249 11.1111 13.2847" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g v-if="type === DatabaseActionType.Search">
      <path xmlns="http://www.w3.org/2000/svg" d="M17.7778 10.3704H10.3704V17.7778H17.7778V10.3704Z" fill="white" fill-opacity="0.01"/>
      <path xmlns="http://www.w3.org/2000/svg" d="M13.896 16.2346C15.3449 16.2346 16.5195 15.06 16.5195 13.6111C16.5195 12.1622 15.3449 10.9876 13.896 10.9876C12.4472 10.9876 11.2726 12.1622 11.2726 13.6111C11.2726 15.06 12.4472 16.2346 13.896 16.2346Z" stroke="white" stroke-linejoin="round"/>
      <path xmlns="http://www.w3.org/2000/svg" d="M15.7821 15.4972L17.0916 16.8066" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <path v-if="type === DatabaseActionType.Delete" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M12.8536 12.1464C12.6583 11.9512 12.3417 11.9512 12.1464 12.1464C11.9512 12.3417 11.9512 12.6583 12.1464 12.8536L13.4596 14.1667L12.1464 15.4798C11.9512 15.675 11.9512 15.9916 12.1464 16.1869C12.3417 16.3821 12.6583 16.3821 12.8536 16.1869L14.1667 14.8738L15.4798 16.1869C15.675 16.3821 15.9916 16.3821 16.1869 16.1869C16.3821 15.9916 16.3821 15.675 16.1869 15.4798L14.8738 14.1667L16.1869 12.8536C16.3821 12.6583 16.3821 12.3417 16.1869 12.1464C15.9916 11.9512 15.675 11.9512 15.4798 12.1464L14.1667 13.4596L12.8536 12.1464Z" fill="white"/>
  </svg>
</template>

<style scoped>

</style>
