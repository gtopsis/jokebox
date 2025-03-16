<script setup lang="ts">
interface Colors {
  background?: string
  border?: string
  text?: string
}

type ButtonType = 'regular' | 'icon'

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
    class="inline-block cursor-pointer text-center text-sm font-semibold shadow-[0_.2rem_0.3rem_-.25rem_black] transition-transform duration-250 hover:scale-105 focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-[1px] active:shadow-none"
    :title="title"
    :style="{
      backgroundColor: colors?.background ?? 'var(--color-zinc-900)',
      color: colors?.text ?? 'var(--color-white)',
      borderColor: colors?.border ?? 'var(--color-zinc-900)',
      borderRadius: type === 'icon' ? '100%' : 'var(--radius-sm)',
      padding: type === 'icon' ? '0.5rem' : '0.5rem 1rem',
    }"
    @click="emit('click', $event)"
  >
    <slot> </slot>
  </button>
</template>

<style lang="css" scoped></style>
