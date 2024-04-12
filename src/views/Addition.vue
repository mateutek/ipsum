<template>
  <v-container>
    <v-row>
      <v-col lg="2" md="2" sm="12" cols="12" order="2" order-md="1">
        <v-sheet rounded="lg">
          <v-list color="transparent">
              <v-list-item
                  v-for="n in 3"
                  :key="n"
                  :to="`${n}`"
              >
                    Poziom: {{ n }}
              </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col lg="10" md="10" sm="12" cols="12" order="1" order-md="2">
        <v-card
            rounded="lg"
            :color="cardColor"
        >
          <v-col>
            <v-row no-gutters justify="space-between">
              <h2>Poziom {{level}}</h2>
              <wrong-answers :wrong="wrongAnswers"/>
              <h2>Punkty: {{score}} z {{tasksTotal}}</h2>
            </v-row>
            <h2 class="text-center text-h2 justify-center align-center d-flex">
              <number-grid :selected-number="addend1" class="mr-2"/>
              <animated-integer :value="addend1"/>
              <v-icon>mdi-plus</v-icon>
              <animated-integer :value="addend2"/>
              <number-grid :selected-number="addend2" class="ml-2"/>
              = {{wrongAnswers === 3 ? solution : '?'}}
            </h2>
            <v-text-field
                class="mt-3"
                ref="answer"
                type="number"
                v-model="answer"
                label="Wynik"
                required
                autofocus
                v-on:keyup.enter="checkAnswer"
            ></v-text-field>
            <v-row no-gutters justify="space-between">
              <v-btn color="secondary" v-on:click="generateNew">
                Nowe zadanie
              </v-btn>
              <v-btn color="primary" v-on:click="checkAnswer" :disabled="wrongAnswers===3">
                Sprawdź
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AnimatedInteger from '@/components/animatedInteger.vue';
  import WrongAnswers from '@/components/wrongAnswers.vue';
  import {randomIntFromInterval} from '@/helpers/helpers';
  import NumberGrid from '@/components/numberGrid.vue';

  export default {
    name: 'Multiply',
    components: {NumberGrid, WrongAnswers, AnimatedInteger},
    created() {
      this.level = this.$route.params.level;
      this.generateNew();
    },
    watch: {
      $route(to) {
        this.level = to.params.level;
      },
      level(newLevel) {
        console.log(newLevel);
      }
    },
    data: () => ({
      level: 0,
      score: 0,
      solution: 1,
      answer:'',
      addend1: 1,
      addend2: 1,
      invalidAnswer: false,
      cardColor: 'white',
      tasksTotal: -1,
      wrongAnswers: 0,
    }),
    computed: {
      levelRange: function () {
        return ([
          [1,],
          [],
          []
        ])[this.level - 1]
      }
    },
    methods: {
      checkAnswer: function () {
        if(parseInt(this.answer) === this.solution) {
          this.generateNew();
          this.invalidAnswer = false;
          this.answer = '';
          this.score += 1;
          this.correctAnswer();
        } else {
          this.invalidAnswer = true;
          this.wrongAnswer();
        }
        this.$refs.answer.focus();
      },
      generateNew: function () {
        this.addend1 = randomIntFromInterval(1,10);
        this.addend2 = randomIntFromInterval(5,10);
        this.solution = this.addend1 + this.addend2;
        this.invalidAnswer = false;
        this.answer = '';
        this.cardColor = 'white';
        this.tasksTotal +=1;
        this.wrongAnswers = 0;
      },
      correctAnswer: function () {
        this.cardColor = 'green lighten-4';
        setTimeout(() => {
          this.cardColor = 'white';
        }, 1000);
      },
      wrongAnswer: function () {
        this.cardColor = 'red lighten-4';
        this.wrongAnswers += 1;
        this.answer = '';
        setTimeout(() => {
          this.cardColor = 'white';
        }, 1000);
      },
    }
  }
</script>
