<script setup lang="ts">
// Bannière « Installer l'app » (A2HS). Présentationnel : l'app fournit la
// visibilité (via usePwaInstall), les textes, et la plateforme (ios → instructions
// manuelles, sinon prompt natif). Émet install/dismiss.
defineProps<{
  visible: boolean
  platform: 'ios' | 'native'
  title: string
  message: string
  install: string
  iosHint: string
  dismiss: string
}>()
const emit = defineEmits<{ install: []; dismiss: [] }>()
</script>

<template>
  <div v-if="visible" class="fdc-install" role="dialog" aria-label="Installer l'application">
    <div class="fdc-install__body">
      <strong class="fdc-install__title">{{ title }}</strong>
      <p class="fdc-install__msg">{{ platform === 'ios' ? iosHint : message }}</p>
    </div>
    <div class="fdc-install__actions">
      <button type="button" class="fdc-install__btn fdc-install__btn--ghost" @click="emit('dismiss')">
        {{ dismiss }}
      </button>
      <button
        v-if="platform === 'native'"
        type="button"
        class="fdc-install__btn fdc-install__btn--primary"
        @click="emit('install')"
      >
        {{ install }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.fdc-install {
  position: fixed;
  bottom: var(--fdc-space-4, 1rem);
  left: var(--fdc-space-4, 1rem);
  right: var(--fdc-space-4, 1rem);
  max-width: 480px;
  margin-inline: auto;
  display: flex;
  align-items: center;
  gap: var(--fdc-space-3, 0.75rem);
  padding: var(--fdc-space-3, 0.75rem) var(--fdc-space-4, 1rem);
  background: var(--fdc-color-surface, #fff);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-lg, 14px);
  box-shadow: var(--fdc-shadow-card, 0 4px 12px rgba(0, 0, 0, 0.12));
  z-index: 1000;
}
.fdc-install__body {
  flex: 1;
}
.fdc-install__title {
  color: var(--fdc-color-text, #302921);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
}
.fdc-install__msg {
  margin: 0.15rem 0 0;
  font-size: 0.8rem;
  color: var(--fdc-color-text-muted, #61615a);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
}
.fdc-install__actions {
  display: flex;
  gap: var(--fdc-space-2, 0.5rem);
}
.fdc-install__btn {
  border-radius: var(--fdc-radius-md, 8px);
  padding: var(--fdc-space-1, 0.25rem) var(--fdc-space-3, 0.75rem);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  border: 1px solid transparent;
}
.fdc-install__btn--primary {
  background: var(--fdc-color-primary, #66a361);
  color: var(--fdc-color-on-primary, #fff);
}
.fdc-install__btn--ghost {
  background: transparent;
  color: var(--fdc-color-text-muted, #61615a);
  border-color: var(--fdc-color-border, #e7e7e7);
}
</style>
