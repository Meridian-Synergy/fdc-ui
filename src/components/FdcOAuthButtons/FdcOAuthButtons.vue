<script setup lang="ts">
// Boutons de connexion sociale (Google, Microsoft) avec leurs marques officielles.
// Présentationnel : l'app fournit les libellés et déclenche le flux OAuth via
// l'event `select`. Logos = marques de marque des providers, requises sur les
// boutons de connexion selon leurs chartes. SVG inline (jamais v-html).
defineProps<{
  googleLabel: string
  microsoftLabel: string
  disabled?: boolean
}>()
const emit = defineEmits<{ select: ['google' | 'azure'] }>()
</script>

<template>
  <div class="fdc-oauth">
    <button type="button" class="fdc-oauth__btn" :disabled="disabled" @click="emit('select', 'google')">
      <svg class="fdc-oauth__logo" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      <span>{{ googleLabel }}</span>
    </button>

    <button type="button" class="fdc-oauth__btn" :disabled="disabled" @click="emit('select', 'azure')">
      <svg class="fdc-oauth__logo" width="18" height="18" viewBox="0 0 23 23" aria-hidden="true">
        <path fill="#f35325" d="M1 1h10v10H1z" />
        <path fill="#81bc06" d="M12 1h10v10H12z" />
        <path fill="#05a6f0" d="M1 12h10v10H1z" />
        <path fill="#ffba08" d="M12 12h10v10H12z" />
      </svg>
      <span>{{ microsoftLabel }}</span>
    </button>
  </div>
</template>

<style scoped>
.fdc-oauth {
  display: flex;
  flex-direction: column;
  gap: var(--fdc-space-2, 0.5rem);
}
.fdc-oauth__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--fdc-space-2, 0.5rem);
  width: 100%;
  padding: var(--fdc-space-2, 0.5rem) var(--fdc-space-4, 1rem);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-md, 8px);
  background: var(--fdc-color-surface, #fff);
  color: var(--fdc-color-text, #302921);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}
.fdc-oauth__btn:hover:not(:disabled) {
  background: var(--fdc-color-surface-alt, #f5f5f1);
}
.fdc-oauth__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.fdc-oauth__logo {
  flex: none;
}
</style>
