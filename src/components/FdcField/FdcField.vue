<script setup lang="ts">
// Enveloppe label + contenu (slot) + message d'erreur. Le libellé et le message
// sont fournis par le consommateur (i18n côté app). Associe label ↔ champ via `for`.
import { useId } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    error?: string
    forId?: string
  }>(),
  {},
)

const fieldId = props.forId ?? `fdc-field-${useId()}`
</script>

<template>
  <div class="fdc-field">
    <label v-if="label" :for="fieldId" class="fdc-field__label">{{ label }}</label>
    <slot :id="fieldId" :invalid="!!error" />
    <p v-if="error" class="fdc-field__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.fdc-field {
  display: flex;
  flex-direction: column;
  gap: var(--fdc-space-1, 0.25rem);
}
.fdc-field__label {
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--fdc-color-text, #302921);
}
.fdc-field__error {
  margin: 0;
  font-size: 0.8rem;
  color: var(--fdc-color-danger, #eb3c3c);
}
</style>
