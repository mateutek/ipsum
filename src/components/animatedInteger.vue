<template>
  <span>{{ displayValue }}</span>
</template>

<script>
import gsap from 'gsap';

export default {
  name: "animated-integer",
  props: {
    value: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 0.5
    },
    delay: {
      type: Number,
      default: 0
    }

  },
  data: function () {
    return {
      displayValue: this.value,
      tweenValue: this.value,
    };
  },
  watch: {
    value() {
      gsap.to(this, {
        tweenValue: this.value,
        duration: this.duration,
        delay: this.delay,
        onUpdate: () => {
          this.displayValue = Math.ceil(this.tweenValue);
        },
      });
    },
  },
}
</script>

<!--<script setup lang="ts">-->
<!--import { defineProps, ref, reactive, watch } from 'vue';-->
<!--import { gsap } from 'gsap';-->
<!--const props = defineProps({-->
<!--  value: {-->
<!--    type: Number,-->
<!--    required: true-->
<!--  }-->
<!--});-->

<!--const tweened = reactive({-->
<!--  number: 0-->
<!--});-->

<!--watch(props.value, (n) => {-->
<!--  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })-->
<!--})-->
<!--</script>-->
