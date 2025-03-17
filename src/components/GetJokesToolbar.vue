<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseButton from './lib/BaseButton.vue'
import BaseToggle from './lib/BaseToggleSwitch.vue'

const emit = defineEmits<{
  (e: 'onJobsFetchRequest', event: Event): void
  (e: 'onFilterUpdate', value: boolean): void
}>()

const inputToggleSwitchLabel = ref('Programming jokes only')
const inputToggleSwitchValue = ref(false)
watch(inputToggleSwitchValue, (newValue: boolean) => {
  emit('onFilterUpdate', newValue)
})

const inputToggleSwitchColors = {
  thumb: 'var(--color-accent)',
  border: 'var(--color-accent)',
}

const fetchJokesColors = { background: 'var(--color-accent)' }

const onButtonClicked = (event: Event) => {
  emit('onJobsFetchRequest', event)
}
</script>

<template>
  <div class="container mx-auto flex flex-col items-center">
    <div class="flex w-full justify-center gap-4 align-middle">
      <BaseToggle
        v-model="inputToggleSwitchValue"
        class="mr-4 block"
        :label="inputToggleSwitchLabel"
        labelColor="var(--color-text-primary)"
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
