<script setup lang="ts">
import BaseButton from '@/components/lib/BaseButton.vue'
</script>

<template>
  <section class="bg-background-light dark:bg-gray-900">
    <div class="container mx-auto flex min-h-screen items-center px-6 py-12">
      <div>
        <p class="text-secondary text-sm font-medium">404 error</p>
        <h1
          class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white"
        >
          JokeBox can’t recognize this coin
        </h1>
        <p class="mt-4 text-gray-500 dark:text-gray-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div class="mt-6 flex items-center gap-x-3">
          <BaseButton @click="$router.push({ name: 'home' })">
            Take me home
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
