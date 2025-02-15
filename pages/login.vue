<template lang="html">
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div
      class="card flex justify-center items-center flex-col gap-10 max-w-xl w-screen h-96 bg-white shadow-lg p-5 rounded-lg"
    >
      <FloatLabel>
        <InputText id="username" v-model="username" />
        <label for="username">Username</label>
      </FloatLabel>
      <FloatLabel>
        <Password id="password" v-model="password" :feedback="false" />
        <label for="password">Password</label>
      </FloatLabel>
      <Button label="Login" @click="$router.push('/home')" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const username = ref(null);
const password = ref(null);
</script>
