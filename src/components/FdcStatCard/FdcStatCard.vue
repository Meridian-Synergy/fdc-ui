<script setup lang="ts">
// Tuile KPI du DS FDC (calquée sur WpStatCard de wp360) : label en haut, grande
// valeur en dessous, sub/lien optionnels. Self-contained (PAS de wrapper FdcCard →
// évite le piège du scope CSS sur .fdc-card__body). Tons = accent (valeur + bordure).
export type FdcStatTone = 'neutral' | 'green' | 'gold' | 'warn' | 'sky'

withDefaults(
  defineProps<{
    label?: string
    value?: string | number
    sub?: string
    link?: string
    tone?: FdcStatTone
    loading?: boolean
    interactive?: boolean
  }>(),
  { label: '', value: '', sub: '', link: '', tone: 'neutral', loading: false, interactive: false },
)
defineEmits<{ (e: 'click', ev: MouseEvent): void }>()
</script>

<template>
  <div
    class="fdc-stat-card"
    :class="[`fdc-stat-card--${tone}`, { 'fdc-stat-card--interactive': interactive }]"
    @click="$emit('click', $event)"
  >
    <span v-if="label" class="fdc-stat-card__label">{{ label }}</span>
    <span class="fdc-stat-card__value" :class="{ 'fdc-stat-card__value--loading': loading }">
      <slot name="value">{{ value }}</slot>
    </span>
    <span v-if="sub || $slots.sub" class="fdc-stat-card__sub"><slot name="sub">{{ sub }}</slot></span>
    <span v-if="link" class="fdc-stat-card__link">{{ link }}</span>
  </div>
</template>

<style scoped>
.fdc-stat-card {
  --_accent: var(--fdc-color-primary, #66a361);
  display: flex;
  flex-direction: column;
  gap: var(--fdc-space-1, 0.25rem);
  background: var(--fdc-color-surface, #ffffff);
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-lg, 14px);
  padding: 1.1rem 1.25rem;
  box-shadow: var(--fdc-shadow-card, 0 1px 2px rgba(48, 41, 33, 0.06));
  min-width: 0;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.fdc-stat-card--green   { --_accent: var(--fdc-color-primary, #66a361); }
.fdc-stat-card--gold    { --_accent: var(--fdc-color-warn, #d49c49); }
.fdc-stat-card--warn    { --_accent: var(--fdc-color-danger, #eb3c3c); }
.fdc-stat-card--sky     { --_accent: #2a78d6; }

/* Tons colorés : léger fond teinté + bordure accent (rendu doux, non alarmant). */
.fdc-stat-card--green,
.fdc-stat-card--gold,
.fdc-stat-card--sky {
  border-color: color-mix(in srgb, var(--_accent) 32%, transparent);
  background: color-mix(in srgb, var(--fdc-color-surface, #fff) 92%, var(--_accent));
}

.fdc-stat-card__label {
  font-family: var(--fdc-font-condensed, var(--fdc-font-sans, sans-serif));
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.25;
  color: var(--fdc-color-text-muted, #61615a);
}
.fdc-stat-card__value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--_accent);
  margin: 0.15rem 0 0.1rem;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
}
.fdc-stat-card--neutral .fdc-stat-card__value { color: var(--fdc-color-primary, #66a361); }
.fdc-stat-card--warn .fdc-stat-card__value { color: var(--fdc-color-text, #302921); }
.fdc-stat-card__value--loading { color: var(--fdc-color-text-muted, #61615a); opacity: 0.4; }
.fdc-stat-card__sub {
  font-size: 0.82rem;
  color: var(--fdc-color-text-muted, #61615a);
}
.fdc-stat-card__link {
  margin-top: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--_accent);
}
.fdc-stat-card--interactive { cursor: pointer; }
.fdc-stat-card--interactive:hover { border-color: var(--_accent); transform: translateY(-2px); }
</style>
