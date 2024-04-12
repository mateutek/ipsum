<script setup lang="ts">
import GridBox from '@/components/gridBox.vue';
  interface Props {
    selectedNumber: number
  }
  const props = defineProps<Props>()

</script>

<template>
  <div>
    <div class="number-boxes-container">
      <grid-box v-for="box in 10" :key="box" :number="box" :selected-number="props.selectedNumber"></grid-box>
    </div>
  </div>
</template>

<style scoped>

.number-boxes-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

</style>
