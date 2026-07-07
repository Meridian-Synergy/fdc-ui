import type { Preview } from '@storybook/vue3-vite'
import '../src/tokens/base.css'
import '../src/tokens/tokens.css'

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
}

export default preview
