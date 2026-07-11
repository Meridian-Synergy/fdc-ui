<script setup lang="ts">
import { computed, ref } from 'vue'

// Champ de saisie contrôlé (v-model). S'utilise seul ou dans FdcField.
// `revealable` ajoute un bouton œil afficher/masquer (mots de passe).
const props = withDefaults(
  defineProps<{
    modelValue?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    invalid?: boolean
    id?: string
    autocomplete?: string
    revealable?: boolean
    revealLabel?: string
    hideLabel?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    disabled: false,
    invalid: false,
    revealable: false,
    revealLabel: 'Show password',
    hideLabel: 'Hide password',
  },
)
defineEmits<{ 'update:modelValue': [value: string] }>()

const revealed = ref(false)
// Type effectif : révélé → 'text', sinon le type demandé (souvent 'password').
const effectiveType = computed(() => (props.revealable && revealed.value ? 'text' : props.type))
</script>

<template>
  <div :class="['fdc-input-wrap', { 'fdc-input-wrap--revealable': revealable }]">
    <input
      :id="id"
      class="fdc-input"
      :class="{ 'fdc-input--invalid': invalid }"
      :type="effectiveType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :aria-invalid="invalid || undefined"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="revealable"
      type="button"
      class="fdc-input__reveal"
      :aria-label="revealed ? hideLabel : revealLabel"
      :aria-pressed="revealed"
      :disabled="disabled"
      @click="revealed = !revealed"
    >
      <svg v-if="revealed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.fdc-input-wrap {
  position: relative;
  width: 100%;
}
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
.fdc-input-wrap--revealable .fdc-input {
  padding-right: 2.75rem;
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
.fdc-input__reveal {
  position: absolute;
  top: 50%;
  right: 0.4rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--fdc-color-text-muted, #61615a);
  cursor: pointer;
  border-radius: var(--fdc-radius-sm, 6px);
}
.fdc-input__reveal:hover {
  color: var(--fdc-color-text, #302921);
}
.fdc-input__reveal:focus-visible {
  outline: 2px solid var(--fdc-color-primary, #66a361);
  outline-offset: 1px;
}
.fdc-input__reveal:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
