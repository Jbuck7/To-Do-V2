<template lang="html">
  <div>
    <Dialog :visible="isVisible" @update:visible="$emit('update:visible', $event)" modal header="Edit Rewards" :style="{ width: '80vw' }" class="dark:bg-gray-800">
      <div class="flex flex-col gap-4">
        <div v-if="rewards.length === 0" class="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
          <Icon name="lucide:gift" class="text-6xl mb-4" />
          <p class="text-xl">No rewards added yet. Click the + button to add one!</p>
        </div>
        <div v-else>
          <div class="flex justify-end mb-4">
            <button 
              class="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 flex items-center gap-2"
              @click="confirmDeleteAll"
            >
              <Icon name="lucide:trash-2" />
              Delete All
            </button>
          </div>
          <div class="grid gap-4">
            <div v-for="reward in rewards" :key="reward.id"
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
                  @click="openEditDialog(reward)"
                >
                  <Icon name="lucide:edit-2" class="text-xl" />
                </button>
                <button 
                  class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  @click="confirmDelete(reward)"
                >
                  <Icon name="lucide:trash-2" class="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <!-- Edit Dialog -->
    <Dialog v-model:visible="showEditDialog" modal header="Edit Reward" :style="{ width: '50vw' }" class="dark:bg-gray-800">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Name</label>
          <InputText v-model="editingReward.name" placeholder="Reward name" class="dark:bg-gray-700 dark:text-white" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Icon</label>
          <SharedIconSelector v-model="editingReward.icon" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="dark:text-white">Cost</label>
          <InputNumber v-model="editingReward.cost" placeholder="Points" class="dark:bg-gray-700 dark:text-white" />
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
import { ref, computed } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import SharedIconSelector from '../shared/icon-selector.vue';
import type { Reward } from '../../types/RewardType';

const props = defineProps<{
  visible: boolean;
  rewards: Reward[];
}>();

const emit = defineEmits(['update:visible', 'delete-reward', 'edit-reward', 'delete-all']);

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
});

const showEditDialog = ref(false);
const editingReward = ref<Reward>({
  id: '',
  name: '',
  icon: '',
  cost: 0,
  purchased: {}
});

const confirm = useConfirm();

const openEditDialog = (reward: Reward) => {
  editingReward.value = { ...reward };
  showEditDialog.value = true;
};

const saveEdit = () => {
  if (editingReward.value.name && editingReward.value.cost) {
    emit('edit-reward', editingReward.value);
    showEditDialog.value = false;
  }
};

const confirmDelete = (reward: Reward) => {
  confirm.require({
    message: `Are you sure you want to delete "${reward.name}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      emit('delete-reward', reward);
    }
  });
};

const confirmDeleteAll = () => {
  confirm.require({
    message: 'Are you sure you want to delete all rewards? This cannot be undone.',
    header: 'Confirm Delete All',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      emit('delete-all');
    }
  });
};
</script> 