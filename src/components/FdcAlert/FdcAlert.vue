<script setup lang="ts">
// Message d'état à tons sémantiques. Le texte est fourni par le consommateur.
withDefaults(
  defineProps<{
    tone?: 'info' | 'success' | 'warn' | 'danger'
  }>(),
  { tone: 'info' },
)
</script>

<template>
  <div class="fdc-alert" :class="`fdc-alert--${tone}`" role="alert">
    <slot />
  </div>
</template>

<style scoped>
.fdc-alert {
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-size: 0.9rem;
  border: 1px solid transparent;
  border-radius: var(--fdc-radius-md, 8px);
  padding: var(--fdc-space-2, 0.5rem) var(--fdc-space-3, 0.75rem);
}
.fdc-alert--info {
  background: var(--fdc-color-info-soft, #eaf0f3);
  border-color: var(--fdc-color-info, #5c7f96);
  color: var(--fdc-color-text, #302921);
}
.fdc-alert--success {
  background: var(--fdc-color-success-soft, #eaf2e9);
  border-color: var(--fdc-color-success, #66a361);
  color: var(--fdc-color-text, #302921);
}
.fdc-alert--warn {
  background: var(--fdc-color-warn-soft, #fbf1e2);
  border-color: var(--fdc-color-warn, #d49c49);
  color: var(--fdc-color-text, #302921);
}
.fdc-alert--danger {
  background: var(--fdc-color-danger-soft, #fdeaea);
  border-color: var(--fdc-color-danger, #eb3c3c);
  color: var(--fdc-color-text, #302921);
}
</style>
