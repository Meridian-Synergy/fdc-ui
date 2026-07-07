<script setup lang="ts">
// Logo produit FDC 360 (PLACEHOLDER — à remplacer par le vrai visuel).
// Emblème : anneau (360°) + point central = « centraliser autour d'un point ».
// SVG inline dans le template (jamais v-html) ; couleurs via CSS (var() ne se
// résout pas dans un attribut de présentation SVG → on style en CSS).
withDefaults(
  defineProps<{
    size?: number
    wordmark?: boolean
  }>(),
  { size: 30, wordmark: true },
)
</script>

<template>
  <span class="fdc-logo">
    <svg
      class="fdc-logo__mark"
      :width="size"
      :height="size"
      viewBox="0 0 32 32"
      role="img"
      aria-label="FDC 360"
    >
      <circle class="fdc-logo__ring" cx="16" cy="16" r="13" />
      <circle class="fdc-logo__ring-inner" cx="16" cy="16" r="8.5" />
      <circle class="fdc-logo__dot" cx="16" cy="16" r="3.6" />
    </svg>
    <span v-if="wordmark" class="fdc-logo__wm">
      FDC<span class="fdc-logo__360">360</span>
    </span>
  </span>
</template>

<style scoped>
.fdc-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  line-height: 1;
}
.fdc-logo__mark {
  flex: none;
}
.fdc-logo__ring {
  fill: none;
  stroke: var(--fdc-color-primary, #66a361);
  stroke-width: 2.4;
}
.fdc-logo__ring-inner {
  fill: none;
  stroke: var(--fdc-color-primary, #66a361);
  stroke-width: 1.2;
  opacity: 0.45;
}
.fdc-logo__dot {
  fill: var(--fdc-color-accent, #afcf1a);
}
.fdc-logo__wm {
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  color: var(--fdc-color-primary, #66a361);
}
.fdc-logo__360 {
  margin-left: 0.18em;
  color: var(--fdc-color-text, #302921);
  font-weight: 600;
}
</style>
