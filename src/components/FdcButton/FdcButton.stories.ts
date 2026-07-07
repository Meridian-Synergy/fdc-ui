import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcButton from './FdcButton.vue'

const meta: Meta<typeof FdcButton> = {
  title: 'Composants/FdcButton',
  component: FdcButton,
  args: { variant: 'primary', disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline'] },
  },
}
export default meta

type Story = StoryObj<typeof FdcButton>

export const Primary: Story = {
  render: (args) => ({
    components: { FdcButton },
    setup: () => ({ args }),
    template: '<FdcButton v-bind="args">Valider</FdcButton>',
  }),
}

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => ({
    components: { FdcButton },
    setup: () => ({ args }),
    template: '<FdcButton v-bind="args">Annuler</FdcButton>',
  }),
}
