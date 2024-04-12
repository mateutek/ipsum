<script setup lang="ts">
  const props = defineProps<{
    word: string;
  }>();
</script>

<template>
  <div>
    <span v-for="(letter, index) in props.word.split('')" :key="index">
      {{ letter }}
    </span>
  </div>
</template>

<style scoped>

</style>
