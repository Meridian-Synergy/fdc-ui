<script setup lang="ts">
// Bouton d'action à confirmation INLINE (patron Waypoint360) : au 1er clic, le
// bouton laisse place à une confirmation « Confirmer / Annuler » au même endroit
// — pas de popup navigateur. Le texte est fourni par le consommateur (DS sans i18n).
import { ref } from 'vue'
import FdcButton from '../FdcButton/FdcButton.vue'

withDefaults(
  defineProps<{
    label: string
    confirmLabel: string
    cancelLabel: string
    question?: string
    variant?: 'primary' | 'outline' | 'danger'
    size?: 'md' | 'sm'
    disabled?: boolean
  }>(),
  { question: '', variant: 'danger', size: 'md', disabled: false },
)

const emit = defineEmits<{ confirm: [] }>()
const confirming = ref(false)

function onConfirm() {
  confirming.value = false
  emit('confirm')
}
</script>

<template>
  <span class="fdc-confirm">
    <FdcButton
      v-if="!confirming"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      @click="confirming = true"
    >
      {{ label }}
    </FdcButton>
    <span v-else class="fdc-confirm__ask" role="group">
      <span v-if="question" class="fdc-confirm__q">{{ question }}</span>
      <FdcButton :variant="variant" :size="size" @click="onConfirm">{{ confirmLabel }}</FdcButton>
      <FdcButton variant="outline" :size="size" @click="confirming = false">{{ cancelLabel }}</FdcButton>
    </span>
  </span>
</template>

<style scoped>
.fdc-confirm {
  display: inline-flex;
}
.fdc-confirm__ask {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--fdc-space-2, 0.5rem);
}
.fdc-confirm__q {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--fdc-color-text, #302921);
}
</style>
