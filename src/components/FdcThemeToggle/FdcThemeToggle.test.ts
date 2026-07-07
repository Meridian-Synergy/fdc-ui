import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcThemeToggle from './FdcThemeToggle.vue'
import FdcTextSizeToggle from '../FdcTextSizeToggle/FdcTextSizeToggle.vue'
import FdcLocaleSwitcher from '../FdcLocaleSwitcher/FdcLocaleSwitcher.vue'

describe('FdcThemeToggle', () => {
  it('bascule light → dark', async () => {
    const wrapper = mount(FdcThemeToggle, { props: { modelValue: 'light' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['dark'])
  })
})

describe('FdcTextSizeToggle', () => {
  it('augmente/diminue en bornant', async () => {
    const wrapper = mount(FdcTextSizeToggle, { props: { modelValue: 100 } })
    const [minus, plus] = wrapper.findAll('button')
    await plus.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([110])
    await minus.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([90])
  })

  it('ne dépasse pas le max', async () => {
    const wrapper = mount(FdcTextSizeToggle, { props: { modelValue: 130, max: 130 } })
    const plus = wrapper.findAll('button')[1]
    expect(plus.attributes('disabled')).toBeDefined()
  })
})

describe('FdcLocaleSwitcher', () => {
  it('émet la nouvelle locale', async () => {
    const wrapper = mount(FdcLocaleSwitcher, {
      props: { modelValue: 'fr', locales: [{ code: 'fr', name: 'Français' }, { code: 'en', name: 'English' }] },
    })
    await wrapper.find('select').setValue('en')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['en'])
  })
})
