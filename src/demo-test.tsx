import { defineComponent, Ref, ref } from 'vue'
import MonacoEditor from './components/MonacoEditor'
import { createUseStyles } from 'vue-jss'

const schema = {
  type: 'string',
}
function toJson(schema: any) {
  return JSON.stringify(schema, null, 2) // 2表示缩进2位
}

const nameRef: Ref<any> = ref(schema) // ref?

function handleChange(code: string) {
  let schema: any
  try {
    schema = JSON.parse(code)
  } catch (err) {
    console.log('错误-->', err)
  }
  nameRef.value = schema
}

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
})

export default defineComponent({
  setup() {
    const classRef = useStyles()
    return () => {
      const classes = classRef.value
      const code = toJson(nameRef.value)
      return (
        <div>
          <MonacoEditor
            class={classes.editor}
            code={code}
            onChange={handleChange}
            title="hehe"
          />
        </div>
      )
    }
  },
})
