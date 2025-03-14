<script setup lang="ts">
import TheTopBar from '../components/TheTopBar.vue'
</script>

<template>
  <div class="relative flex h-screen w-full flex-col">
    <header class="bg-background-light sticky top-0 w-full">
      <slot name="header">
        <TheTopBar />
      </slot>
    </header>

    <main class="w-full flex-1 overflow-y-auto">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="css" scoped></style>
