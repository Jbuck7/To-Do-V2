<template lang="html">
  <Dialog :visible="isVisible" @update:visible="$emit('update:visible', $event)" modal header="Edit Rewards" :style="{ width: '80vw' }" class="dark:bg-gray-800">
    <div class="flex flex-col gap-4">
      <div v-if="rewards.length === 0" class="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        <Icon name="lucide:gift" class="text-6xl mb-4" />
        <p class="text-xl">No rewards added yet. Click the + button to add one!</p>
      </div>
      <div v-else class="grid gap-4">
        <div v-for="(reward, index) in rewards" :key="index"
          class="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <div class="flex items-center gap-4">
            <Icon :name="reward.icon" class="text-2xl dark:text-white" />
            <h3 class="font-bold dark:text-white">{{ reward.name }}</h3>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="font-bold dark:text-white">{{ reward.cost }}</span>
              <Icon name="lucide:gem" class="text-xl text-yellow-500" />
            </div>
            <button 
              class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
              @click="editReward(reward)"
            >
              <Icon name="lucide:edit-2" class="text-xl" />
            </button>
            <button 
              class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              @click="deleteReward(reward)"
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

interface Reward {
  name: string;
  icon: string;
  cost: number;
}

const props = defineProps<{
  visible: boolean;
  rewards: Reward[];
}>();

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
});

const emit = defineEmits(['update:visible', 'delete-reward', 'edit-reward']);

const editReward = (reward: Reward) => {
  emit('edit-reward', reward);
};

const deleteReward = (reward: Reward) => {
  emit('delete-reward', reward);
};
</script> 