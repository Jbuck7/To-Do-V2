<script setup>
const props = defineProps(['tasks']);
import ToDoItem from './ToDoItem.vue';
</script>

<template>
  <div class ="ToDoList">
    <h1>My Tasks</h1>
    <div class = ToDoList-Body> 
    <ul>
      <ToDoItem v-for="(task, index) in tasks" :key="index" :task="task" />
    </ul>
    </div>
  </div>

</template>
