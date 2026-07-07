<script setup lang="ts">
// Bouton socle du DS FDC. Valeurs de charte via CSS var AVEC fallback
// (var(--token, valeur)) : reste lisible même si le consommateur ne déclare
// pas les tokens (leçon wp360).
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline' | 'danger'
    size?: 'md' | 'sm'
    type?: 'button' | 'submit'
    disabled?: boolean
    block?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', disabled: false, block: false },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="fdc-button"
    :class="[`fdc-button--${variant}`, `fdc-button--${size}`, { 'fdc-button--block': block }]"
  >
    <slot />
  </button>
</template>

<style scoped>
.fdc-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--fdc-space-2, 0.5rem);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-weight: 600;
  line-height: 1.2;
  border-radius: var(--fdc-radius-md, 8px);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.fdc-button--md {
  padding: var(--fdc-space-2, 0.5rem) var(--fdc-space-4, 1rem);
  font-size: 0.95rem;
}
.fdc-button--sm {
  padding: var(--fdc-space-1, 0.25rem) var(--fdc-space-3, 0.75rem);
  font-size: 0.85rem;
}
.fdc-button--block {
  display: flex;
  width: 100%;
}
.fdc-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fdc-button--primary {
  background: var(--fdc-color-primary, #66a361);
  color: var(--fdc-color-on-primary, #ffffff);
}
.fdc-button--primary:hover:not(:disabled) {
  background: var(--fdc-color-primary-hover, #5a9755);
}

.fdc-button--outline {
  background: transparent;
  color: var(--fdc-color-primary, #66a361);
  border-color: var(--fdc-color-primary, #66a361);
}
.fdc-button--outline:hover:not(:disabled) {
  background: var(--fdc-color-primary-soft, #eaf2e9);
}

.fdc-button--danger {
  background: var(--fdc-color-danger, #eb3c3c);
  color: var(--fdc-color-on-danger, #ffffff);
}
.fdc-button--danger:hover:not(:disabled) {
  filter: brightness(0.94);
}
</style>
