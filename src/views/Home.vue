<template>
    <v-row align="center" justify="center" class="fill-height">
      <v-sheet rounded min-width="50vw" elevation="2">
        <v-container>
          <v-row>
            <v-col>
              <h1>Najlepsze wyniki</h1>
            </v-col>
          </v-row>
          <v-slide-x-transition tag="v-row" group>

              <v-col
                v-for="card in cards"
                :key="card.title"
                :cols="card.flex"
              >

                <v-card>
                  <v-img
                    :src="card.src"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    :cover="true"
                  >
                    <v-card-text class="text-white score">
                      <animated-integer :value="card.score" :delay="0.5"/>
                      &nbsp;pkt
                    </v-card-text>
                    <v-card-title class="text-white">{{ card.title }}</v-card-title>
                  </v-img>
                </v-card>
              </v-col>
          </v-slide-x-transition>
        </v-container>
      </v-sheet>
    </v-row>
</template>

<script lang="ts" setup>

import AnimatedInteger from '@/components/animatedInteger.vue';
import { ScoreCategory, useAppStore } from '@/store/app';
import { onMounted, ref } from 'vue';
import PolishImage from '@/assets/polski.jpg';

const appStore = useAppStore();

appStore.$subscribe((mutation, state) => {
  console.log(state)
  console.log(mutation)
});

onMounted(() => {
  cards.value.forEach((card) => {
    card.score = appStore.getScore(card.id);
  });
});

interface Card {
  id: ScoreCategory;
  title: string;
  src: string;
  score: number;
  flex: number;
}

const cards = ref<Card[]>([
  {
    id: 'polish',
    title: 'Czytanie',
    src: PolishImage,
    score: 0,
    flex: 3,
  },
  {
    id: 'addition',
    title: 'Dodawanie',
    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
    score: 0,
    flex: 3,
  },
  {
    id: 'subtract',
    title: 'Odejmowanie',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    score: 0,
    flex: 3,
  },
  {
    id: 'multiply',
    title: 'Mnożenie',
    src: 'https://cdn.vuetifyjs.com/images/cards/forest.jpg',
    score: 0,
    flex: 3,
  },
  {
    id: 'divide',
    title: 'Dzielenie',
    src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
    score: 0,
    flex: 3,
  }
]);

</script>


<style scoped>
.score {
  font-size: 2rem;
  font-weight: bold;
  width: 100%;
  height: 100%;;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
