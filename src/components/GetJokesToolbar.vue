<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { computed, ref } from 'vue'
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

const numberOfJokes = ref(0)
const jokesFetchedLastDate = ref<string | null>(null)

const getUpdatedTimeAgoText = computed(() => {
  return jokesFetchedLastDate.value
    ? numberOfJokes.value +
        ' jokes has been fetched ' +
        formatDistanceToNow(jokesFetchedLastDate.value) +
        ' ago'
    : 'No Jokes yet :('
})
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

    <p class="mt-4 mb-0 block w-auto text-xs text-black">
      {{ getUpdatedTimeAgoText }}
    </p>
  </div>
</template>

<style lang="css" scoped></style>
