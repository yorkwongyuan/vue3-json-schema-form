import { defineComponent, Ref, ref, watchEffect, reactive } from 'vue'
import demos from './demos'
import { createUseStyles } from 'vue-jss'
import MonacoEditor from './components/MonacoEditor'
import FormSchema from '../lib/index'
import { Schema, SchemaTypes } from '../lib/types'
import themeDefault from '../lib/theme-default/index'
import ThemeProvider from '../lib/ThemeProvider'
import customFormat from './plugins/customFormat'
type UISchema = any

// 样式
const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
  code: {
    width: 700,
    flexShrink: 0,
  },
  content: {
    display: 'flex',
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
})

export default defineComponent({
  setup() {
    const classRef = useStyles()
    const selectedRef: Ref<number> = ref(0)
    const contextRef = ref()
    function toJson(data: any) {
      return JSON.stringify(data, null, 2)
    }
    const demo: {
      schema: Schema
      data: any
      uiSchema: UISchema
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
      customValidate: ((d: any, e: any) => void) | undefined
    } = reactive({
      schema: { type: SchemaTypes.STRING },
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined,
    })

    function handleChange(v: any) {
      console.log(v, 'vvv')
      demo.data = v
      demo.dataCode = toJson(v)
    }

    function handleCodeChange(
      field: 'schema' | 'uiSchema' | 'data',
      value: string,
    ) {
      try {
        demo[field] = JSON.parse(value)
        ;(demo as any)[field + 'Code'] = value
      } catch (err) {
        console.log(err, 'error错误')
      }
    }
    // ts中的函数竟然要定义了才能用
    function hanldeSchemaChange(v: string) {
      return handleCodeChange('schema', v)
    }
    function hanldeUISchemaChange(v: string) {
      return handleCodeChange('uiSchema', v)
    }
    function hanldeDataChange(v: string) {
      return handleCodeChange('data', v)
    }

    watchEffect(() => {
      const index = selectedRef.value
      const d: any = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.dataCode = toJson(d.default)
      demo.schemaCode = toJson(d.schema)
      demo.uiSchemaCode = toJson(d.uiSchema)
      demo.customValidate = d.customValidate
    })
    function validateForm() {
      contextRef.value.doValidate().then((res: any) => {
        console.log(res, 'result')
      })
    }
    return () => {
      const classes = classRef.value
      const selected = selectedRef.value
      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>json-schema 动态表单组件库</h1>
            <div>
              {demos.map((item, index) => (
                <button
                  onClick={() => (selectedRef.value = index)}
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                class={classes.codePanel}
                code={demo.schemaCode}
                onChange={hanldeSchemaChange}
                title="Schema"
              ></MonacoEditor>
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  class={classes.codePanel}
                  code={demo.uiSchemaCode}
                  onChange={hanldeUISchemaChange}
                  title="uiSchema"
                ></MonacoEditor>
                <MonacoEditor
                  class={classes.codePanel}
                  code={demo.dataCode}
                  onChange={hanldeDataChange}
                  title="data"
                ></MonacoEditor>
              </div>
            </div>
            <div class={classes.form}>
              <ThemeProvider theme={themeDefault}>
                <FormSchema
                  customFormats={customFormat}
                  uiSchema={demo.uiSchema || {}}
                  contextRef={contextRef}
                  schema={demo.schema}
                  value={demo.data}
                  onChange={handleChange}
                  customValidate={demo.customValidate}
                ></FormSchema>
              </ThemeProvider>
              <button onClick={validateForm}>保存</button>
            </div>
          </div>
        </div>
      )
    }
  },
})
