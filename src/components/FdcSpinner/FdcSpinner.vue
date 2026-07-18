<script setup lang="ts">
import { computed } from 'vue'

/**
 * FdcSpinner — l'unique indicateur de chargement de toutes les surfaces FDC.
 *
 * Un anneau de points vert-marque (primary) qui s'estompent autour du cercle, l'ensemble
 * tournant. Theme-safe sur fond clair ET sombre : les points sont l'accent primary et la
 * traîne s'estompe par opacité (pas de couleur claire/sombre figée), donc le rendu est
 * identique en thème clair et en [data-theme="dark"]. Auto-suffisant : porte ses PROPRES
 * keyframes (ne dépend jamais d'un @keyframes global chez le consommateur). Décoratif par
 * défaut (aria-hidden) ; passer `label` pour l'exposer en statut accessible (role="status").
 *
 * Usage canonique dans un bloc de chargement :
 *   <FdcLoadingState :label="t('common.loading')" />
 */
const props = withDefaults(
  defineProps<{
    /** Diamètre en pixels */
    size?: number
    /** Libellé accessible ; s'il est défini le spinner est annoncé (role="status") au lieu d'être décoratif */
    label?: string
  }>(),
  { size: 18 },
)

const COUNT = 12

// Point de tête pleinement opaque, points de traîne qui s'estompent autour de l'anneau.
const dots = computed(() =>
  Array.from({ length: COUNT }, (_, i) => ({
    angle: (360 / COUNT) * i,
    opacity: 0.12 + 0.88 * ((i + 1) / COUNT),
  })),
)
const radius = computed(() => props.size * 0.38)
const dotSize = computed(() => Math.max(2, props.size * 0.16))
</script>

<template>
  <span
    class="fdc-spinner"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :role="label ? 'status' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : true"
  >
    <span
      v-for="(d, i) in dots"
      :key="i"
      class="fdc-spinner-dot"
      :style="{
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        opacity: d.opacity,
        transform: `translate(-50%, -50%) rotate(${d.angle}deg) translateY(-${radius}px)`,
      }"
    />
  </span>
</template>

<style scoped>
.fdc-spinner {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  animation: fdc-spin 1.1s linear infinite;
}
.fdc-spinner-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: var(--fdc-color-primary, #66a361);
}
@keyframes fdc-spin {
  to {
    transform: rotate(360deg);
  }
}
/* Garde le repère de mouvement mais le ralentit fortement pour prefers-reduced-motion. */
@media (prefers-reduced-motion: reduce) {
  .fdc-spinner {
    animation-duration: 2.2s;
  }
}
</style>
