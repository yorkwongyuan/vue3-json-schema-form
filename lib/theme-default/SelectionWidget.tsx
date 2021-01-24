import { defineComponent, ref, watch } from 'vue'
import { selectionThemeProps, SelectionWidgetDefine } from '../types'
import { withFormItem } from '../theme-default/formItem'
const SelectWidget: SelectionWidgetDefine = withFormItem(
  defineComponent({
    props: selectionThemeProps,
    setup(props) {
      const valueRef = ref(props.value)
      // 内部改变value
      watch(valueRef, (v: any) => {
        props.onChange(v)
      })
      // 外部改变value
      watch(
        () => props.value,
        (v: any) => {
          valueRef.value = v
        },
      )
      return () => {
        return (
          <select v-model={valueRef.value} multiple={true}>
            {props.options.map((opt) => {
              return <option value={opt.value}>{opt.label}</option>
            })}
          </select>
        )
      }
    },
  }),
)

export default SelectWidget
