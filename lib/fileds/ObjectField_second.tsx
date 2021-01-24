import { defineComponent, inject, DefineComponent } from 'vue'
import { fieldPropsDefined } from '../types'
import { SchemaKeyIndexRef } from '../context'
import { isObject } from '../utils'

type SchemaItemDefineType = DefineComponent<typeof fieldPropsDefined>
// 一个负责递归的组件
export default defineComponent({
  name: 'ObjectField',
  props: fieldPropsDefined,
  setup(props) {
    const context: { SchemaItem: SchemaItemDefineType } | undefined = inject(
      SchemaKeyIndexRef,
    )
    if (!context?.SchemaItem) {
      throw Error('错误了')
    }
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
      const { schema, rootSchema, value, onChange } = props
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      const { SchemaItem } = context
      return Object.keys(properties).map((k: string, index: number) => {
        return (
          <SchemaItem
            schema={properties[k]}
            rootSchema={rootSchema}
            value={currentValue[k]}
            key={index}
            onChange={(v: any) => handleChange(k, v)}
          />
        )
      })
    }
  },
})
