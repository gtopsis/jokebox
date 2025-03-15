<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

interface Colors {
  background?: string
  border?: string
  thumb?: string
}

interface Props {
  id?: string
  name?: string
  label?: string
  checkedColors?: Colors
  uncheckedColors?: Colors
  labelColor?: string
}

const {
  id = 'toggle-input-' + Math.floor(1000 + Math.random() * 9000),
  checkedColors,
  uncheckedColors,
  labelColor,
} = defineProps<Props>()

const modelValue = defineModel<boolean>()

defineEmits(['update:checked'])

const inputCheckedStyles = computed<Partial<StyleValue>>(() => {
  return {
    backgroundColor: checkedColors?.background ?? 'var(--color-white)',
    borderColor: checkedColors?.border ?? 'var(--color-zinc-900)',
    // TODO: find what css rule should be set for tailwind class: checked:focus-visible:ring-zinc-900
  }
})

const inputUncheckedStyles = computed<Partial<StyleValue>>(() => {
  return {
    backgroundColor: uncheckedColors?.background ?? 'transparent',
    borderColor: uncheckedColors?.border ?? 'var(--color-zinc-500)',
  }
  // TODO: find what css rule should be set for tailwind class: focus-visible:ring-zinc-400
})

const thumbStyles = computed<Partial<StyleValue>>(() => ({
  backgroundColor: modelValue.value
    ? (checkedColors?.thumb ?? 'var(--color-zinc-900)')
    : (uncheckedColors?.thumb ?? 'var(--color-zinc-400)'),
}))

const inputColorsStyles = computed<Partial<StyleValue>>(() =>
  modelValue.value ? inputCheckedStyles.value : inputUncheckedStyles.value
)

const labelColorStyles = computed<Partial<StyleValue>>(() => ({
  color: labelColor ?? `var(--color-zinc-500)`,
}))
</script>

<template>
  <label
    :for="id"
    class="flex cursor-pointer items-center gap-1.5 text-sm"
    :style="labelColorStyles"
  >
    <div class="relative inline-block h-5">
      <input
        :id="id"
        :name="name"
        type="checkbox"
        v-model="modelValue"
        class="peer h-5 w-8 cursor-pointer appearance-none rounded-full border focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:outline-none checked:focus-visible:ring-zinc-900"
        :style="inputColorsStyles"
      />
      <span
        class="pointer-events-none absolute start-0.75 top-0.75 block size-[0.875rem] rounded-full transition-all duration-200 peer-checked:start-[0.9375rem]"
        :style="thumbStyles"
      ></span>
    </div>

    <slot> {{ label }} </slot>
  </label>
</template>

<style lang="css" scoped></style>
