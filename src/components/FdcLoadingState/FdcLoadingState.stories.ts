import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcLoadingState from './FdcLoadingState.vue'
import FdcSpinner from '../FdcSpinner/FdcSpinner.vue'

const meta: Meta<typeof FdcLoadingState> = {
  title: 'Composants/FdcLoadingState',
  component: FdcLoadingState,
}
export default meta
type Story = StoryObj<typeof FdcLoadingState>

export const Bloc: Story = {
  args: { label: 'Chargement des organisations…' },
}

export const SpinnerInline: Story = {
  render: () => ({
    components: { FdcSpinner },
    template: `<span style="display:inline-flex;gap:8px;align-items:center">
      <FdcSpinner :size="14" /> Traitement inline…
    </span>`,
  }),
}
