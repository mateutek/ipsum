<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

  interface Props {
    number: number,
    selectedNumber: number
  }

  const isActve = ref(false);

  const props = defineProps<Props>()

  watch(() => props.selectedNumber, (newVal, oldVal) => {

      const timeoutValue = newVal >= props.number ? 150 * (props.number - oldVal) : 150 * (oldVal - props.number);

      setTimeout(() => {
        isActve.value = newVal >= props.number;
      }, timeoutValue);
  });

  onMounted(() => {
    setTimeout(() => {
      isActve.value = props.selectedNumber >= props.number;
    }, 150 * props.number);
  });

</script>

<template>
  <div class="number-row" :class="isActve? 'selected' : ''">
    {{props.number}}
  </div>
</template>

<style scoped>
.number-row {
  width: 20px;
  height: 20px;
  font-size: 12px;
  margin: 2px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease, color 0.5s ease;
  background-color: white;
  color: black;
  font-weight: bold;
  border-radius: 4px;

  &.selected {
    background-color: red;
    color: white;
  }
}
</style>
