<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-5rem)]">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-96">
      <!-- Timer Display -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          {{ pomodoroStore.displayTime }}
        </h1>
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ pomodoroStore.mode === 'work' ? 'Work Time' : 'Break Time' }}
        </div>
      </div>

      <!-- Controls -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          v-if="!pomodoroStore.isRunning"
          @click="startTimer"
          class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
        >
          <Icon name="lucide:play" />
          Start
        </button>
        <button
          v-else
          @click="pomodoroStore.pause"
          class="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center gap-2"
        >
          <Icon name="lucide:pause" />
          Pause
        </button>
        <button
          @click="pomodoroStore.reset"
          class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2"
        >
          <Icon name="lucide:refresh-cw" />
          Reset
        </button>
      </div>

      <!-- Mode Toggle -->
      <div class="flex justify-center">
        <button
          @click="pomodoroStore.toggleMode"
          class="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
        >
          <Icon :name="pomodoroStore.mode === 'work' ? 'lucide:coffee' : 'lucide:brain'" />
          Switch to {{ pomodoroStore.mode === 'work' ? 'Break' : 'Work' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { usePomodoroStore } from '~/stores/pomodoro';

const pomodoroStore = usePomodoroStore();
let timerInterval: ReturnType<typeof setInterval> | null = null;

const startTimer = () => {
  // Clean up any existing interval first
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  pomodoroStore.start();
  timerInterval = setInterval(() => {
    if (!pomodoroStore.isRunning) {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = null;
      return;
    }
    pomodoroStore.tick();
  }, 1000);
};

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});
</script> 