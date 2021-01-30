import { CustomFormat, commonThemeProps } from '../../lib/types'
import { defineComponent, computed } from 'vue'
import { withFormItem } from '../../lib/theme-default/formItem'

const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9a-fA-F]{6}$/,
  },
  component: withFormItem(
    defineComponent({
      name: 'colorWidget',
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
                type="color"
                onInput={hanldeChange}
                value={props.value as any}
                style={styleRef.value}
              />
            </div>
          )
        }
      },
    }),
  ),
}
export default format
