import { defineComponent } from 'vue'
import { fieldPropsDefined, CommonWidgetNames } from '../types'
import { getWidgets } from '../ThemeProvider'
export default defineComponent({
  name: 'NumberField',
  props: fieldPropsDefined,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e
      const num = Number(value)
      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    const NumberWidgetRef = getWidgets(CommonWidgetNames.NumberWidget)
    return () => {
      const { errorSchema, ...rest } = props
      const NumberWidget = NumberWidgetRef.value
      return (
        <div>
          <NumberWidget
            {...rest}
            onChange={handleChange}
            errors={errorSchema.__errors || []}
          ></NumberWidget>
        </div>
      )
    }
  },
})
