import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Reward } from '../types/RewardType';

export const useRewardsStore = defineStore('rewards', () => {
  const rewards = ref<Reward[]>([]);
  const points = ref(0);

  // Computed property to get rewards that can be purchased
  const availableRewards = computed(() => {
    return rewards.value.filter(reward => points.value >= reward.cost);
  });

  // Computed property to get recently purchased rewards
  const recentlyPurchased = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return rewards.value.filter(reward => reward.purchased[today]);
  });

  function addReward(reward: Reward) {
    rewards.value.push(reward);
    saveToLocalStorage();
  }

  function purchaseReward(rewardId: string) {
    const reward = rewards.value.find(r => r.id === rewardId);
    if (reward && points.value >= reward.cost) {
      const today = new Date().toISOString().split('T')[0];
      reward.purchased = { ...reward.purchased, [today]: true };
      points.value -= reward.cost;
      saveToLocalStorage();
      return true;
    }
    return false;
  }

  function deleteReward(rewardId: string) {
    const index = rewards.value.findIndex(r => r.id === rewardId);
    if (index !== -1) {
      rewards.value.splice(index, 1);
      saveToLocalStorage();
    }
  }

  function editReward(reward: Reward) {
    const index = rewards.value.findIndex(r => r.id === reward.id);
    if (index !== -1) {
      rewards.value[index] = { ...reward };
      saveToLocalStorage();
    }
  }

  function deleteAllRewards() {
    rewards.value = [];
    saveToLocalStorage();
  }

  function loadFromLocalStorage() {
    if (process.client) {
      const savedRewards = localStorage.getItem('rewards');
      const savedPoints = localStorage.getItem('rewardPoints');
      if (savedRewards) rewards.value = JSON.parse(savedRewards);
      if (savedPoints) points.value = JSON.parse(savedPoints);
    }
  }

  function saveToLocalStorage() {
    if (process.client) {
      localStorage.setItem('rewards', JSON.stringify(rewards.value));
      localStorage.setItem('rewardPoints', JSON.stringify(points.value));
    }
  }

  return {
    rewards,
    points,
    availableRewards,
    recentlyPurchased,
    addReward,
    purchaseReward,
    deleteReward,
    editReward,
    deleteAllRewards,
    loadFromLocalStorage,
    saveToLocalStorage
  };
}); 