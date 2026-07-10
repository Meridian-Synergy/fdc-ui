import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FdcLocaleSwitcher from './FdcLocaleSwitcher.vue'
// La CSS des drapeaux est fournie par l'app consommatrice ; on l'importe ici juste
// pour l'aperçu Storybook.
import 'flag-icons/css/flag-icons.min.css'

const LOCALES = [
  { code: 'fr', name: 'Français', flag: 'fr' },
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'it', name: 'Italiano', flag: 'it' },
  { code: 'es', name: 'Español', flag: 'es' },
  { code: 'de', name: 'Deutsch', flag: 'de' },
  { code: 'nl', name: 'Nederlands', flag: 'nl' },
]

const meta: Meta<typeof FdcLocaleSwitcher> = {
  title: 'Composants/FdcLocaleSwitcher',
  component: FdcLocaleSwitcher,
}
export default meta
type Story = StoryObj<typeof FdcLocaleSwitcher>

export const Defaut: Story = {
  render: () => ({
    components: { FdcLocaleSwitcher },
    setup() {
      const locale = ref('fr')
      return { locale, LOCALES }
    },
    template: `
      <div style="padding: 4rem; display:flex; justify-content:flex-end;">
        <FdcLocaleSwitcher v-model="locale" :locales="LOCALES" label="Langue" />
      </div>`,
  }),
}

export const Sombre: Story = {
  render: () => ({
    components: { FdcLocaleSwitcher },
    setup() {
      const locale = ref('en')
      return { locale, LOCALES }
    },
    template: `
      <div data-theme="dark" style="background: var(--fdc-color-surface-alt); padding: 4rem; display:flex; justify-content:flex-end;">
        <FdcLocaleSwitcher v-model="locale" :locales="LOCALES" label="Langue" />
      </div>`,
  }),
}
