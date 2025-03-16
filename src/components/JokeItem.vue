<script setup lang="ts">
import type { Joke } from '@/types/joke'
import { computed, ref, watch } from 'vue'
import IconHeart from './icons/IconHeart.vue'
import BaseButton from './lib/BaseButton.vue'

interface Props {
  joke: Joke
  visiblePunchline?: boolean
  saved?: boolean
}

const { visiblePunchline = false, saved = false } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'onPunchlineRevealed'): void
  (e: 'onSave', isSaved: boolean): void
}>()

const isPunchlineVisible = ref(visiblePunchline)
const isSaved = ref(saved)

const saveButtonColors = computed(() => ({
  background: 'var(--color-white)',
  border: 'var(--color-zinc-900)',
}))

const saveJoke = () => {
  emit('onSave', !isSaved.value)
}

const showPunchline = () => {
  emit('onPunchlineRevealed')
}

watch(
  () => visiblePunchline,
  (newValue: boolean) => {
    isPunchlineVisible.value = newValue
  }
)

watch(
  () => saved,
  (newValue: boolean) => {
    isSaved.value = newValue
  }
)
</script>

<template>
  <div
    class="joke bg-background-dark mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-lg border-2 border-gray-200 p-4 shadow-md transition-shadow duration-250 hover:shadow-lg md:flex-row md:gap-2"
  >
    <div class="flex-grow">
      <h4
        class="joke__setup text-center text-2xl font-semibold text-gray-500 md:text-left"
      >
        {{ joke.setup }}
      </h4>

      <p class="joke__punchline text-center text-gray-600 md:text-left">
        <a href="#" v-if="!isPunchlineVisible" @click="showPunchline"> Show </a>

        <transition
          enter-active-class="duration-250 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <span v-if="isPunchlineVisible">
            {{ joke.punchline }}
          </span>
        </transition>
      </p>
    </div>

    <div v-if="isPunchlineVisible" class="min-w-[35px] flex-shrink-0">
      <BaseButton
        class="transition-colors duration-300 ease-in-out"
        type="icon"
        :colors="saveButtonColors"
        :title="isSaved ? 'Remove from Favorites' : 'Save to Favorites'"
        @click="saveJoke"
      >
        <IconHeart :color="isSaved ? 'red' : 'black'" />
      </BaseButton>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
