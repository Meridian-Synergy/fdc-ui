import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcInput from './FdcInput.vue'

describe('FdcInput', () => {
  it('émet update:modelValue à la saisie', async () => {
    const wrapper = mount(FdcInput, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('bonjour')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['bonjour'])
  })

  it('marque aria-invalid quand invalid', () => {
    const wrapper = mount(FdcInput, { props: { invalid: true } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.classes()).toContain('fdc-input--invalid')
  })
})
