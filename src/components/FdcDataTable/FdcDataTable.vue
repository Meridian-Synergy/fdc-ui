<script setup lang="ts">
// Table de données accessible pour le backoffice (référentiels, listes CRUD).
// Un vrai <table> sémantique (thead/tbody, scope="col", caption) — public
// 50–70 ans, a11y = pilier du DS. États loading / empty gérés via le slot
// standard FdcLoadingState. i18n-agnostique : tous les libellés sont passés.
//
// Slots :
//   - `cell-<key>`  : rendu personnalisé d'une cellule → { row, value }
//   - `actions`     : actions par ligne (crée une colonne dédiée) → { row }
import type { FdcColumn } from './types'
import FdcLoadingState from '../FdcLoadingState/FdcLoadingState.vue'

type Row = Record<string, unknown>

const props = withDefaults(
  defineProps<{
    columns: FdcColumn[]
    rows: Row[]
    rowKey?: string
    loading?: boolean
    loadingLabel?: string
    emptyLabel?: string
    /** légende du tableau (a11y) ; masquée visuellement mais lue par les AT. */
    caption?: string
    actionsLabel?: string
    /** sans cadre propre (bordure + rayon) : à utiliser quand le tableau est
        déjà posé dans une surface (FdcCard) pour éviter le double encadrement. */
    flat?: boolean
  }>(),
  {
    rowKey: 'id',
    loading: false,
    loadingLabel: 'Chargement',
    emptyLabel: 'Aucune donnée',
    caption: '',
    actionsLabel: 'Actions',
    flat: false,
  },
)

function keyOf(row: Row, index: number): string | number {
  const v = row[props.rowKey]
  return typeof v === 'string' || typeof v === 'number' ? v : index
}
</script>

<template>
  <FdcLoadingState v-if="loading" :label="loadingLabel" />

  <p v-else-if="rows.length === 0" class="fdc-datatable__empty">{{ emptyLabel }}</p>

  <div v-else class="fdc-datatable__scroll" :class="{ 'fdc-datatable__scroll--flat': flat }">
    <table class="fdc-datatable">
      <caption v-if="caption" class="fdc-datatable__caption">{{ caption }}</caption>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            :class="`fdc-datatable__th--${col.align ?? 'left'}`"
            :style="col.width ? { width: col.width } : undefined"
          >
            {{ col.label }}
          </th>
          <th v-if="$slots.actions" scope="col" class="fdc-datatable__th--right">
            {{ actionsLabel }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="keyOf(row, index)">
          <td
            v-for="col in columns"
            :key="col.key"
            :class="`fdc-datatable__td--${col.align ?? 'left'}`"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] ?? '—' }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="fdc-datatable__td--right fdc-datatable__actions">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.fdc-datatable__scroll {
  overflow-x: auto;
  border: 1px solid var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-lg, 14px);
}
/* Posé dans une surface (FdcCard) : pas de cadre propre → évite le double bord. */
.fdc-datatable__scroll--flat {
  border: 0;
  border-radius: 0;
}
.fdc-datatable {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  color: var(--fdc-color-text, #302921);
  background: var(--fdc-color-surface, #ffffff);
}
.fdc-datatable__caption {
  text-align: left;
  padding: var(--fdc-space-3, 0.75rem) var(--fdc-space-4, 1rem);
  color: var(--fdc-color-text-muted, #61615a);
  font-size: 0.9rem;
}
.fdc-datatable th,
.fdc-datatable td {
  padding: var(--fdc-space-3, 0.75rem) var(--fdc-space-4, 1rem);
  border-bottom: 1px solid var(--fdc-color-border, #e7e7e7);
  font-size: 0.95rem;
  vertical-align: middle;
}
.fdc-datatable thead th {
  background: var(--fdc-color-surface-alt, #f5f5f1);
  font-weight: 600;
  white-space: nowrap;
}
.fdc-datatable tbody tr:last-child td {
  border-bottom: none;
}
.fdc-datatable tbody tr:hover,
.fdc-datatable tbody tr:focus-within {
  background: var(--fdc-color-primary-soft, #eaf2e9);
}
.fdc-datatable__th--left,
.fdc-datatable__td--left {
  text-align: left;
}
.fdc-datatable__th--center,
.fdc-datatable__td--center {
  text-align: center;
}
.fdc-datatable__th--right,
.fdc-datatable__td--right {
  text-align: right;
}
/* barre d'actions par ligne : le gap doit vivre sur le CONTENEUR flex pour
   séparer réellement les cibles (bug 2026-07-07 : gap posé sur `> *` = sans
   effet entre boutons). Alignées à droite, sur une seule ligne. */
.fdc-datatable__actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--fdc-space-2, 0.5rem);
  white-space: nowrap;
}
.fdc-datatable__empty {
  margin: 0;
  padding: var(--fdc-space-6, 2rem);
  text-align: center;
  color: var(--fdc-color-text-muted, #61615a);
  font-family: var(--fdc-font-sans, system-ui, sans-serif);
  background: var(--fdc-color-surface, #ffffff);
  border: 1px dashed var(--fdc-color-border, #e7e7e7);
  border-radius: var(--fdc-radius-lg, 14px);
}
</style>
