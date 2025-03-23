<script setup lang="ts">
import BaseButton from '@/components/lib/BaseButton.vue'
import BaseToggle from '@/components/lib/BaseToggleSwitch.vue'
import type { JokeValidType } from '@/types/joke'
import { computed, ref } from 'vue'

interface Props {
  currentJokeType: JokeValidType
}

const defaultJokeType: JokeValidType = 'random'
const { currentJokeType = defaultJokeType } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'onJobsFetchRequest', event: Event): void
  (e: 'onJokeTypeUpdate', jokeType: JokeValidType): void
}>()

const inputToggleSwitchValue = computed<boolean>(
  () => currentJokeType !== defaultJokeType
)

const inputToggleSwitchLabel = ref('Programming jokes only')

const onToggleChanged = (newValue: boolean | undefined) => {
  if (newValue !== undefined) {
    emit('onJokeTypeUpdate', newValue ? 'programming' : 'random')
  }
}

const inputToggleSwitchColors = {
  thumb: 'var(--color-accent)',
  border: 'var(--color-accent)',
}

const fetchJokesColors = { background: 'var(--color-accent-dark)' }

const onButtonClicked = (event: Event) => {
  emit('onJobsFetchRequest', event)
}
</script>

<template>
  <div class="container mx-auto flex flex-col items-center">
    <div class="flex w-full justify-center gap-4 align-middle">
      <BaseToggle
        :modelValue="inputToggleSwitchValue"
        @update:modelValue="onToggleChanged"
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
