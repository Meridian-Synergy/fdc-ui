<script setup lang="ts">
// Composant socle du DS FDC. Les valeurs de charte passent par des CSS var AVEC
// fallback (var(--token, valeur)) : le consommateur peut ne pas déclarer les
// tokens, le bouton doit rester lisible (leçon wp360 : bug noir-sur-navy).
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', type: 'button', disabled: false },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="fdc-button"
    :class="`fdc-button--${variant}`"
  >
    <slot />
  </button>
</template>

<style scoped>
.fdc-button {
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  border-radius: var(--fdc-radius-md, 8px);
  padding: var(--fdc-space-2, 0.5rem) var(--fdc-space-4, 1rem);
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.15s ease;
}
.fdc-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.fdc-button--primary {
  background: var(--fdc-color-primary, #2f5d3a);
  color: var(--fdc-color-on-primary, #ffffff);
}
.fdc-button--primary:hover:not(:disabled) {
  background: var(--fdc-color-primary-hover, #274d31);
}
.fdc-button--outline {
  background: transparent;
  color: var(--fdc-color-primary, #2f5d3a);
  border-color: var(--fdc-color-primary, #2f5d3a);
}
</style>
