import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcAlert from './FdcAlert.vue'

describe('FdcAlert', () => {
  it('applique le ton et role=alert', () => {
    const wrapper = mount(FdcAlert, { props: { tone: 'danger' }, slots: { default: 'Oups' } })
    expect(wrapper.classes()).toContain('fdc-alert--danger')
    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.text()).toBe('Oups')
  })

  it('ton info par défaut', () => {
    const wrapper = mount(FdcAlert, { slots: { default: 'Info' } })
    expect(wrapper.classes()).toContain('fdc-alert--info')
  })
})
