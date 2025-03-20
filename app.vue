<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <SharedNavMenu />
    <main class="pt-4">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import SharedNavMenu from '~/components/shared/nav-menu.vue';
</script>
