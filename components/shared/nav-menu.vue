<template lang="html">
  <nav class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-800 dark:text-white">
            Do
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <div class="flex items-center gap-4">
            <NuxtLink 
              to="/" 
              class="px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="$route.path === '/' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'"
            >
              <Icon name="lucide:list-todo" class="text-xl" />
              <span>Today's Tasks</span>
            </NuxtLink>
            <NuxtLink 
              to="/shop" 
              class="px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="$route.path === '/shop' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'"
            >
              <Icon name="lucide:gift" class="text-xl" />
              <span>Shop</span>
            </NuxtLink>
            <NuxtLink 
              to="/calendar" 
              class="px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="$route.path === '/calendar' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'"
            >
              <Icon name="lucide:calendar" class="text-xl" />
              <span>Calendar</span>
            </NuxtLink>
            <NuxtLink 
              to="/pomodoro" 
              class="px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="$route.path === '/pomodoro' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'"
            >
              <Icon name="lucide:timer" class="text-xl" />
              <span>Pomodoro</span>
            </NuxtLink>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 ml-8 border-l border-gray-200 dark:border-gray-700">
            <span class="font-bold text-gray-800 dark:text-white">{{ taskStore.points }}</span>
            <Icon name="lucide:gem" class="text-xl text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/tasks';

const taskStore = useTaskStore();
</script> 