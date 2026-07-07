import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FdcDataTable from './FdcDataTable.vue'
import FdcButton from '../FdcButton/FdcButton.vue'
import type { FdcColumn } from './types'

const columns: FdcColumn[] = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Nom' },
  { key: 'plan', label: 'Plan de chasse', align: 'center' },
]
const rows = [
  { id: '1', code: 'chevreuil', name: 'Chevreuil', plan: 'Oui' },
  { id: '2', code: 'cerf_elaphe', name: 'Cerf élaphe', plan: 'Oui' },
  { id: '3', code: 'sanglier', name: 'Sanglier', plan: 'Non' },
]

const meta: Meta<typeof FdcDataTable> = {
  title: 'Composants/FdcDataTable',
  component: FdcDataTable,
  args: { columns, rows, caption: 'Espèces du référentiel national' },
}
export default meta
type Story = StoryObj<typeof FdcDataTable>

export const Default: Story = {}

export const WithActions: Story = {
  render: (args) => ({
    components: { FdcDataTable, FdcButton },
    setup: () => ({ args }),
    template: `
      <FdcDataTable v-bind="args">
        <template #actions="{ row }">
          <FdcButton variant="outline" size="sm">Éditer {{ row.code }}</FdcButton>
        </template>
      </FdcDataTable>
    `,
  }),
}

export const Loading: Story = {
  args: { loading: true, loadingLabel: 'Chargement des espèces…' },
}

export const Empty: Story = {
  args: { rows: [], emptyLabel: 'Aucune espèce pour le moment' },
}
