import { defineStore } from 'pinia';

export interface Task {
  id: string;
  name: string;
  icon: string;
  reward: number;
  days: string[];
  completed: { [date: string]: boolean };
}

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    points: 0
  }),

  getters: {
    todaysTasks: (state) => {
      const today = new Date();
      const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
      const dateString = today.toISOString().split('T')[0];
      return state.tasks.filter(task => task.days.includes(dayName))
        .map(task => ({
          ...task,
          isCompleted: task.completed[dateString] || false
        }));
    }
  },

  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
      this.saveToLocalStorage();
    },

    completeTask(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        const today = new Date().toISOString().split('T')[0];
        task.completed = { ...task.completed, [today]: true };
        this.points += task.reward;
        this.saveToLocalStorage();
      }
    },

    uncompleteTask(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        const today = new Date().toISOString().split('T')[0];
        task.completed = { ...task.completed, [today]: false };
        this.points -= task.reward;
        this.saveToLocalStorage();
      }
    },

    getTasksForDate(date: Date) {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const dateString = date.toISOString().split('T')[0];
      return this.tasks.filter(task => {
        return task.days.includes(dayName);
      }).map(task => ({
        ...task,
        isCompleted: task.completed[dateString] || false
      }));
    },

    loadFromLocalStorage() {
      if (process.client) {
        const savedTasks = localStorage.getItem('tasks');
        const savedPoints = localStorage.getItem('points');
        if (savedTasks) this.tasks = JSON.parse(savedTasks);
        if (savedPoints) this.points = JSON.parse(savedPoints);
      }
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('points', JSON.stringify(this.points));
      }
    }
  }
}); 