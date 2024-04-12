<template>
  <v-container class="mt-5">
    <v-row justify="center" align="center" no-gutters>
      <v-col>
        <v-card
          rounded="lg"
          :color="cardColor"
        >
          <v-col>
            <v-row no-gutters justify="space-between">
              <h2>Poziom 1</h2>
              <wrong-answers :wrong="wrongAnswers"/>
              <h2>Punkty: {{score}} z {{tasksTotal}}</h2>
            </v-row>
            <v-row  justify="center" class="mb-5">
              <h2 class="text-center text-h2 justify-center align-center d-flex">
                <word-split :word="word"/>
              </h2>
            </v-row>

            <v-row justify="center">
              <v-col cols="auto" v-for="(answer, index) in answers" :key="index">
                <v-btn
                  @click="checkAnswer(answer)"
                  :color="guessedLetters.includes(answer) ? 'error': 'primary'"
                  :disabled="guessedLetters.includes(answer) || won || this.wrongAnswers === 3"
                  size="large"
                  class="text-lowercase"
                >
                  {{answer}}
                  <v-tooltip
                    activator="parent"
                    location="top"
                  ><div class="text-h3">{{showTooltip(answer)}}</div></v-tooltip>
                </v-btn>
              </v-col>
            </v-row>

            <v-row no-gutters justify="space-between">
              <v-btn color="secondary" v-on:click="generateNew">
                Nowe zadanie
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
  import WrongAnswers from '@/components/wrongAnswers.vue';
  import WordSplit from '@/components/wordSplit.vue';
  import wordsList from '@/data/wordsList';

  export default {
    name: 'Multiply',
    components: {WordSplit, WrongAnswers},
    created() {
      // this.level = this.$route.params.level;
      this.generateNew();
    },
    watch: {
      $route(to) {
        this.level = to.params.level;
      },
      level(newLevel) {
        // console.log(newLevel);
      }
    },
    data: () => ({
      level: 0,
      score: 0,
      answers: [],
      word: '',
      solution: '',
      answer: '',
      splitWord: [],
      cardColor: 'white',
      tasksTotal: 0,
      wrongAnswers: 0,
      guessedLetters: [],
      won: false,
      prevIndex: -1,
    }),
    methods: {
      checkAnswer: function (answer: string) {
        if(answer === this.answer) {
          this.score += 1;
          this.correctAnswer();
        } else {
          this.wrongAnswer();
          this.guessedLetters.push(answer);
        }
      },
      generateNew: function () {
        this.won = false;
        this.guessedLetters = [];
        const word = wordsList[this.level][Math.floor(Math.random() * wordsList[this.level].length)];
        this.splitWord = word.split('');
        this.solution = word;
        let solutionIndex = Math.floor(Math.random() * (word.length - 1));

        while (solutionIndex === this.prevIndex ){
          console.log(solutionIndex, this.prevIndex)
          solutionIndex = Math.floor(Math.random() * (word.length - 1));
        }

        this.prevIndex = solutionIndex;

        this.answer = this.splitWord[solutionIndex];
        this.splitWord.splice(solutionIndex, 1, '_');
        this.word = this.splitWord.join('');

        const randomAnswerPosition = Math.floor(Math.random() * 4);
        this.answers = this.generateAnswers(this.answer, randomAnswerPosition);

        this.cardColor = 'white';
        this.tasksTotal +=1;
        this.wrongAnswers = 0;
      },
      correctAnswer: function () {
        this.cardColor = 'green lighten-4';
        this.word = this.solution;
        this.won = true;
        setTimeout(() => {
          this.cardColor = 'white';
          this.generateNew();
        }, 2000);
      },
      wrongAnswer: function () {
        if(this.wrongAnswers === 2) {
          this.word = this.solution;
        }
        this.wrongAnswers += 1;
      },
      generateAnswers(solution: string, randomAnswerPosition: number) {
        const letters = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż';
        const answers = [];
        for (let i = 0; i < 4; i++) {
          if (i === randomAnswerPosition) {
            answers.push(solution);
          } else {
            let randomLetter = letters[Math.floor(Math.random() * letters.length)];
            while (randomLetter === solution || answers.includes(randomLetter)) {
              randomLetter = letters[Math.floor(Math.random() * letters.length)];
            }
            answers.push(randomLetter);
          }
        }
        return answers;
      },
      showTooltip(answer) {
        return this.word.replace(/_/g, answer);
      }
    }
  }
</script>
