import {
  defineComponent,
  provide,
  PropType,
  inject,
  ComputedRef,
  computed,
  ref,
  ExtractPropTypes,
} from 'vue'
import {
  Theme,
  CommonWidgetDefine,
  CommonWidgetNames,
  SelectWidgetNames,
  fieldPropsDefined,
} from './types'
import { isObject } from './utils'
import { useVJSFCContext } from './context'
const SYMBOL_KEY = Symbol()
export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const themeRef = computed(() => props.theme)
    provide(SYMBOL_KEY, themeRef)
    return () => {
      return <div>{slots.default && slots.default()}</div>
    }
  },
})

// 获取widgets
export function getWidgets<T extends CommonWidgetNames | SelectWidgetNames>(
  name: T,
  props?: ExtractPropTypes<typeof fieldPropsDefined>,
) {
  const { formatMapRef } = useVJSFCContext()
  if (props) {
    const { uiSchema, schema } = props
    if (schema.format) {
      if (formatMapRef.value[schema.format]) {
        return ref(formatMapRef.value[schema.format])
      }
    }
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget as CommonWidgetDefine)
    }
  }

  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    SYMBOL_KEY,
  )
  if (!context) {
    throw new Error()
  }
  return computed(() => context.value.widgets[name])
}
