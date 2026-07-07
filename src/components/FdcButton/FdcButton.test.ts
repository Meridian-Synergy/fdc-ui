import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcButton from './FdcButton.vue'

describe('FdcButton', () => {
  it('renders slot content and default variant', () => {
    const wrapper = mount(FdcButton, { slots: { default: 'Valider' } })
    expect(wrapper.text()).toBe('Valider')
    expect(wrapper.classes()).toContain('fdc-button--primary')
  })

  it('applies the outline variant', () => {
    const wrapper = mount(FdcButton, { props: { variant: 'outline' } })
    expect(wrapper.classes()).toContain('fdc-button--outline')
  })

  it('honors disabled', () => {
    const wrapper = mount(FdcButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
