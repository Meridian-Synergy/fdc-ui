import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcStatCard from './FdcStatCard.vue'

const meta: Meta<typeof FdcStatCard> = {
  title: 'Composants/FdcStatCard',
  component: FdcStatCard,
  args: { label: 'Prélèvements', value: 51, tone: 'neutral', interactive: false },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'green', 'gold', 'warn', 'sky'] },
  },
}
export default meta
type Story = StoryObj<typeof FdcStatCard>

export const Default: Story = {}

export const Grid: Story = {
  render: () => ({
    components: { FdcStatCard },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;max-width:760px">
        <FdcStatCard label="Prélèvements" :value="51" />
        <FdcStatCard label="Captures piégeage" :value="68" tone="green" />
        <FdcStatCard label="Volières actives" :value="4" tone="gold" />
        <FdcStatCard label="Saison en cours" value="2026-2027" tone="sky" />
      </div>`,
  }),
}
