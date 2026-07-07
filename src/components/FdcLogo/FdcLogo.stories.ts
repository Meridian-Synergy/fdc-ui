import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcLogo from './FdcLogo.vue'

const meta: Meta<typeof FdcLogo> = {
  title: 'Composants/FdcLogo',
  component: FdcLogo,
  args: { size: 30, wordmark: true },
}
export default meta
type Story = StoryObj<typeof FdcLogo>

export const Complet: Story = {}
export const EmblemeSeul: Story = { args: { wordmark: false, size: 40 } }
