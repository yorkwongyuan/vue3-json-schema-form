import { defineComponent, PropType } from 'vue'
import { useVJSFCContext } from '../context'
import { fieldPropsDefined, Schema } from '../types'
import { createUseStyles } from 'vue-jss'
const ArrayWrap = defineComponent({
  props: {
    index: {
      type: Number as PropType<number>,
      required: true,
    },
    onAdd: {
      type: Function as PropType<(i: number) => void>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const createStyles = createUseStyles({
      container: {
        border: '1px solid #eee',
      },
      actions: {
        background: '#eee',
        textAlign: 'right',
      },
      action: {
        background: '#232323',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        '& + &': {
          marginLeft: 4,
        },
      },
    })
    const classRef = createStyles()
    return () => {
      const classes = classRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button
              class={classes.action}
              onClick={() => props.onAdd(props.index)}
            >
              新增
            </button>
            <button class={classes.action}>删除</button>
            <button class={classes.action}>上移</button>
            <button class={classes.action}>下移</button>
          </div>
          <div>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

export default defineComponent({
  props: fieldPropsDefined,
  setup(props) {
    const { SchemaItem } = useVJSFCContext()
    return () => {
      const { schema, rootSchema, value } = props
      const items: Schema[] = schema.items as any
      const isMultiple = Array.isArray(items)
      const isSelect = schema.items && (schema.items as any).enum
      function handleChange(k: number, v: any) {
        const currentValue = Array.isArray(value) ? value : []
        currentValue[k] = v
        props.onChange(currentValue)
      }
      function handleAdd(i: number) {
        const valueArr = Array.isArray(value) ? value : []
        valueArr.splice(i + 1, 0, undefined)
        props.onChange(valueArr)
      }
      if (isMultiple) {
        const valueArr = Array.isArray(value) ? value : []
        return items.map((item: Schema, index: number) => {
          return (
            <SchemaItem
              schema={item}
              rootSchema={rootSchema}
              value={valueArr[index]}
              onChange={(v: any) => handleChange(index, v)}
            />
          )
        })
      } else if (!isSelect) {
        const valueArr = Array.isArray(value) ? value : []
        return valueArr.map((item: Schema, index: number) => {
          return (
            <ArrayWrap index={index} onAdd={handleAdd}>
              <SchemaItem
                schema={schema.items as any}
                rootSchema={rootSchema}
                value={item}
                onChange={(v) => handleChange(index, v)}
              />
            </ArrayWrap>
          )
        })
      }
      return {}
    }
  },
})
