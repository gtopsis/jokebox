<script setup lang="ts">
import HomeToolBar from '../components/GetJokesToolbar.vue'
</script>

<template>
  <HomeToolBar @onJobsFetchRequested="($event) => console.log($event)" />
</template>
