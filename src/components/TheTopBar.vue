<script setup lang="ts">
interface NavItem {
  title: string
  routeName: string
}

const navItems: NavItem[] = [
  { title: 'New', routeName: 'home' },
  { title: 'Favorites', routeName: 'favorites' },
]
</script>

<template>
  <nav class="container mx-auto flex items-center justify-center">
    <RouterLink
      :to="{ name: navItems[0].routeName }"
      class="text-accent hover:border-b-accent border-b-2 border-transparent px-2 py-2 text-[1.1rem] font-bold no-underline transition-[border]"
    >
      New Jokes
    </RouterLink>

    <RouterLink
      :to="{ name: navItems[0].routeName }"
      class="title mx-4 border-b-2 border-transparent px-4 py-2 font-bold no-underline hover:border-b-2"
    >
      <strong class="font-bellota text-text-secondary text-4xl font-bold"
        >JokeBox</strong
      >
    </RouterLink>

    <RouterLink
      :to="{ name: navItems[1].routeName }"
      class="text-accent hover:border-b-accent border-b-2 border-transparent px-2 py-2 text-[1.1rem] font-bold no-underline transition-[border]"
      >Favorites</RouterLink
    >
  </nav>
</template>

<style lang="css" scoped>
nav a:not(.title).router-link-active {
  border-bottom-color: var(--color-accent);
}

nav a:hover {
  width: auto;
}

nav a:nth-child(2) {
  width: auto;
}
</style>
