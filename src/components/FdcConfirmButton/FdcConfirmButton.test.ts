import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdcConfirmButton from './FdcConfirmButton.vue'

const base = {
  label: 'Supprimer',
  confirmLabel: 'Oui',
  cancelLabel: 'Annuler',
  question: 'Confirmer ?',
}

describe('FdcConfirmButton', () => {
  it('n’émet rien au premier clic, révèle la confirmation', async () => {
    const w = mount(FdcConfirmButton, { props: base })
    expect(w.text()).toContain('Supprimer')
    await w.find('button').trigger('click')
    expect(w.emitted('confirm')).toBeFalsy()
    expect(w.text()).toContain('Confirmer ?')
    expect(w.text()).toContain('Oui')
    expect(w.text()).toContain('Annuler')
  })

  it('émet confirm au clic sur Confirmer', async () => {
    const w = mount(FdcConfirmButton, { props: base })
    await w.find('button').trigger('click')
    const btns = w.findAll('button')
    await btns[0].trigger('click') // « Oui »
    expect(w.emitted('confirm')).toHaveLength(1)
    expect(w.text()).toContain('Supprimer') // revenu à l'état initial
  })

  it('Annuler revient à l’état initial sans émettre', async () => {
    const w = mount(FdcConfirmButton, { props: base })
    await w.find('button').trigger('click')
    const btns = w.findAll('button')
    await btns[1].trigger('click') // « Annuler »
    expect(w.emitted('confirm')).toBeFalsy()
    expect(w.text()).toContain('Supprimer')
  })
})
