<template lang="html">
  <div class="flex gap-8 justify-center p-8 dark:bg-gray-900">
    <div class="card flex flex-col max-w-2xl w-screen">
      <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm rounded-t-lg">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Today's Tasks</h2>
        <div class="flex gap-2">
          <button class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg" @click="showEditor = true">
            <Icon name="lucide:edit-2" class="text-xl" />
          </button>
          <button class="text-white rounded-xl w-10 h-10 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700" @click="showDialog = true">
            <Icon name="lucide:plus" class="text-white" />
          </button>
        </div>
      </div>

      <div
        class="flex justify-center items-center flex-col max-w-2xl w-screen bg-white dark:bg-gray-800 shadow-lg rounded-b-lg h-screen max-h-[500px]"
      >
        <ScrollPanel
          style="width: 100%; height: 100%;"
          class="w-full"
        >
          <div class="px-5">
            <div v-if="taskStore.todaysTasks.length === 0" class="flex flex-col items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
              <Icon name="lucide:clipboard-list" class="text-6xl mb-4" />
              <p class="text-xl">No tasks for today. Click the + button to add one!</p>
            </div>
            <listsTaskItem
              v-else
              v-for="task in taskStore.todaysTasks"
              :key="task.id"
              :name="task.name"
              :icon="task.icon"
              :reward="task.reward"
              :is-completed="task.isCompleted"
              @task-complete="handleTaskComplete(task)"
            >
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <span class="font-bold dark:text-white">{{ task.reward }}</span>
                  <Icon name="lucide:gem" class="text-xl text-yellow-500" />
                </div>
                <button 
                  class="p-2 rounded-lg"
                  :class="[
                    task.isCompleted
                      ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20'
                  ]"
                  @click="toggleComplete(task)"
                >
                  <Icon 
                    :name="task.isCompleted ? 'lucide:rotate-ccw' : 'lucide:check'" 
                    class="text-xl"
                  />
                </button>
              </div>
            </listsTaskItem>
          </div>
        </ScrollPanel>
      </div>
    </div>

    <ListsTaskEditor v-model:visible="showEditor" :tasks="taskStore.tasks" @delete-task="deleteTask" @edit-task="editTask" @delete-all="deleteAllTasks" />

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

    <Dialog v-model:visible="showEditDialog" modal header="Edit Task" :style="{ width: '50vw' }" class="dark:bg-gray-800">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Name</label>
          <InputText v-model="editingTask.name" placeholder="Task name" class="dark:bg-gray-700 dark:text-white" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Icon</label>
          <SharedIconSelector v-model="editingTask.icon" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Reward Points</label>
          <InputNumber v-model="editingTask.reward" placeholder="Points" class="dark:bg-gray-700 dark:text-white" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Days</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="day in days"
              :key="day"
              class="px-3 py-1 rounded-lg"
              :class="{
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100': editingTask.days.includes(day),
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100': !editingTask.days.includes(day)
              }"
              @click="toggleEditDay(day)"
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
            @click="showEditDialog = false"
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700"
            @click="saveEdit"
          >
            Save Changes
          </button>
        </div>
      </template>
    </Dialog>

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useTaskStore } from '~/stores/tasks';
import ListsTaskEditor from './task-editor.vue';
import SharedIconSelector from '../shared/icon-selector.vue';
import { useConfirm } from "primevue/useconfirm";
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const taskStore = useTaskStore();
const confirm = useConfirm();

// Load data from localStorage on client-side only
onMounted(() => {
  taskStore.loadFromLocalStorage();
});

// Watch for changes and save to localStorage
watch(() => taskStore.tasks, (newTasks) => {
  if (process.client) {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
}, { deep: true });

watch(() => taskStore.points, (newPoints) => {
  if (process.client) {
    localStorage.setItem('points', JSON.stringify(newPoints));
  }
});

const handleTaskComplete = (task: Task) => {
  if (task.isCompleted) {
    taskStore.uncompleteTask(task.id);
  } else {
    taskStore.completeTask(task.id);
  }
};

const deleteTask = (taskToDelete: Task) => {
  const index = taskStore.tasks.findIndex(task => task.id === taskToDelete.id);
  if (index !== -1) {
    taskStore.tasks.splice(index, 1);
  }
};

const deleteAllTasks = () => {
  taskStore.tasks = [];
};

const showEditor = ref(false);
const showDialog = ref(false);
const showEditDialog = ref(false);

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const newTask = ref({
  name: '',
  icon: 'lucide:check',
  reward: 0,
  days: [...days]
});

const editingTask = ref({
  id: '',
  name: '',
  icon: 'lucide:check',
  reward: 0,
  days: [],
  completed: {}
});

const toggleDay = (day: string) => {
  const index = newTask.value.days.indexOf(day);
  if (index === -1) {
    newTask.value.days.push(day);
    newTask.value.days.sort((a, b) => days.indexOf(a) - days.indexOf(b));
  } else {
    newTask.value.days.splice(index, 1);
  }
};

const toggleEditDay = (day: string) => {
  const index = editingTask.value.days.indexOf(day);
  if (index === -1) {
    editingTask.value.days.push(day);
    editingTask.value.days.sort((a, b) => days.indexOf(a) - days.indexOf(b));
  } else {
    editingTask.value.days.splice(index, 1);
  }
};

const editTask = (task: Task) => {
  editingTask.value = { ...task };
  showEditDialog.value = true;
};

const saveEdit = () => {
  if (editingTask.value.name && editingTask.value.reward) {
    const index = taskStore.tasks.findIndex(t => t.id === editingTask.value.id);
    if (index !== -1) {
      taskStore.tasks[index] = editingTask.value;
    }
    showEditDialog.value = false;
  }
};

const addTask = () => {
  if (!newTask.value.name || !newTask.value.reward) return;
  
  taskStore.addTask({
    id: uuidv4(),
    ...newTask.value,
    completed: {}
  });
  
  showDialog.value = false;
  // Reset form
  newTask.value = {
    name: '',
    icon: 'lucide:check',
    reward: 0,
    days: [...days]
  };
};

const toggleComplete = (task: Task) => {
  if (task.isCompleted) {
    taskStore.uncompleteTask(task.id);
  } else {
    taskStore.completeTask(task.id);
  }
};
</script>
