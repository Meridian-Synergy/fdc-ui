import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcLogo from './FdcLogo.vue'

const meta: Meta<typeof FdcLogo> = {
  title: 'Composants/FdcLogo',
  component: FdcLogo,
  args: { size: 32 },
}
export default meta
type Story = StoryObj<typeof FdcLogo>

export const Defaut: Story = {}
export const Grand: Story = { args: { size: 56 } }
