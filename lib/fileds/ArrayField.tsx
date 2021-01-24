import { defineComponent, PropType } from 'vue'
import { fieldPropsDefined, Schema, SelectWidgetNames } from '../types'
import { useVJSFCContext } from '../context'
import { createUseStyles } from 'vue-jss'
import { getWidgets } from '../ThemeProvider'

const styles = createUseStyles({
  contain: {
    border: '1px solid #eee',
  },
  content: {
    padding: 10,
    border: '1px solid #eee',
  },
  action: {
    '& + &': {
      marginLeft: 10,
    },
  },
  actions: {
    textAlign: 'right',
    background: '#eee',
    padding: 10,
  },
})

const ArrayItemsWrap = defineComponent({
  name: 'ArrayItemsWrap',
  props: {
    onAdd: {
      type: Function as PropType<(i: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(i: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(i: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(i: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const styleRef = styles()
    return () => {
      const classes = styleRef.value
      return (
        <div class={classes.contain}>
          <div class={classes.actions}>
            <button
              class={classes.action}
              onClick={() => props.onAdd(props.index)}
            >
              新增
            </button>
            <button
              class={classes.action}
              onClick={() => props.onDelete(props.index)}
            >
              删除
            </button>
            <button
              class={classes.action}
              onClick={() => props.onUp(props.index)}
            >
              上移
            </button>
            <button
              class={classes.action}
              onClick={() => props.onDown(props.index)}
            >
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

export default defineComponent({
  name: 'ArrayField',
  props: fieldPropsDefined,
  setup(props) {
    const context = useVJSFCContext()
    function handleChange(v: any, k: number) {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[k] = v
      props.onChange(arr)
    }

    function handleAdd(index: number) {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }

    function handleDelete(index: number) {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }

    function handleUp(index: number) {
      if (index === 0) return
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)[0]
      arr.splice(index - 1, 0, item)
      props.onChange(arr)
    }

    function handleDown(index: number) {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length) return
      const item = arr.splice(index, 1)[0]
      arr.splice(index + 1, 0, item)
      props.onChange(arr)
    }
    const SelectWidget = getWidgets(SelectWidgetNames.Selection)
    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const { SchemaItem } = context
      const { value: SelectionRef } = SelectWidget
      const isMultiple = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum // 是否为多选
      if (isMultiple) {
        if (!schema.items) {
          throw Error('no')
        }
        const items: Schema[] = schema.items as any
        const valueArr = Array.isArray(value) ? value : []
        return items.map((item: Schema, index: number) => {
          const schemaItem = uiSchema.items
          const us = Array.isArray(schemaItem)
            ? schemaItem[index] || {}
            : schemaItem || {}
          return (
            <SchemaItem
              uiSchema={us}
              errorSchema={errorSchema[index] || {}}
              schema={item}
              value={valueArr[index]}
              rootSchema={rootSchema}
              key={index}
              onChange={(v: any) => handleChange(v, index)}
            />
          )
        })
      } else if (!isSelect) {
        const valueArr = Array.isArray(value) ? value : []
        return valueArr.map((v: any, index: number) => {
          return (
            <ArrayItemsWrap
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
              index={index}
            >
              <SchemaItem
                uiSchema={(uiSchema.items as any) || {}}
                errorSchema={errorSchema[index] || {}}
                schema={schema.items as any}
                value={v}
                key={index}
                rootSchema={rootSchema}
                onChange={(v: any) => handleChange(v, index)}
              />
            </ArrayItemsWrap>
          )
        })
      } else {
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((opt: any) => {
          return {
            value: opt,
            label: opt,
          }
        })
        return (
          <SelectionRef
            schema={props.schema}
            errors={errorSchema.__errors}
            options={options}
            value={props.value}
            onChange={props.onChange}
          ></SelectionRef>
        )
      }
    }
  },
})
