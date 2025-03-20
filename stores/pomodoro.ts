import { defineStore } from 'pinia';

interface PomodoroState {
  timeRemaining: number;
  isRunning: boolean;
  mode: 'work' | 'break';
  workDuration: number;
  breakDuration: number;
}

export const usePomodoroStore = defineStore('pomodoro', {
  state: (): PomodoroState => ({
    timeRemaining: 25 * 60, // 25 minutes in seconds
    isRunning: false,
    mode: 'work',
    workDuration: 25 * 60,
    breakDuration: 5 * 60
  }),

  getters: {
    minutes: (state) => Math.floor(state.timeRemaining / 60),
    seconds: (state) => state.timeRemaining % 60,
    displayTime: (state) => {
      const mins = Math.floor(state.timeRemaining / 60);
      const secs = state.timeRemaining % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  },

  actions: {
    start() {
      this.isRunning = true;
    },

    pause() {
      this.isRunning = false;
    },

    reset() {
      this.timeRemaining = this.mode === 'work' ? this.workDuration : this.breakDuration;
      this.isRunning = false;
    },

    toggleMode() {
      this.mode = this.mode === 'work' ? 'break' : 'work';
      this.timeRemaining = this.mode === 'work' ? this.workDuration : this.breakDuration;
      this.isRunning = false;
    },

    tick() {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.isRunning = false;
        // Play sound or show notification here
      }
    }
  }
}); 