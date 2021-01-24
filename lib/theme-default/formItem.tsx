import { defineComponent } from 'vue'
import { commonThemeProps } from '../types'
import { createUseStyles } from 'vue-jss'
const FormItem = defineComponent({
  props: commonThemeProps,
  name: 'FormItem',
  setup(props, { slots }) {
    const styles = createUseStyles({
      container: {
        display: 'flex',
      },
      bigFont: {
        fontSize: '11px',
      },
      errorFont: {
        color: 'red',
        fontSize: '12px',
        padding: 0,
        paddingLeft: 20,
      },
    })
    const stylesRef = styles()
    return () => {
      const { errors, schema } = props
      return (
        <div>
          <label class={stylesRef.value.bigFont}> {schema.title}</label>
          <div>{slots.default && slots.default()}</div>
          <div>
            <ul class={stylesRef.value.errorFont}>
              {errors?.map((err) => {
                return <li>{err}</li>
              })}
            </ul>
          </div>
        </div>
      )
    }
  },
})
export default FormItem
export function withFormItem(Widget: any) {
  return defineComponent({
    name: `wrapper${Widget}`,
    props: commonThemeProps,
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs}></Widget>
          </FormItem>
        )
      }
    },
  }) as any
}
