<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

// Champ de saisie contrôlé (v-model). S'utilise seul ou dans FdcField.
// Un champ `type="password"` reçoit automatiquement un bouton œil afficher/masquer
// (opt-out via `:revealable="false"`), suivant le pattern d'accessibilité GOV.UK.
const props = withDefaults(
  defineProps<{
    modelValue?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    invalid?: boolean
    id?: string
    autocomplete?: string
    revealable?: boolean
    revealLabel?: string
    hideLabel?: string
    shownAnnouncement?: string
    hiddenAnnouncement?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    disabled: false,
    invalid: false,
    revealable: true,
    revealLabel: 'Show password',
    hideLabel: 'Hide password',
    shownAnnouncement: 'Your password is visible',
    hiddenAnnouncement: 'Your password is hidden',
  },
)
defineEmits<{ 'update:modelValue': [value: string] }>()

// Transmet les attributs natifs (required, minlength, name…) à l'<input>,
// pas au <div> racine où ils seraient sans effet.
defineOptions({ inheritAttrs: false })

const inputEl = ref<HTMLInputElement>()
const revealed = ref(false)
const announcement = ref('')

const showReveal = computed(() => props.type === 'password' && props.revealable && !props.disabled)
// Type effectif : révélé → 'text', sinon le type demandé (souvent 'password').
const effectiveType = computed(() => (props.type === 'password' && revealed.value ? 'text' : props.type))

function toggleReveal() {
  revealed.value = !revealed.value
  announcement.value = revealed.value ? props.shownAnnouncement : props.hiddenAnnouncement
}

// Re-masque à la soumission pour ne jamais laisser un mot de passe révélé à l'écran
// (l'événement submit se déclenche même avec @submit.prevent).
function remask() { revealed.value = false }
let formEl: HTMLFormElement | null = null
onMounted(() => {
  formEl = inputEl.value?.form ?? null
  formEl?.addEventListener('submit', remask)
})
onBeforeUnmount(() => formEl?.removeEventListener('submit', remask))
</script>

<template>
  <div :class="['fdc-input-wrap', { 'fdc-input-wrap--revealable': showReveal }]">
    <input
      :id="id"
      ref="inputEl"
      v-bind="$attrs"
      class="fdc-input"
      :class="{ 'fdc-input--invalid': invalid }"
      :type="effectiveType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :aria-invalid="invalid || undefined"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="showReveal"
      type="button"
      class="fdc-input__reveal"
      :aria-label="revealed ? hideLabel : revealLabel"
      :title="revealed ? hideLabel : revealLabel"
      :disabled="disabled"
      @click="toggleReveal"
    >
      <svg v-if="revealed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
    <span class="fdc-sr-only" role="status" aria-live="polite">{{ announcement }}</span>
  </div>
</template>

<style scoped>
.fdc-input-wrap {
  position: relative;
  width: 100%;
}
.fdc-input {
  width: 100%;
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-size: 0.95rem;
  color: var(--fdc-color-text, #302921);
  background: var(--fdc-color-surface, #ffffff);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-md, 8px);
  padding: var(--fdc-space-2, 0.5rem) var(--fdc-space-3, 0.75rem);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.fdc-input-wrap--revealable .fdc-input {
  padding-right: 2.75rem;
}
/* Supprime le bouton reveal natif du navigateur (Edge/IE) pour éviter un double œil. */
.fdc-input::-ms-reveal,
.fdc-input::-ms-clear { display: none; }
.fdc-input:focus {
  outline: none;
  border-color: var(--fdc-color-primary, #66a361);
  box-shadow: 0 0 0 3px var(--fdc-color-primary-soft, #eaf2e9);
}
.fdc-input:disabled {
  background: var(--fdc-color-surface-alt, #f5f5f1);
  opacity: 0.7;
  cursor: not-allowed;
}
.fdc-input--invalid {
  border-color: var(--fdc-color-danger, #eb3c3c);
}
.fdc-input--invalid:focus {
  box-shadow: 0 0 0 3px var(--fdc-color-danger-soft, #fdeaea);
}
.fdc-input__reveal {
  position: absolute;
  top: 2px;
  bottom: 2px;
  right: 0.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--fdc-color-text-muted, #61615a);
  cursor: pointer;
  border-radius: var(--fdc-radius-sm, 6px);
}
.fdc-input__reveal:hover {
  color: var(--fdc-color-text, #302921);
}
.fdc-input__reveal:focus-visible {
  outline: 2px solid var(--fdc-color-primary, #66a361);
  outline-offset: 1px;
}
.fdc-input__reveal:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.fdc-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
