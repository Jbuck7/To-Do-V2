<template lang="html">
  <div class="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 mb-4 bg-white dark:bg-gray-800"
       :class="{ 'opacity-75': isCompleted }">
    <div class="flex items-center gap-4">
      <Icon :name="icon" class="text-2xl dark:text-white" />
      <h3 class="font-bold dark:text-white">{{ name }}</h3>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="font-bold dark:text-white">{{ reward }}</span>
        <Icon name="lucide:gem" class="text-xl text-yellow-500" />
      </div>
      <button 
        class="px-4 py-2 rounded-lg flex items-center gap-2" 
        :class="isCompleted ? 
          'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 
          'bg-green-700 dark:bg-green-600 text-white hover:bg-green-800 dark:hover:bg-green-700'"
        @click="$emit('task-complete')"
      >
        <Icon :name="isCompleted ? 'lucide:rotate-ccw' : 'lucide:check'" class="text-xl" />
        {{ isCompleted ? 'Undo' : 'Complete' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  icon: string;
  reward: number;
  isCompleted: boolean;
}>();

defineEmits(['task-complete']);
</script>
