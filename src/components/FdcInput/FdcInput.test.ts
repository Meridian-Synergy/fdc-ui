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
    expect(wrapper.find('input').classes()).toContain('fdc-input--invalid')
  })

  it('révèle le mot de passe au clic sur le bouton œil (auto sur type=password)', async () => {
    // Pas de prop `revealable` : l'œil apparaît automatiquement sur un champ password.
    const wrapper = mount(FdcInput, { props: { type: 'password' } })
    const btn = wrapper.find('button.fdc-input__reveal')
    expect(btn.exists()).toBe(true)
    expect(wrapper.find('input').attributes('type')).toBe('password')
    await btn.trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('suit le pattern GOV.UK : pas d’aria-pressed, annonce live', async () => {
    const wrapper = mount(FdcInput, { props: { type: 'password' } })
    const btn = wrapper.find('button.fdc-input__reveal')
    expect(btn.attributes('aria-pressed')).toBeUndefined()
    await btn.trigger('click')
    expect(wrapper.find('[role="status"]').text().length).toBeGreaterThan(0)
  })

  it('transmet les attributs natifs (required) à l’input', () => {
    const wrapper = mount(FdcInput, { attrs: { required: true } })
    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })
})
