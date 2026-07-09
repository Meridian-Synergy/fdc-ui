import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcConfirmButton from './FdcConfirmButton.vue'

const meta: Meta<typeof FdcConfirmButton> = {
  title: 'Composants/FdcConfirmButton',
  component: FdcConfirmButton,
}
export default meta
type Story = StoryObj<typeof FdcConfirmButton>

export const Danger: Story = {
  render: () => ({
    components: { FdcConfirmButton },
    setup() {
      return { onConfirm: () => alert('confirmé') }
    },
    template: `
      <FdcConfirmButton
        label="Supprimer"
        question="Confirmer ?"
        confirm-label="Oui, supprimer"
        cancel-label="Annuler"
        @confirm="onConfirm"
      />`,
  }),
}
