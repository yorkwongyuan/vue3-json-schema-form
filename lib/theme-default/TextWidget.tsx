import { defineComponent, computed } from 'vue'
import { commonThemeProps, CommonWidgetDefine } from '../types'
import { withFormItem } from '../theme-default/formItem'
const TextWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: commonThemeProps,
    setup(props) {
      const hanldeChange = (v: any) => {
        const value = v.target.value
        v.target.value = props.value
        props.onChange(value)
      }
      const styleRef = computed(() => {
        return { color: (props.options && props.options.color) || 'black' }
      })
      return () => {
        return (
          <div>
            <input
              onInput={hanldeChange}
              value={props.value as any}
              style={styleRef.value}
            />
          </div>
        )
      }
    },
  }),
)

export default TextWidget
