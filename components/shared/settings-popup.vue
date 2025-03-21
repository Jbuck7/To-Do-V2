<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    modal
    :style="{ width: '450px' }"
    header="Settings"
    :closable="true"
    class="p-fluid"
  >
    <div class="flex flex-col gap-4">
      <div class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 p-3 rounded-lg flex items-center gap-2">
        <Icon name="lucide:construction" class="text-lg" />
        <span>This menu is under development and does not affect any settings yet.</span>
      </div>
      <div class="flex flex-col gap-2">
        <label class="dark:text-white">Theme</label>
        <Dropdown
          v-model="theme"
          :options="['Light', 'Dark', 'System']"
          placeholder="Select Theme"
          class="w-full"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="dark:text-white">Notifications</label>
        <div class="flex items-center gap-2">
          <Checkbox v-model="notifications" :binary="true" />
          <span class="dark:text-white">Enable notifications</span>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="dark:text-white">Sound Effects</label>
        <div class="flex items-center gap-2">
          <Checkbox v-model="soundEffects" :binary="true" />
          <span class="dark:text-white">Enable sound effects</span>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="dark:text-white">Language</label>
        <Dropdown
          v-model="language"
          :options="['English', 'Spanish', 'French']"
          placeholder="Select Language"
          class="w-full"
        />
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" icon="pi pi-times" @click="emit('update:visible', false)" text />
        <Button label="Save" icon="pi pi-check" @click="saveSettings" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

const theme = ref('System');
const notifications = ref(true);
const soundEffects = ref(true);
const language = ref('English');

const saveSettings = () => {
  // TODO: Implement settings save logic
  console.log('Saving settings:', {
    theme: theme.value,
    notifications: notifications.value,
    soundEffects: soundEffects.value,
    language: language.value
  });
  emit('update:visible', false);
};
</script> 