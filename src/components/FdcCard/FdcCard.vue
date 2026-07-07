<script setup lang="ts">
// Carte de surface. Slots optionnels header/footer + contenu par défaut.
withDefaults(defineProps<{ padded?: boolean }>(), { padded: true })
</script>

<template>
  <div class="fdc-card">
    <header v-if="$slots.header" class="fdc-card__header">
      <slot name="header" />
    </header>
    <div class="fdc-card__body" :class="{ 'fdc-card__body--padded': padded }">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="fdc-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.fdc-card {
  background: var(--fdc-color-surface, #ffffff);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-lg, 14px);
  box-shadow: var(--fdc-shadow-card, 0 4px 12px rgba(48, 41, 33, 0.05));
  overflow: hidden;
  color: var(--fdc-color-text, #302921);
}
.fdc-card__header,
.fdc-card__footer {
  padding: var(--fdc-space-3, 0.75rem) var(--fdc-space-4, 1rem);
  background: var(--fdc-color-surface-alt, #f5f5f1);
}
.fdc-card__header {
  border-bottom: 1px solid var(--fdc-color-border, #e7e7e7);
  font-weight: 600;
}
.fdc-card__footer {
  border-top: 1px solid var(--fdc-color-border, #e7e7e7);
}
.fdc-card__body--padded {
  padding: var(--fdc-space-4, 1rem);
}
</style>
