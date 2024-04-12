// Utilities
import { defineStore } from 'pinia'


export type ScoreCategory = 'addition' | 'divide' | 'multiply' | 'subtract' | 'polish';
interface State {
  lives: number;
  maxLife: number;
  scores: Record<ScoreCategory, number>;
}

const maxLife = 5;
const startLife = 3;


export const useAppStore = defineStore('app', {
  state: (): State => {
    const lives = localStorage.getItem('lives');
    const scores = localStorage.getItem('scores');

    return {
      lives: lives ? JSON.parse(lives) : startLife,
      maxLife: maxLife,
      scores: scores ? JSON.parse(scores) : {
        polish: 0,
        addition: 0,
        divide: 0,
        multiply: 0,
        subtract: 0,
      },
    }},
  actions: {
    increment() {
      if(this.lives >= maxLife) return;
      this.lives++
    },
    decrement() {
      if(this.lives <= 0) return;
      this.lives--
    }
  },
  getters: {
    getScore: (state) => (type: ScoreCategory) => state.scores[type] || 0
  },
})
