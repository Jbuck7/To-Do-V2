<template>  
  <div class="ToDoItem">
    <div class="ToDoItemHeader">
      <h3 class="ToDoItemTitle">{{ task.title }}</h3>

      <span class="ToDoItemCountdown"></span>
    </div>
    <div class="ToDoItemBody">
      <p class="ToDoItemDescription">{{ task.description }}</p>
      <input type="checkbox" class="ToDoItemCompleteSelect" v-model="task.status" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['task']);
</script>