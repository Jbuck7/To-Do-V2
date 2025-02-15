<template lang="html">
  <div :class="{ 'bg-green-100': isCompleted }"
    class="card flex items-center flex-row gap-10 max-w-xl w-screen h p-5 rounded-lg border-2 border-gray-300">
    <Icon :name="icon" />
    <h1 class="text-xl font-bold">{{ name }}</h1>
    <div class="ml-auto p-2 flex items-center gap-2">
      <span>{{ reward }}</span>
      <Icon name="lucide:gem" />
      <button :class="{ 'bg-gray-400': isCompleted, 'bg-green-700': !isCompleted }"
        class="ml-auto text-white rounded-xl w-14 h-10" @click="taskComplete">
        <Icon :name="buttonIcon" class="text-white" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  name: {
    type: String,
    default: "Task Name",
  },
  icon: {
    type: String,
    default: "tdesign:apple",
  },
  reward: {
    type: Number,
    default: 1000,
  },
});
const isCompleted = ref(false);

const buttonIcon = computed(() => {
  return isCompleted.value ? "material-symbols:undo" : "lucide:check";
});

const emit = defineEmits(["taskComplete"]);

const taskComplete = () => {
  emit("taskComplete", props.reward);
  isCompleted.value = !isCompleted.value;
};
</script>
