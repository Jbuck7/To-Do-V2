<template lang="html">
  <div class="card flex flex-col max-w-2xl w-screen">
    <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm rounded-t-lg">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Your Rewards</h2>
    </div>

    <div class="flex justify-center items-center flex-col max-w-2xl w-screen bg-white dark:bg-gray-800 shadow-lg rounded-b-lg p-4">
      <div class="flex items-center gap-4 mb-6">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold dark:text-white">{{ rewardsStore.points }}</span>
          <Icon name="lucide:gem" class="text-3xl text-yellow-500" />
        </div>
        <span class="text-gray-600 dark:text-gray-400">points available</span>
      </div>

      <div v-if="rewardsStore.recentlyPurchased.length === 0" class="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        <Icon name="lucide:gift" class="text-6xl mb-4" />
        <p class="text-xl">You haven't purchased any rewards today.</p>
      </div>
      <div v-else class="w-full">
        <h3 class="text-lg font-semibold mb-4 dark:text-white">Recently Purchased</h3>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="reward in rewardsStore.recentlyPurchased" :key="reward.id" 
            class="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <div class="flex items-center gap-4">
              <Icon :name="reward.icon" class="text-2xl dark:text-white" />
              <h3 class="font-bold dark:text-white">{{ reward.name }}</h3>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-bold dark:text-white">{{ reward.cost }}</span>
              <Icon name="lucide:gem" class="text-xl text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRewardsStore } from '../../stores/rewards';

const rewardsStore = useRewardsStore();

onMounted(() => {
  rewardsStore.loadFromLocalStorage();
});
</script> 