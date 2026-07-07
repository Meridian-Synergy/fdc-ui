<script setup lang="ts">
// Bloc de chargement page/section : spinner + libellé centrés dans le conteneur
// d'état standard. Le libellé est PASSÉ par le consommateur (DS i18n-agnostique) :
//   <FdcLoadingState :label="t('common.loading')" />
import FdcSpinner from '../FdcSpinner/FdcSpinner.vue'

withDefaults(
  defineProps<{
    label?: string
  }>(),
  { label: 'Chargement' },
)
</script>

<template>
  <div class="fdc-loading-state">
    <FdcSpinner :size="26" :label="label" />
    <p class="fdc-loading-state__label">{{ label }}</p>
  </div>
</template>

<style scoped>
.fdc-loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--fdc-space-3, 0.75rem);
  padding: var(--fdc-space-6, 2rem);
  color: var(--fdc-color-text-muted, #61615a);
}
.fdc-loading-state__label {
  margin: 0;
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-size: 0.9rem;
}
</style>
