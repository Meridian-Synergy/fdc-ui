import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcAlert from './FdcAlert.vue'

const meta: Meta<typeof FdcAlert> = {
  title: 'Composants/FdcAlert',
  component: FdcAlert,
  argTypes: { tone: { control: 'select', options: ['info', 'success', 'warn', 'danger'] } },
}
export default meta
type Story = StoryObj<typeof FdcAlert>

export const Tons: Story = {
  render: () => ({
    components: { FdcAlert },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;max-width:420px">
        <FdcAlert tone="info">Information contextuelle.</FdcAlert>
        <FdcAlert tone="success">Enregistrement réussi.</FdcAlert>
        <FdcAlert tone="warn">Attention, vérifiez ce point.</FdcAlert>
        <FdcAlert tone="danger">Une erreur est survenue.</FdcAlert>
      </div>`,
  }),
}
