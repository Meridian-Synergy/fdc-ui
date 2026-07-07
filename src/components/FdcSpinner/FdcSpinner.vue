<script setup lang="ts">
// Atome loader — auto-suffisant : porte sa PROPRE animation (pas de @keyframes
// recopié ailleurs) + prefers-reduced-motion. Pour les loaders inline/widget.
// Le libellé alimente l'accessibilité (role="status"). Cf. playbook 02-DS-UI.
withDefaults(
  defineProps<{
    size?: number
    label?: string
  }>(),
  { size: 18, label: 'Chargement' },
)
</script>

<template>
  <span
    class="fdc-spinner"
    role="status"
    :aria-label="label"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style scoped>
.fdc-spinner {
  display: inline-block;
  border-radius: 50%;
  border: 2px solid var(--fdc-color-border, #e7e7e7);
  border-top-color: var(--fdc-color-primary, #66a361);
  animation: fdc-spin 0.7s linear infinite;
}
@keyframes fdc-spin {
  to {
    transform: rotate(360deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .fdc-spinner {
    animation-duration: 2s;
  }
}
</style>
