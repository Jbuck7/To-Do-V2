<template lang="html">
    <div
        class="card flex justify-center items-center flex-col gap-10 max-w-xl w-screen h-auto bg-white shadow-lg p-5 rounded-lg">
        <DataView :value="tasks" layout="list" data-key="name">
            <template #header>
                <h1 class="text-2xl font-bold">Today's Tasks</h1>
            </template>
            <template #list="slotProps">
                <div v-for="item in slotProps.items" :key="item.name" class="my-3">
                    <TaskItem :name="item.name" :icon="item.icon" :reward="item.reward" />
                </div>
            </template>
        </DataView>
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
</script>