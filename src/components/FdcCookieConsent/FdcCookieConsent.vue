<script setup lang="ts">
// Bannière de consentement cookies (RGPD). Présentationnel : textes fournis par
// l'app, visibilité contrôlée par l'app (selon le cookie de consentement).
defineProps<{
  visible: boolean
  message: string
  accept: string
  deny: string
}>()
const emit = defineEmits<{ accept: []; deny: [] }>()
</script>

<template>
  <div
    v-if="visible"
    class="fdc-cookie"
    role="dialog"
    aria-live="polite"
    aria-label="Consentement aux cookies"
  >
    <p class="fdc-cookie__msg">{{ message }}</p>
    <div class="fdc-cookie__actions">
      <button type="button" class="fdc-cookie__btn fdc-cookie__btn--ghost" @click="emit('deny')">
        {{ deny }}
      </button>
      <button type="button" class="fdc-cookie__btn fdc-cookie__btn--primary" @click="emit('accept')">
        {{ accept }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.fdc-cookie {
  position: fixed;
  bottom: var(--fdc-space-4, 1rem);
  left: var(--fdc-space-4, 1rem);
  right: var(--fdc-space-4, 1rem);
  max-width: 640px;
  margin-inline: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--fdc-space-3, 0.75rem);
  padding: var(--fdc-space-3, 0.75rem) var(--fdc-space-4, 1rem);
  background: var(--fdc-color-surface, #fff);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-lg, 14px);
  box-shadow: var(--fdc-shadow-card, 0 4px 12px rgba(0, 0, 0, 0.12));
  z-index: 1000;
}
.fdc-cookie__msg {
  margin: 0;
  flex: 1 1 240px;
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-size: 0.85rem;
  color: var(--fdc-color-text, #302921);
}
.fdc-cookie__actions {
  display: flex;
  gap: var(--fdc-space-2, 0.5rem);
}
.fdc-cookie__btn {
  border-radius: var(--fdc-radius-md, 8px);
  padding: var(--fdc-space-2, 0.5rem) var(--fdc-space-3, 0.75rem);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: 1px solid transparent;
}
.fdc-cookie__btn--primary {
  background: var(--fdc-color-primary, #66a361);
  color: var(--fdc-color-on-primary, #fff);
}
.fdc-cookie__btn--ghost {
  background: transparent;
  color: var(--fdc-color-text-muted, #61615a);
  border-color: var(--fdc-color-border, #e7e7e7);
}
</style>
