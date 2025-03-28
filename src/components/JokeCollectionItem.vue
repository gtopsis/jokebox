<script setup lang="ts">
import IconEye from '@/components/icons/IconEye.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import BaseButton from '@/components/lib/BaseButton.vue'
import type { JokeExtended } from '@/types/joke'
import { computed } from 'vue'

interface Props {
  joke: JokeExtended
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'onPunchlineRevealed'): void
  (e: 'onToggleSave'): void
}>()

const isPunchlineVisible = computed(() => props.joke.visiblePunchline)
const isSaved = computed(() => props.joke.saved)

const saveButtonColors = {
  background: 'var(--color-white)',
  border: 'var(--color-zinc-900)',
}

const saveButtonTitle = computed(() =>
  props.joke.saved ? 'Remove from favorites' : 'Save to Favorites'
)

const saveJokeToFavorites = () => {
  emit('onToggleSave')
}

const showPunchline = () => {
  emit('onPunchlineRevealed')
}
</script>

<template>
  <div
    class="joke bg-background-dark border-border mx-auto flex max-w-4xl flex-col items-center gap-2 rounded-lg border-2 p-4 shadow-md transition-shadow duration-250 hover:shadow-lg md:flex-row md:gap-3"
  >
    <div class="flex-grow">
      <h4
        class="joke__setup text-text-primary mb-2 text-center text-xl font-semibold md:mb-0 md:text-left"
      >
        {{ joke.setup }}
      </h4>

      <p
        class="joke__punchline text-text-primary min-h-7 text-center text-lg md:text-left"
        :class="{
          'translate-y-4': !isPunchlineVisible,
          'opacity-0': !isPunchlineVisible,
          'duration-1000': isPunchlineVisible,
          'duration-200': !isPunchlineVisible,
        }"
      >
        <span v-show="isPunchlineVisible"> {{ joke.punchline }} </span>
      </p>
    </div>

    <div class="min-w-[35px] flex-shrink-0">
      <BaseButton
        v-if="!isPunchlineVisible"
        :colors="{
          background: 'var(--color-accent-dark)',
        }"
        type="icon"
        title="Show punchline"
        @click="showPunchline"
      >
        <IconEye color="var(--color-primary-light)" />
      </BaseButton>

      <BaseButton
        Button
        v-else
        class="transition-colors duration-300 ease-in-out"
        type="icon"
        :colors="saveButtonColors"
        :title="saveButtonTitle"
        @click="saveJokeToFavorites"
      >
        <IconHeart :color="isSaved ? 'red' : 'black'" />
      </BaseButton>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
