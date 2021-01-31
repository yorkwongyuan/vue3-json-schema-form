import { defineComponent } from 'vue'
import { isObject } from '../utils'
import { fieldPropsDefined } from '../types'
import { useVJSFCContext } from '../context'

export default defineComponent({
  name: 'ObjectField',
  props: fieldPropsDefined,
  setup(props) {
    const context = useVJSFCContext()
    function handleChange(k: string, v: any) {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[k]
      } else {
        value[k] = v
      }
      props.onChange(value)
    }
    return () => {
      const { SchemaItem } = context
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((key: string, index: number) => {
        return (
          <SchemaItem
            uiSchema={uiSchema.properties ? uiSchema.properties[key] || {} : {}}
            errorSchema={errorSchema[key] || {}}
            schema={properties[key]}
            rootSchema={rootSchema}
            value={currentValue[key]}
            key={index}
            onChange={(v: any) => handleChange(key, v)}
          />
        )
      })
    }
  },
})
