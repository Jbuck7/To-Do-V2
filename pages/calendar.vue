<template>
  <div class="h-[calc(100vh-5rem)] max-w-7xl mx-auto p-2">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow h-full flex flex-col">
      <!-- Calendar Header -->
      <div class="px-2 py-1 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-sm font-semibold text-gray-800 dark:text-white">
          {{ currentMonthYear }}
        </h2>
        <div class="flex gap-0.5">
          <button 
            @click="previousMonth" 
            class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>
          <button 
            @click="nextMonth" 
            class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <!-- Calendar Grid -->
      <div class="flex-1 grid grid-rows-[auto_1fr] p-0.5">
        <!-- Days of Week -->
        <div class="grid grid-cols-7 gap-0.5">
          <div 
            v-for="day in daysOfWeek" 
            :key="day"
            class="text-center text-[10px] font-medium text-gray-600 dark:text-gray-400 py-0.5"
          >
            {{ day }}
          </div>
        </div>
        
        <!-- Calendar Days -->
        <div class="grid grid-cols-7 grid-rows-6 gap-0.5">
          <div 
            v-for="{ date, isCurrentMonth, tasks } in calendarDays" 
            :key="date.toISOString()"
            class="border border-gray-200 dark:border-gray-700 rounded p-0.5 flex flex-col min-h-[2.5rem]"
            :class="{
              'bg-gray-50 dark:bg-gray-900': !isCurrentMonth,
              'bg-white dark:bg-gray-800': isCurrentMonth
            }"
          >
            <div class="text-[10px] font-medium" :class="{
              'text-gray-400 dark:text-gray-600': !isCurrentMonth,
              'text-gray-900 dark:text-white': isCurrentMonth
            }">
              {{ date.getDate() }}
            </div>
            <div class="flex-1 overflow-y-auto space-y-0.5 mt-0.5 scrollbar-none">
              <div 
                v-for="task in tasks" 
                :key="task.id"
                class="text-[8px] leading-tight px-0.5 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 truncate"
                :class="{ 'line-through opacity-50': task.isCompleted }"
              >
                {{ task.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '~/stores/tasks';

const taskStore = useTaskStore();
const currentDate = ref(new Date());

// Load data from localStorage on mount
onMounted(() => {
  taskStore.loadFromLocalStorage();
});

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  // Get first day of month and last day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Get days from previous month to fill first week
  const daysFromPrevMonth = firstDay.getDay();
  const prevMonth = new Date(year, month - 1);
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // Add days from previous month
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, daysInPrevMonth - i);
    days.push({
      date,
      isCurrentMonth: false,
      tasks: taskStore.getTasksForDate(date)
    });
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      tasks: taskStore.getTasksForDate(date)
    });
  }
  
  // Add days from next month to fill last week
  const daysFromNextMonth = 42 - days.length; // 42 = 6 weeks * 7 days
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
      tasks: taskStore.getTasksForDate(date)
    });
  }
  
  return days;
});

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1
  );
};
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style> 