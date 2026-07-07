<script setup lang="ts">
// Champ de saisie contrôlé (v-model). S'utilise seul ou dans FdcField.
withDefaults(
  defineProps<{
    modelValue?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    invalid?: boolean
    id?: string
    autocomplete?: string
  }>(),
  { modelValue: '', type: 'text', disabled: false, invalid: false },
)
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <input
    :id="id"
    class="fdc-input"
    :class="{ 'fdc-input--invalid': invalid }"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :autocomplete="autocomplete"
    :aria-invalid="invalid || undefined"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.fdc-input {
  width: 100%;
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-size: 0.95rem;
  color: var(--fdc-color-text, #302921);
  background: var(--fdc-color-surface, #ffffff);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-md, 8px);
  padding: var(--fdc-space-2, 0.5rem) var(--fdc-space-3, 0.75rem);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.fdc-input:focus {
  outline: none;
  border-color: var(--fdc-color-primary, #66a361);
  box-shadow: 0 0 0 3px var(--fdc-color-primary-soft, #eaf2e9);
}
.fdc-input:disabled {
  background: var(--fdc-color-surface-alt, #f5f5f1);
  opacity: 0.7;
  cursor: not-allowed;
}
.fdc-input--invalid {
  border-color: var(--fdc-color-danger, #eb3c3c);
}
.fdc-input--invalid:focus {
  box-shadow: 0 0 0 3px var(--fdc-color-danger-soft, #fdeaea);
}
</style>
