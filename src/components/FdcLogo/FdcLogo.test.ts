import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcLogo from './FdcLogo.vue'

describe('FdcLogo', () => {
  it('rend un SVG accessible avec un viewBox', () => {
    const wrapper = mount(FdcLogo)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('role')).toBe('img')
    expect(svg.attributes('aria-label')).toBe('CDF 360')
    expect(svg.attributes('viewBox') ?? svg.attributes('viewbox')).toBeTruthy()
    expect(svg.findAll('path').length).toBeGreaterThan(0)
  })

  it('pilote la taille par la hauteur', () => {
    const wrapper = mount(FdcLogo, { props: { size: 48 } })
    expect(wrapper.find('svg').attributes('style')).toContain('48px')
  })
})
