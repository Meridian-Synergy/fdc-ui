import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcOAuthButtons from './FdcOAuthButtons.vue'

describe('FdcOAuthButtons', () => {
  const props = { googleLabel: 'Google', microsoftLabel: 'Microsoft' }

  it('émet le provider au clic', async () => {
    const wrapper = mount(FdcOAuthButtons, { props })
    const [google, microsoft] = wrapper.findAll('button')
    await google.trigger('click')
    await microsoft.trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual(['google'])
    expect(wrapper.emitted('select')?.[1]).toEqual(['azure'])
  })

  it('affiche les deux logos (svg)', () => {
    const wrapper = mount(FdcOAuthButtons, { props })
    expect(wrapper.findAll('svg').length).toBe(2)
  })
})
