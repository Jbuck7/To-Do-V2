<template>
<div>
  <ToDoList :tasks="tasks"></ToDoList>
</div>
</template>

<script setup>
import ToDoList from './components/ToDoList.vue';


const tasks = [
  {
    title: 'Morning Exercise',
    description: '30 minutes of yoga or jogging',
    value: 10.5,
    occurrence: 'DAILY',
    status: false,
    streak: 5,
  },
  {
    title: 'Learn a New Language',
    description: '30 minutes of language learning on Duolingo',
    value: 5.25,
    occurrence: 'WEEKLY',
    status: false,
    streak: 2,
  },
  {
    title: 'Meditation Practice',
    description: '10 minutes of meditation using Headspace',
    value: 7.75,
    occurrence: 'MONTHLY',
    status: false,
    streak: 10,
  },
]

</script>