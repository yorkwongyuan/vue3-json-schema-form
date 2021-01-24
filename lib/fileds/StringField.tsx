import { defineComponent, computed } from 'vue'
import { fieldPropsDefined, CommonWidgetNames } from '../types'
import { getWidgets } from '../ThemeProvider'
export default defineComponent({
  name: 'StringField',
  props: fieldPropsDefined,
  setup(props) {
    const textWidgetRef = computed(() => {
      const widgetRef = getWidgets(CommonWidgetNames.TextWidget, props.uiSchema)
      return widgetRef.value
    })
    const handleChange = (v: string) => {
      props.onChange(v)
    }
    const widgetOptionsRef = computed(() => {
      const { widget, items, properties, ...options } = props.uiSchema
      return options
    })
    return () => {
      const { errorSchema, ...rest } = props
      const TextWidget = textWidgetRef.value
      return (
        <div>
          <TextWidget
            options={widgetOptionsRef.value}
            {...rest}
            onChange={handleChange}
            errors={errorSchema.__errors || []}
          ></TextWidget>
        </div>
      )
    }
  },
})
