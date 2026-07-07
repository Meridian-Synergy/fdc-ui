import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcDataTable from './FdcDataTable.vue'
import type { FdcColumn } from './types'

const columns: FdcColumn[] = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Nom' },
]
const rows = [
  { id: '1', code: 'chevreuil', name: 'Chevreuil' },
  { id: '2', code: 'sanglier', name: 'Sanglier' },
]

describe('FdcDataTable', () => {
  it('rend les en-têtes et les lignes', () => {
    const wrapper = mount(FdcDataTable, { props: { columns, rows } })
    const ths = wrapper.findAll('thead th')
    expect(ths.map((t) => t.text())).toEqual(['Code', 'Nom'])
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    expect(wrapper.text()).toContain('Chevreuil')
  })

  it('affiche l\'état de chargement plutôt que la table', () => {
    const wrapper = mount(FdcDataTable, {
      props: { columns, rows, loading: true, loadingLabel: 'Chargement…' },
    })
    expect(wrapper.find('table').exists()).toBe(false)
    expect(wrapper.text()).toContain('Chargement…')
  })

  it('affiche l\'état vide quand aucune ligne', () => {
    const wrapper = mount(FdcDataTable, {
      props: { columns, rows: [], emptyLabel: 'Rien ici' },
    })
    expect(wrapper.find('table').exists()).toBe(false)
    expect(wrapper.text()).toContain('Rien ici')
  })

  it('ajoute une colonne actions quand le slot est fourni', () => {
    const wrapper = mount(FdcDataTable, {
      props: { columns, rows, actionsLabel: 'Actions' },
      slots: { actions: '<button>edit</button>' },
    })
    const headers = wrapper.findAll('thead th')
    expect(headers).toHaveLength(3)
    expect(headers[2].text()).toBe('Actions')
  })

  it('utilise le slot de cellule personnalisé', () => {
    const wrapper = mount(FdcDataTable, {
      props: { columns, rows },
      slots: { 'cell-code': '<template #cell-code="{ value }"><em>{{ value }}</em></template>' },
    })
    expect(wrapper.find('tbody em').text()).toBe('chevreuil')
  })

  it('affiche un tiret pour une valeur nulle', () => {
    const wrapper = mount(FdcDataTable, {
      props: { columns, rows: [{ id: '3', code: 'renard', name: null }] },
    })
    expect(wrapper.find('tbody tr').text()).toContain('—')
  })
})
