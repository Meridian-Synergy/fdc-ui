<script setup lang="ts">
// Rail de contenu : largeur max + centrage, pour aligner le bord des sections.
</script>

<template>
  <div class="fdc-container">
    <slot />
  </div>
</template>

<style scoped>
.fdc-container {
  width: 100%;
  max-width: var(--fdc-rail-max, 1120px);
  margin-inline: auto;
  padding-inline: var(--fdc-space-4, 1rem);
}
</style>
