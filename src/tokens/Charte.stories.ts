import type { Meta, StoryObj } from '@storybook/vue3-vite'

// Documente la palette de charte FDC (dérivée de chasseurdefrance.com).
const meta: Meta = { title: 'Charte/Palette' }
export default meta
type Story = StoryObj

const swatches = [
  ['--fdc-color-primary', 'Primary'],
  ['--fdc-color-primary-hover', 'Primary hover'],
  ['--fdc-color-primary-soft', 'Primary soft'],
  ['--fdc-color-accent', 'Accent (lime)'],
  ['--fdc-color-earth', 'Earth (tan)'],
  ['--fdc-color-text', 'Texte'],
  ['--fdc-color-text-muted', 'Texte muted'],
  ['--fdc-color-surface-alt', 'Surface alt'],
  ['--fdc-color-border', 'Bordure'],
  ['--fdc-color-danger', 'Danger'],
  ['--fdc-color-warn', 'Warn'],
  ['--fdc-color-info', 'Info'],
]

export const Palette: Story = {
  render: () => ({
    setup: () => ({ swatches }),
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;font-family:var(--fdc-font-sans)">
        <div v-for="[token,label] in swatches" :key="token"
             style="border:1px solid var(--fdc-color-border);border-radius:8px;overflow:hidden">
          <div :style="{background:'var('+token+')',height:'56px'}"></div>
          <div style="padding:6px 8px;font-size:12px">
            <strong>{{ label }}</strong><br><code>{{ token }}</code>
          </div>
        </div>
      </div>`,
  }),
}
