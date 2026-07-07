<script setup lang="ts">
// Bascule clair/sombre. Contrôlé (v-model) : le DS ne persiste rien, l'app gère
// le store + l'attribut data-theme. SVG inline dans le template (jamais v-html).
const props = withDefaults(
  defineProps<{ modelValue?: 'light' | 'dark'; label?: string }>(),
  { modelValue: 'light', label: 'Thème' },
)
const emit = defineEmits<{ 'update:modelValue': ['light' | 'dark'] }>()

function toggle() {
  emit('update:modelValue', props.modelValue === 'dark' ? 'light' : 'dark')
}
</script>

<template>
  <button type="button" class="fdc-theme-toggle" :aria-label="label" @click="toggle">
    <svg v-if="modelValue === 'dark'" viewBox="0 0 24 24" class="fdc-theme-toggle__icon" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
    <svg v-else viewBox="0 0 24 24" class="fdc-theme-toggle__icon" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>

<style scoped>
.fdc-theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--fdc-radius-md, 8px);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  background: var(--fdc-color-surface, #fff);
  color: var(--fdc-color-text, #302921);
  cursor: pointer;
}
.fdc-theme-toggle:hover {
  background: var(--fdc-color-surface-alt, #f5f5f1);
}
.fdc-theme-toggle__icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
