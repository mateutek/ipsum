<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import HeartAnim from "@/assets/heart_animation.json"
import { LottieAnimation } from "lottie-web-vue"

let anim = ref();

let currentFrame = ref(0);
let stopFrame = ref(193);
let direction = ref(1);

interface Props {
  userLives: number
  index: number
}
const props = defineProps<Props>()

watch(() => props.userLives, (after, before) => {

  if(props.index > after) {
    direction.value = -1;
    stopFrame.value = 85;
    anim.value.setDirection(direction.value);
  } else if(props.index <= after) {
    direction.value = 1;
    stopFrame.value = 193;
    anim.value.setDirection(direction.value);
  }

  if(props.index >=2) {
    console.table({
      before,
      after,
      direction: direction.value,
      stopFrame: stopFrame.value,
      currentFrame: currentFrame.value,
    });
  }
  anim.value.goToAndPlay(currentFrame.value, true);

});



onMounted(() => {
  if(props.index > props.userLives) {
    stopFrame.value = 85;
  }
  setTimeout(() => {
    anim.value.goToAndPlay(0, true);
  }, 250*props.index-1);
});

const onEnterFrame = () => {
  if(props.index === 3) {
    // console.log(currentFrame.value);
  }

  if (currentFrame.value === stopFrame.value) {
    anim.value.pause();
  } else {

    currentFrame.value += direction.value;
  }
};

</script>

<template>
  <LottieAnimation
    class="heart"
    :auto-play="false"
    :animation-data="HeartAnim"
    :speed="1"
    @enterFrame="onEnterFrame"
    ref="anim" />
</template>

<style scoped>
  .heart {
    width: 80px;
    height: 80px;
  }
</style>
