import { defineComponent, computed } from 'vue'
import { SchemaTypes, fieldPropsDefined } from './types'
import StringField from './fileds/StringField'
import NumberField from './fileds/NumberField'
import ObjectField from './fileds/ObjectField'
import ArrayField from './fileds/ArrayField'
import { retrieveSchema } from './utils'
export default defineComponent({
  name: 'SchemaItem',
  props: fieldPropsDefined,
  setup(props) {
    // 注意
    const retrievedSchemaRef = computed(() => {
      const { rootSchema, schema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })
    return () => {
      const { schema } = props
      const retrievedSchema = retrievedSchemaRef.value
      const type = schema.type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField
        }
      }
      return <Component {...props} schema={retrievedSchema}></Component>
    }
  },
})
