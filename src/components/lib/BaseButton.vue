<script setup lang="ts">
type ButtonType = 'regular' | 'icon' | 'text'
interface Colors {
  background?: string
  border?: string
  text?: string
}

interface Props {
  id?: string
  type?: ButtonType
  name?: string
  colors?: Colors
  title?: string
}

const {
  id = 'button-' + Math.floor(1000 + Math.random() * 9000),
  colors,
  type = 'regular',
} = defineProps<Props>()

const emit = defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <button
    :id="id"
    class="inline-block cursor-pointer text-center text-sm font-semibold transition-transform duration-250 hover:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-[1px] active:shadow-none"
    :title="type === 'icon' ? title : undefined"
    :aria-label="title"
    :class="{
      'shadow-[0_.2rem_0.3rem_-.25rem_black]': type !== 'text',
      'rounded-full p-2': type === 'icon',
      'rounded-md px-4 py-2': type !== 'icon',
    }"
    :style="{
      backgroundColor: colors?.background ?? 'var(--color-zinc-900)',
      color: colors?.text ?? 'var(--color-white)',
      borderColor: colors?.border ?? 'var(--color-zinc-900)',
    }"
    @click="emit('click', $event)"
  >
    <slot> </slot>
  </button>
</template>

<style lang="css" scoped></style>
