<script setup lang="ts">
// Accessibilité A- / A+ : contrôle une échelle typographique. Contrôlé (v-model
// number, en %). L'app applique l'échelle sur <html> et la persiste.
const props = withDefaults(
  defineProps<{ modelValue?: number; min?: number; max?: number; step?: number }>(),
  { modelValue: 100, min: 90, max: 130, step: 10 },
)
const emit = defineEmits<{ 'update:modelValue': [number] }>()

function set(next: number) {
  emit('update:modelValue', Math.min(props.max, Math.max(props.min, next)))
}
</script>

<template>
  <div class="fdc-textsize" role="group" aria-label="Taille du texte">
    <button
      type="button"
      class="fdc-textsize__btn"
      aria-label="Réduire la taille du texte"
      :disabled="modelValue <= min"
      @click="set(modelValue - step)"
    >
      A<span class="fdc-textsize__minus">−</span>
    </button>
    <button
      type="button"
      class="fdc-textsize__btn"
      aria-label="Augmenter la taille du texte"
      :disabled="modelValue >= max"
      @click="set(modelValue + step)"
    >
      A<span class="fdc-textsize__plus">+</span>
    </button>
  </div>
</template>

<style scoped>
.fdc-textsize {
  display: inline-flex;
  gap: 2px;
}
.fdc-textsize__btn {
  min-width: 32px;
  height: 34px;
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  background: var(--fdc-color-surface, #fff);
  color: var(--fdc-color-text, #302921);
  border-radius: var(--fdc-radius-md, 8px);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-weight: 700;
  cursor: pointer;
}
.fdc-textsize__btn:hover:not(:disabled) {
  background: var(--fdc-color-surface-alt, #f5f5f1);
}
.fdc-textsize__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.fdc-textsize__minus {
  font-size: 0.7em;
}
.fdc-textsize__plus {
  font-size: 0.9em;
}
</style>
