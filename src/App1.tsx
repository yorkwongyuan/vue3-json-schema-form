import { defineComponent, Ref, ref } from 'vue'
import { createUseStyles } from 'vue-jss'
import MonacoEditor from './components/MonacoEditor'

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
})

const schema = {
  type: 'string',
}
function toJson(code: any) {
  return JSON.stringify(code, null, 2)
}
const codeRef: Ref<any> = ref(schema)

function handleCodeChange(code: string) {
  let schema: any
  try {
    schema = code
  } catch (err) {
    console.log(err, '错误')
  }
  codeRef.value = schema
}

export default defineComponent({
  setup() {
    const classesRef = useStyles()
    const code = toJson(codeRef.value)
    return () => {
      const classes = classesRef.value
      return (
        <div>
          <MonacoEditor
            class={classes.editor}
            code={code}
            onChange={handleCodeChange}
            title="haha"
          />
        </div>
      )
    }
  },
})
