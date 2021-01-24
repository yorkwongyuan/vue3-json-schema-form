import { defineComponent, PropType } from 'vue'
import JsonSchema, { Schema } from '../../../lib'
import ThemeProvider from '../../../lib/theme2'
import ThemeDefault from '../../../lib/theme-default'

const ThemeDefaultProvider = defineComponent({
  name: 'ThemeDefaultProvider',
  setup(props, { slots }) {
    return () => (
      <ThemeProvider theme={ThemeDefault}>
        {slots.default && slots.default()}
      </ThemeProvider>
    )
  },
})

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <ThemeDefaultProvider>
        <JsonSchema {...props}></JsonSchema>
      </ThemeDefaultProvider>
    )
  },
})
