import { defineComponent } from 'vue'
import { commonThemeProps, CommonWidgetDefine } from '../../lib/types'
import { withFormItem } from '../../lib/theme-default/formItem'
const PasswordWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
    props: commonThemeProps,
    setup(props) {
      const hanldeChange = (v: any) => {
        const value = v.target.value
        v.target.value = props.value
        props.onChange(value)
      }
      return () => {
        return (
          <div>
            <input
              onInput={hanldeChange}
              value={props.value as any}
              type="password"
            />
          </div>
        )
      }
    },
  }),
)

export default PasswordWidget
