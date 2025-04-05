import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Task {
  id: string;
  name: string;
  icon: string;
  reward: number;
  days: string[];
  completed: { [date: string]: boolean };
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const points = ref(0);

  const todaysTasks = computed(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = today.toISOString().split('T')[0];
    return tasks.value.filter(task => task.days.includes(dayName))
      .map(task => ({
        ...task,
        isCompleted: task.completed[dateString] || false
      }));
  });

  function addTask(task: Task) {
    tasks.value.push(task);
    saveToLocalStorage();
  }

  function completeTask(taskId: string) {
    const task = tasks.value.find(t => t.id === taskId);
    if (task) {
      const today = new Date().toISOString().split('T')[0];
      task.completed = { ...task.completed, [today]: true };
      points.value += task.reward;
      saveToLocalStorage();
    }
  }

  function uncompleteTask(taskId: string) {
    const task = tasks.value.find(t => t.id === taskId);
    if (task) {
      const today = new Date().toISOString().split('T')[0];
      task.completed = { ...task.completed, [today]: false };
      points.value -= task.reward;
      saveToLocalStorage();
    }
  }

  function getTasksForDate(date: Date) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = date.toISOString().split('T')[0];
    return tasks.value.filter(task => {
      return task.days.includes(dayName);
    }).map(task => ({
      ...task,
      isCompleted: task.completed[dateString] || false
    }));
  }

  function loadFromLocalStorage() {
    if (process.client) {
      const savedTasks = localStorage.getItem('tasks');
      const savedPoints = localStorage.getItem('points');
      if (savedTasks) tasks.value = JSON.parse(savedTasks);
      if (savedPoints) points.value = JSON.parse(savedPoints);
    }
  }

  function saveToLocalStorage() {
    if (process.client) {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
      localStorage.setItem('points', JSON.stringify(points.value));
    }
  }

  return {
    tasks,
    points,
    todaysTasks,
    addTask,
    completeTask,
    uncompleteTask,
    getTasksForDate,
    loadFromLocalStorage,
    saveToLocalStorage
  };
}); 