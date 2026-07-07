import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcSpinner from './FdcSpinner.vue'
import FdcLoadingState from '../FdcLoadingState/FdcLoadingState.vue'

describe('FdcSpinner', () => {
  it('expose role=status et un aria-label', () => {
    const wrapper = mount(FdcSpinner, { props: { label: 'Chargement' } })
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.attributes('aria-label')).toBe('Chargement')
  })
})

describe('FdcLoadingState', () => {
  it('affiche le libellé fourni et contient un spinner', () => {
    const wrapper = mount(FdcLoadingState, { props: { label: 'Chargement des orgs' } })
    expect(wrapper.text()).toContain('Chargement des orgs')
    expect(wrapper.findComponent(FdcSpinner).exists()).toBe(true)
  })
})
