<script setup lang="ts">
import TheTopBar from '@/components/TheTopBar.vue'
</script>

<template>
  <div class="relative mx-auto flex flex-col">
    <header class="bg-background-light sticky top-0 w-full">
      <slot name="header">
        <TheTopBar />
      </slot>
    </header>

    <main class="min-h-[85vh] w-full flex-1 grow">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="css" scoped></style>
