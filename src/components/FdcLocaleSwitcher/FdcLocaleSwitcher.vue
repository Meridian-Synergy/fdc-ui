<script setup lang="ts">
// Sélecteur de langue à drapeaux. Contrôlé (v-model = code de locale). La liste
// des langues est fournie par l'app (le DS est i18n-agnostique). Les couleurs sont
// pilotées par les tokens sémantiques → s'adapte au thème clair/sombre via data-theme,
// pas de prop `theme`.
//
// Les drapeaux viennent de `flag-icons` : l'app consommatrice DOIT importer la CSS
// globalement (nuxt.config `css: ['flag-icons/css/flag-icons.min.css']`). Le champ
// `flag` est un code ISO 3166-1 alpha-2 en minuscules (ex. 'gb' pour l'anglais),
// utilisé comme classe `fi-{flag}`.
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface FdcLocaleOption {
  code: string
  name: string
  flag: string
}

const props = defineProps<{
  modelValue: string
  locales: FdcLocaleOption[]
  label?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const current = computed(() => props.locales.find((l) => l.code === props.modelValue))

function toggle() {
  open.value = !open.value
}

function select(code: string) {
  open.value = false
  if (code !== props.modelValue) emit('update:modelValue', code)
}

function onOutsideClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onOutsideClick, true)
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', onOutsideClick, true)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="fdc-locale">
    <button
      type="button"
      class="fdc-locale__trigger"
      :aria-label="label ?? 'Langue'"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click.stop="toggle"
    >
      <span class="fi" :class="`fi-${current?.flag}`" role="img" :aria-label="current?.name" />
      <span class="fdc-locale__name">{{ current?.name }}</span>
      <svg
        class="fdc-locale__chevron"
        :class="{ 'fdc-locale__chevron--open': open }"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 8 L1 3 L11 3 Z" />
      </svg>
    </button>

    <ul v-if="open" class="fdc-locale__menu" role="listbox" :aria-label="label ?? 'Langue'">
      <li
        v-for="l in locales"
        :key="l.code"
        role="option"
        :aria-selected="l.code === modelValue"
        class="fdc-locale__option"
        :class="{ 'fdc-locale__option--active': l.code === modelValue }"
        @click="select(l.code)"
      >
        <span class="fi" :class="`fi-${l.flag}`" role="img" :aria-label="l.name" />
        <span class="fdc-locale__option-name">{{ l.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.fdc-locale {
  position: relative;
  display: inline-block;
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
}

/* Déclencheur */
.fdc-locale__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--fdc-space-2, 0.5rem);
  min-height: 34px;
  padding: 0 var(--fdc-space-2, 0.5rem);
  border-radius: var(--fdc-radius-md, 8px);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  background: var(--fdc-color-surface, #fff);
  color: var(--fdc-color-text, #302921);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  transition:
    background var(--fdc-transition-fast, 0.12s ease),
    border-color var(--fdc-transition-fast, 0.12s ease);
}
.fdc-locale__trigger:hover {
  background: var(--fdc-color-surface-alt, #f5f5f1);
  border-color: var(--fdc-color-primary, #66a361);
}

.fdc-locale__chevron {
  transition: transform var(--fdc-transition-base, 0.2s ease);
  flex-shrink: 0;
  color: var(--fdc-color-text-muted, #61615a);
}
.fdc-locale__chevron--open {
  transform: rotate(180deg);
}

/* Menu déroulant */
.fdc-locale__menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 200px;
  max-height: 340px;
  overflow-y: auto;
  margin: 0;
  padding: var(--fdc-space-1, 0.25rem) 0;
  list-style: none;
  border-radius: var(--fdc-radius-md, 8px);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  background: var(--fdc-color-surface, #fff);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 200;
}

.fdc-locale__option {
  display: flex;
  align-items: center;
  gap: var(--fdc-space-3, 0.75rem);
  padding: var(--fdc-space-2, 0.5rem) var(--fdc-space-4, 1rem);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--fdc-color-text, #302921);
  transition: background var(--fdc-transition-fast, 0.12s ease);
}
.fdc-locale__option:hover {
  background: var(--fdc-color-surface-alt, #f5f5f1);
}
.fdc-locale__option--active {
  color: var(--fdc-color-primary, #66a361);
  font-weight: 700;
}

/* Dimension des drapeaux flag-icons */
.fdc-locale .fi {
  width: 20px;
  height: 15px;
  flex-shrink: 0;
  border-radius: 2px;
  overflow: hidden;
  background-size: cover;
}
</style>
