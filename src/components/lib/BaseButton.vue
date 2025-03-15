<script setup lang="ts">
interface Colors {
  background?: string
  border?: string
  text?: string
}

interface Props {
  id?: string
  name?: string
  colors?: Colors
}

const { id = 'button-' + Math.floor(1000 + Math.random() * 9000), colors } =
  defineProps<Props>()

const emit = defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <button
    :id="id"
    class="inline-block cursor-pointer rounded-sm px-3 py-1.5 text-center text-sm font-semibold shadow-[0_.2rem_0.3rem_-.25rem_black] transition duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-[1px] active:shadow-none"
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
