<template lang="html">
  <div class="card flex flex-col max-w-xl w-screen rounded-t-lg max-h-96">  
    <ListsTaskHeader />

  <div
    class=" flex justify-center items-center flex-col gap-10 max-w-xl w-screen bg-white shadow-lg p-5 rounded-lg max-h-96"
  >

    <div class="flex flex-col gap-5">
      <listsTaskItem
        v-for="(task, index) in tasks"
        :key="index"
        :name="task.name"
        :icon="task.icon"
        :reward="task.reward"
        @task-complete="handleTaskComplete"
      />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tasks = ref([
  {
    name: "Task 1",
    icon: "tdesign:apple",
    reward: 1000,
  },
  {
    name: "Task 2",
    icon: "tdesign:apple",
    reward: 2000,
  },
  {
    name: "Task 3",
    icon: "tdesign:apple",
    reward: 3000,
  },
]);

const handleTaskComplete = (reward: number) => {
  console.log(`Task completed with reward: ${reward}`);
};
</script>
