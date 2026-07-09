<script setup lang="ts">
// Host unique des toasts. À monter UNE fois dans le layout de l'app. Les toasts
// s'empilent en bas de l'écran (zone du pouce sur mobile, bas-droite sur desktop)
// et disparaissent seuls. Le texte est fourni par le consommateur (DS sans i18n).
import { useToast, type ToastItem } from '../../composables/useToast'

withDefaults(defineProps<{ closeLabel?: string }>(), { closeLabel: 'Fermer' })

const { toasts, dismiss } = useToast()

function onAction(t: ToastItem) {
  t.onAction?.()
  dismiss(t.id)
}
</script>

<template>
  <Teleport to="body">
    <div class="fdc-toasts" role="status" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="fdc-toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="fdc-toast"
          :class="`fdc-toast--${t.tone}`"
        >
          <span class="fdc-toast__msg">{{ t.message }}</span>
          <button
            v-if="t.actionLabel"
            type="button"
            class="fdc-toast__action"
            @click="onAction(t)"
          >
            {{ t.actionLabel }}
          </button>
          <button
            type="button"
            class="fdc-toast__close"
            :aria-label="closeLabel"
            @click="dismiss(t.id)"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.fdc-toasts {
  position: fixed;
  z-index: 1000;
  left: 50%;
  bottom: max(1rem, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  width: min(28rem, calc(100vw - 2rem));
  pointer-events: none;
}
@media (min-width: 640px) {
  .fdc-toasts {
    left: auto;
    right: 1.25rem;
    transform: none;
  }
}
.fdc-toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  background: var(--fdc-color-surface, #ffffff);
  color: var(--fdc-color-text, #302921);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-left: 4px solid var(--fdc-color-info, #5c7f96);
  border-radius: var(--fdc-radius-md, 8px);
  box-shadow: var(--fdc-shadow-pop, 0 8px 24px rgba(0, 0, 0, 0.18));
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-size: 0.9rem;
}
.fdc-toast--success {
  border-left-color: var(--fdc-color-success, #66a361);
}
.fdc-toast--warn {
  border-left-color: var(--fdc-color-warn, #d49c49);
}
.fdc-toast--danger {
  border-left-color: var(--fdc-color-danger, #eb3c3c);
}
.fdc-toast__msg {
  flex: 1;
  line-height: 1.35;
}
.fdc-toast__action {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0.15rem 0.25rem;
  font: inherit;
  font-weight: 600;
  color: var(--fdc-color-primary, #66a361);
  cursor: pointer;
  text-decoration: underline;
}
.fdc-toast__close {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: var(--fdc-radius-sm, 6px);
  font-size: 1.25rem;
  line-height: 1;
  color: var(--fdc-color-text-muted, #61615a);
  cursor: pointer;
}
.fdc-toast__close:hover {
  background: var(--fdc-color-surface-alt, #f5f5f1);
}

/* Entrée/sortie : glisse depuis le bas. */
.fdc-toast-enter-active,
.fdc-toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fdc-toast-enter-from,
.fdc-toast-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}
@media (prefers-reduced-motion: reduce) {
  .fdc-toast-enter-active,
  .fdc-toast-leave-active {
    transition: opacity 0.2s ease;
  }
  .fdc-toast-enter-from,
  .fdc-toast-leave-to {
    transform: none;
  }
}
</style>
