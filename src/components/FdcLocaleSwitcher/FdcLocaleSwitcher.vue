<script setup lang="ts">
// Sélecteur de langue. Contrôlé (v-model = code de locale). La liste des langues
// est fournie par l'app (le DS est i18n-agnostique).
defineProps<{
  modelValue: string
  locales: Array<{ code: string; name: string }>
  label?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <label class="fdc-locale">
    <span class="fdc-locale__sr">{{ label ?? 'Langue' }}</span>
    <select
      class="fdc-locale__select"
      :value="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="l in locales" :key="l.code" :value="l.code">{{ l.name }}</option>
    </select>
  </label>
</template>

<style scoped>
.fdc-locale__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.fdc-locale__select {
  height: 34px;
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  background: var(--fdc-color-surface, #fff);
  color: var(--fdc-color-text, #302921);
  border-radius: var(--fdc-radius-md, 8px);
  padding: 0 var(--fdc-space-2, 0.5rem);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  font-size: 0.85rem;
  cursor: pointer;
}
</style>
