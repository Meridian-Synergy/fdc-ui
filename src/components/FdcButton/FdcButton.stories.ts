import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcButton from './FdcButton.vue'

const meta: Meta<typeof FdcButton> = {
  title: 'Composants/FdcButton',
  component: FdcButton,
  args: { variant: 'primary', size: 'md', disabled: false, block: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'danger'] },
    size: { control: 'select', options: ['lg', 'md', 'sm'] },
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

export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => ({
    components: { FdcButton },
    setup: () => ({ args }),
    template: '<FdcButton v-bind="args">Supprimer</FdcButton>',
  }),
}
