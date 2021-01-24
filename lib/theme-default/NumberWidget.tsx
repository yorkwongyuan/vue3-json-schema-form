import { defineComponent } from 'vue'
import { commonThemeProps, CommonWidgetDefine } from '../types'
import { withFormItem } from '../theme-default/formItem'

const TextWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: commonThemeProps,
    setup(props) {
      const hanldeChange = (v: any) => {
        console.log(v.target.value, 'v')
        const value = v.target.value
        v.target.value = props.value
        props.onChange(value)
      }
      return () => (
        <input
          onInput={hanldeChange}
          value={props.value as any}
          type="number"
        />
      )
    },
  }),
)

export default TextWidget
