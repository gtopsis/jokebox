<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './lib/BaseButton.vue'
import BaseToggle from './lib/BaseToggleSwitch.vue'

const emit = defineEmits<{ (e: 'onJobsFetchRequested', event: Event): void }>()

const inputToggleSwitchLabel = ref('Programming jokes only')
const inputToggleSwitchValue = ref(true)

const inputToggleSwitchColors = {
  thumb: 'var(--color-accent)',
  border: 'var(--color-accent)',
}

const fetchJokesColors = { background: 'var(--color-accent)' }

const onButtonClicked = (event: Event) => {
  emit('onJobsFetchRequested', event)
}
</script>

<template>
  <div class="container mx-auto flex flex-col items-center">
    <div class="flex w-full justify-center gap-4 pt-4 align-middle">
      <BaseToggle
        v-model="inputToggleSwitchValue"
        class="mr-4 block"
        :label="inputToggleSwitchLabel"
        :checkedColors="inputToggleSwitchColors"
      />
      <BaseButton
        class="ml-2 block"
        :colors="fetchJokesColors"
        @click="onButtonClicked"
      >
        Get new jokes
      </BaseButton>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
