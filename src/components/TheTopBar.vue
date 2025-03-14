<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  title: string
  routeName: string
}

const navItems = ref<NavItem[]>([
  { title: 'New', routeName: 'home' },
  { title: 'Favorites', routeName: 'home' },
])
</script>

<template>
  <nav class="container mx-auto flex items-center justify-center">
    <routerLink
      :to="{ name: navItems[0].routeName }"
      class="text-primary hover:border-b-primary border-b-2 border-transparent px-2 py-2 font-bold no-underline transition-[border]"
    >
      New Jokes
    </routerLink>

    <routerLink
      :to="{ name: navItems[0].routeName }"
      class="title mx-4 border-b-2 border-transparent px-4 py-2 font-bold no-underline hover:border-b-2"
    >
      <span class="text-accent text-3xl font-bold">JokeBox</span>
    </routerLink>

    <routerLink
      :to="{ name: navItems[1].routeName }"
      class="text-primary hover:border-b-primary border-b-2 border-transparent px-2 py-2 font-bold no-underline"
      >Favorites</routerLink
    >
  </nav>
</template>

<style lang="css" scoped>
nav a:not(.title).router-link-active {
  width: auto;
  border-bottom: 2px solid var(--color-primary);
}

nav a:hover {
  width: auto;
}

nav a:nth-child(2) {
  width: auto;
}
</style>
