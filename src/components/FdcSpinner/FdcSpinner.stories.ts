import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcSpinner from './FdcSpinner.vue'

const meta: Meta<typeof FdcSpinner> = {
  title: 'Composants/FdcSpinner',
  component: FdcSpinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Unique indicateur de chargement des surfaces FDC : un anneau de points vert-marque ' +
          '(primary) qui s’estompent autour du cercle en tournant. Theme-safe — la traîne ' +
          's’estompe par opacité (pas de couleur claire/sombre figée), donc le rendu est ' +
          'identique en thème clair et sombre. Auto-suffisant (porte ses keyframes) et respecte ' +
          'prefers-reduced-motion. Décoratif par défaut — passer `label` pour l’annoncer ' +
          'comme statut accessible (role="status").',
      },
    },
  },
  argTypes: {
    size: { control: { type: 'number' } },
    label: { control: { type: 'text' } },
  },
}
export default meta

type Story = StoryObj<typeof FdcSpinner>

export const Default: Story = { args: { size: 32 } }

export const WithLabel: Story = {
  args: { size: 32, label: 'Chargement…' },
}

export const Sizes: Story = {
  render: () => ({
    components: { FdcSpinner },
    template: `
      <div style="display:flex; align-items:center; gap:24px;">
        <FdcSpinner :size="16" />
        <FdcSpinner :size="24" />
        <FdcSpinner :size="32" />
        <FdcSpinner :size="48" />
      </div>
    `,
  }),
}

// Rend sur les deux thèmes : les points sont l'accent primary, l'estompe est en opacité.
export const OnLight: Story = {
  render: () => ({
    components: { FdcSpinner },
    template: `
      <div style="padding:40px; background:#ffffff; display:inline-flex;">
        <FdcSpinner :size="48" />
      </div>
    `,
  }),
}

export const OnDark: Story = {
  render: () => ({
    components: { FdcSpinner },
    template: `
      <div data-theme="dark" style="padding:40px; background:#1b1611; display:inline-flex;">
        <FdcSpinner :size="48" />
      </div>
    `,
  }),
}

export const LoadingBlock: Story = {
  render: () => ({
    components: { FdcSpinner },
    template: `
      <div style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:56px 24px; text-align:center;">
        <FdcSpinner :size="40" />
        <p style="font-size:0.9rem; font-weight:700; margin:0;">Chargement…</p>
      </div>
    `,
  }),
}
