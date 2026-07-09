import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcToast from './FdcToast.vue'
import { useToast } from '../../composables/useToast'

const meta: Meta<typeof FdcToast> = {
  title: 'Composants/FdcToast',
  component: FdcToast,
}
export default meta
type Story = StoryObj<typeof FdcToast>

export const Interactif: Story = {
  render: () => ({
    components: { FdcToast },
    setup() {
      const { show } = useToast()
      return {
        success: () =>
          show({
            message: '2 renards enregistrés',
            tone: 'success',
            actionLabel: 'Voir mes captures',
            onAction: () => alert('navigation…'),
          }),
        info: () => show({ message: 'Enregistré hors-ligne, synchro à venir.', tone: 'info' }),
        danger: () => show({ message: 'Échec de l’enregistrement.', tone: 'danger', timeout: 0 }),
      }
    },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button @click="success">Succès + action</button>
        <button @click="info">Info</button>
        <button @click="danger">Erreur (persistant)</button>
        <FdcToast close-label="Fermer" />
      </div>`,
  }),
}
