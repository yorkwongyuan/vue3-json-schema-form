import {
  defineComponent,
  provide,
  PropType,
  inject,
  ComputedRef,
  computed,
  ref,
} from 'vue'
import {
  Theme,
  UISchema,
  CommonWidgetDefine,
  CommonWidgetNames,
  SelectWidgetNames,
} from './types'
import { isObject } from './utils'
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
  uiSchema?: UISchema,
) {
  if (uiSchema?.widget && isObject(uiSchema.widget)) {
    return ref(uiSchema.widget as CommonWidgetDefine)
  }
  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    SYMBOL_KEY,
  )
  if (!context) {
    throw new Error()
  }
  return computed(() => context.value.widgets[name])
}
