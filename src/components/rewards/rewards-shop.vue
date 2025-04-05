<template lang="html">
  <div class="card flex flex-col max-w-2xl w-screen">
    <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm rounded-t-lg">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Rewards Shop</h2>
      </div>
      <div class="flex gap-2">
        <button class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg" @click="showEditor = true">
          <Icon name="lucide:edit-2" class="text-xl" />
        </button>
        <button class="text-white rounded-xl w-10 h-10 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700" @click="showDialog = true">
          <Icon name="lucide:plus" class="text-white" />
        </button>
      </div>
    </div>

    <div class="flex justify-center items-center flex-col max-w-2xl w-screen bg-white dark:bg-gray-800 shadow-lg rounded-b-lg h-screen max-h-[500px]">
      <ScrollPanel style="width: 100%; height: 100%;" class="w-full">
        <div class="px-5">
          <div v-if="rewardsStore.rewards.length === 0" class="flex flex-col items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
            <Icon name="lucide:gift" class="text-6xl mb-4" />
            <p class="text-xl">No rewards available. Click the + button to add some rewards!</p>
          </div>
          <div v-else class="grid grid-cols-1 gap-4 py-4">
            <div v-for="reward in rewardsStore.rewards" :key="reward.id" 
              class="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
              <div class="flex items-center gap-4">
                <Icon :name="reward.icon" class="text-2xl dark:text-white" />
                <h3 class="font-bold dark:text-white">{{ reward.name }}</h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-bold dark:text-white">{{ reward.cost }}</span>
                <Icon name="lucide:gem" class="text-xl text-yellow-500" />
                <button 
                  class="px-4 py-2 bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-600"
                  :disabled="rewardsStore.points < reward.cost"
                  @click="purchaseReward(reward)"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollPanel>
    </div>

    <Dialog v-model:visible="showDialog" modal header="Add Reward" :style="{ width: '50vw' }" class="dark:bg-gray-800">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Name</label>
          <InputText v-model="newReward.name" placeholder="Reward name" class="dark:bg-gray-700 dark:text-white" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Icon</label>
          <SharedIconSelector v-model="newReward.icon" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Cost</label>
          <InputNumber v-model="newReward.cost" placeholder="Points" class="dark:bg-gray-700 dark:text-white" />
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
            @click="addReward"
          >
            Add Reward
          </button>
        </div>
      </template>
    </Dialog>

    <RewardsRewardEditor 
      v-model:visible="showEditor" 
      :rewards="rewardsStore.rewards" 
      @delete-reward="handleDeleteReward" 
      @edit-reward="handleEditReward"
      @delete-all="handleDeleteAll"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import SharedIconSelector from '../shared/icon-selector.vue';
import RewardsRewardEditor from './reward-editor.vue';
import { v4 as uuidv4 } from 'uuid';
import { useRewardsStore } from '../../stores/rewards';
import type { Reward } from '../../types/RewardType';

const rewardsStore = useRewardsStore();
const showDialog = ref(false);
const showEditor = ref(false);

// Load data from localStorage on client-side only
onMounted(() => {
  rewardsStore.loadFromLocalStorage();
});

const newReward = ref<Reward>({
  id: '',
  name: '',
  icon: '',
  cost: 0,
  purchased: {}
});

const addReward = () => {
  if (!newReward.value.name || !newReward.value.cost) return;
  
  rewardsStore.addReward({ 
    ...newReward.value,
    id: uuidv4(),
    icon: newReward.value.icon || 'lucide:gift' // Default to gift icon if none selected
  });
  showDialog.value = false;
  // Reset form
  newReward.value = {
    id: '',
    name: '',
    icon: '',
    cost: 0,
    purchased: {}
  };
};

const purchaseReward = (reward: Reward) => {
  rewardsStore.purchaseReward(reward.id);
};

const handleDeleteReward = (rewardToDelete: Reward) => {
  rewardsStore.deleteReward(rewardToDelete.id);
};

const handleEditReward = (rewardToEdit: Reward) => {
  rewardsStore.editReward(rewardToEdit);
};

const handleDeleteAll = () => {
  rewardsStore.deleteAllRewards();
};
</script> 