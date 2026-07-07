import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcLogo from './FdcLogo.vue'

describe('FdcLogo', () => {
  it('affiche le mot-marque FDC 360 par défaut', () => {
    const wrapper = mount(FdcLogo)
    expect(wrapper.text().replace(/\s+/g, '')).toContain('FDC360')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('peut masquer le mot-marque (emblème seul)', () => {
    const wrapper = mount(FdcLogo, { props: { wordmark: false } })
    expect(wrapper.find('.fdc-logo__wm').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
