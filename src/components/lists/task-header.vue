<template lang="html">
  <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm rounded-t-lg">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Today's Tasks</h2>
    <button class="text-white rounded-xl w-14 h-10 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700" @click="showDialog = true">
      <Icon name="lucide:plus" class="text-white" />
    </button>

    <Dialog v-model:visible="showDialog" modal header="Add Task" :style="{ width: '50vw' }" class="dark:bg-gray-800">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Name</label>
          <InputText v-model="newTask.name" placeholder="Task name" class="dark:bg-gray-700 dark:text-white" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Icon</label>
          <SharedIconSelector v-model="newTask.icon" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Reward Points</label>
          <InputNumber v-model="newTask.reward" placeholder="Points" class="dark:bg-gray-700 dark:text-white" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Days</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="day in days"
              :key="day"
              class="px-3 py-1 rounded-lg"
              :class="{
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100': newTask.days.includes(day),
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100': !newTask.days.includes(day)
              }"
              @click="toggleDay(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <button 
            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            @click="showDialog = false"
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700"
            @click="addTask"
          >
            Add Task
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../../stores/tasks';
import SharedIconSelector from '../shared/icon-selector.vue';

const emit = defineEmits(['add-task']);

const showDialog = ref(false);
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const newTask = ref<Task>({
  id: '',
  name: '',
  icon: 'lucide:check',
  reward: 0,
  days: [...days],
  completed: {}
});

const toggleDay = (day: string) => {
  const index = newTask.value.days.indexOf(day);
  if (index === -1) {
    newTask.value.days.push(day);
  } else {
    newTask.value.days.splice(index, 1);
  }
};

const addTask = () => {
  if (!newTask.value.name || !newTask.value.reward) return;
  
  emit('add-task', { ...newTask.value });
  showDialog.value = false;
  // Reset form
  newTask.value = {
    id: '',
    name: '',
    icon: 'lucide:check',
    reward: 0,
    days: [...days],
    completed: {}
  };
};
</script>

<style setup lang="ts"></style>
