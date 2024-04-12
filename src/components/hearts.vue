<script setup lang="ts">
  import Heart from '@/components/heart.vue';
  import { useAppStore } from '@/store/app';
  const appStore = useAppStore();
  const addLife = () => {
    appStore.increment();
  }
  const removeLife = () => {
    appStore.decrement();
  }
</script>

<template>
  <div class="hearts-container">
    <Heart v-for="i in appStore.maxLife" :key="i" :index="i" :userLives="appStore.lives"/>
  </div>
</template>

<style scoped>
  .hearts-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
