import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FdcField from './FdcField.vue'
import FdcInput from '../FdcInput/FdcInput.vue'

const meta: Meta<typeof FdcField> = { title: 'Composants/FdcField', component: FdcField }
export default meta
type Story = StoryObj<typeof FdcField>

export const AvecInput: Story = {
  render: () => ({
    components: { FdcField, FdcInput },
    setup: () => ({ value: ref('') }),
    template: `
      <div style="max-width:320px">
        <FdcField label="Adresse e-mail" v-slot="{ id }">
          <FdcInput :id="id" v-model="value" type="email" placeholder="vous@exemple.fr" />
        </FdcField>
      </div>`,
  }),
}

export const EnErreur: Story = {
  render: () => ({
    components: { FdcField, FdcInput },
    setup: () => ({ value: ref('valeur') }),
    template: `
      <div style="max-width:320px">
        <FdcField label="Slug" error="Slug déjà utilisé" v-slot="{ id, invalid }">
          <FdcInput :id="id" v-model="value" :invalid="invalid" />
        </FdcField>
      </div>`,
  }),
}
