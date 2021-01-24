import { defineComponent, inject, DefineComponent } from 'vue'
import { fieldPropsDefined } from '../types'
import { SchemaKeyIndexRef } from '../context'
import { isObject } from '../utils'

// type SchemaItemDefine = typeof HelperComponent
// 理论上可以
type SchemaItemDefine = DefineComponent<typeof fieldPropsDefined>
export default defineComponent({
  name: 'ObjectField',
  props: fieldPropsDefined,
  setup(props) {
    const context: { SchemaItem: SchemaItemDefine } | undefined = inject(
      SchemaKeyIndexRef,
    )
    if (!context?.SchemaItem) {
      throw Error('Can not find SchemaItem')
    }
    const handleChange = (k: string, v: any) => {
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
      const { schema, rootSchema, value } = props
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          rootSchema={rootSchema}
          schema={properties[k]}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleChange(k, v)}
        />
      ))
    }
  },
})
