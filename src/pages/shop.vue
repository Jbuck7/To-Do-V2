<template>
  <div class="flex justify-center items-center w-screen h-screen -mt-16">
    <RewardsRewardsShop :points="taskStore.points" @purchase-reward="handleRewardPurchase" />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/tasks';
import RewardsRewardsShop from '~/components/rewards/rewards-shop.vue';

const taskStore = useTaskStore();

const handleRewardPurchase = (reward: { cost: number }) => {
  if (taskStore.points >= reward.cost) {
    taskStore.points -= reward.cost;
  }
};
</script> 