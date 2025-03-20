<template lang="html">
  <div class="grid grid-cols-6 gap-2 p-2 border dark:border-gray-700 rounded-lg">
    <button
      v-for="icon in availableIcons"
      :key="icon"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
      :class="{ 'bg-green-100 dark:bg-green-900 border-2 border-green-500 dark:border-green-400': modelValue === icon }"
      @click="$emit('update:modelValue', icon)"
    >
      <Icon :name="icon" class="text-2xl dark:text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const availableIcons = [
  'lucide:gift',
  'lucide:check',
  'lucide:coffee',
  'lucide:ice-cream',
  'lucide:gamepad',
  'lucide:tv',
  'lucide:book',
  'lucide:music',
  'lucide:shopping-bag',
  'lucide:heart',
  'lucide:star',
  'lucide:target',
  'lucide:flag',
  'lucide:dumbbell',
  'lucide:pen-tool',
  'lucide:code',
  'lucide:book-open',
  'lucide:phone',
  'lucide:mail',
  'lucide:calendar',
  'lucide:clock',
  'lucide:bell',
  'lucide:settings',
  'lucide:help-circle',
  'lucide:thumbs-up',
  'lucide:smile',
  'lucide:lightbulb',
  'lucide:rocket',
  'lucide:clipboard-list',
  'lucide:clipboard-check',


];
</script> 