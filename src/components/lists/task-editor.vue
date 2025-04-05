<template lang="html">
  <Dialog :visible="isVisible" @update:visible="$emit('update:visible', $event)" modal header="Edit Tasks" :style="{ width: '80vw' }" class="dark:bg-gray-800">
    <div class="flex flex-col gap-4">
      <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        <Icon name="lucide:list-todo" class="text-6xl mb-4" />
        <p class="text-xl">No tasks available. Click the + button to add some tasks!</p>
      </div>
      <div v-else class="grid grid-cols-1 gap-4">
        <div class="flex justify-end mb-4">
          <button 
            class="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 flex items-center gap-2"
            @click="confirmDeleteAll"
          >
            <Icon name="lucide:trash-2" />
            Delete All
          </button>
        </div>
        <div v-for="task in tasks" :key="task.name" 
          class="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
          <div class="flex items-center gap-4">
            <Icon :name="task.icon" class="text-2xl dark:text-white" />
            <div class="flex flex-col">
              <h3 class="font-bold dark:text-white">{{ task.name }}</h3>
              <div class="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span v-for="day in task.days" :key="day">{{ day.slice(0, 3) }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="font-bold dark:text-white">{{ task.reward }}</span>
              <Icon name="lucide:gem" class="text-xl text-yellow-500" />
            </div>
            <button 
              class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
              @click="editTask(task)"
            >
              <Icon name="lucide:edit-2" class="text-xl" />
            </button>
            <button 
              class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              @click="confirmDelete(task)"
            >
              <Icon name="lucide:trash-2" class="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useConfirm } from "primevue/useconfirm";

interface Task {
  name: string;
  icon: string;
  reward: number;
  days: string[];
  lastCompleted?: string;
}

const props = defineProps<{
  visible: boolean;
  tasks: Task[];
}>();

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
});

const emit = defineEmits(['update:visible', 'delete-task', 'edit-task', 'delete-all']);

const confirm = useConfirm();

const confirmDeleteAll = () => {
  confirm.require({
    message: 'Are you sure you want to delete all tasks? This action cannot be undone.',
    header: 'Delete All Tasks',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      emit('delete-all');
    }
  });
};

const confirmDelete = (taskToDelete: Task) => {
  confirm.require({
    message: 'Are you sure you want to delete this task?',
    header: 'Delete Task',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      emit('delete-task', taskToDelete);
    }
  });
};

const editTask = (task: Task) => {
  emit('edit-task', task);
};
</script> 