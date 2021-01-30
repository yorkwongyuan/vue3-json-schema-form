import {
  defineComponent,
  provide,
  reactive,
  PropType,
  Ref,
  watch,
  shallowRef,
  watchEffect,
  ref,
  computed,
} from 'vue'
import { SchemaKeyIndexRef } from './context'
import SchemaItem from './SchemaItem'
import { Schema, UISchema, CustomFormat, CommonWidgetDefine } from './types'
import Ajv, { Options } from 'ajv'
import {
  validateFormData,
  ErrorSchema,
  TransformedErrorObject,
} from './validator'

interface ContextRef {
  doValidate: () => Promise<{
    errors: TransformedErrorObject[]
    valid: boolean
    errorSchema: ErrorSchema | undefined
  }>
}

const defaultAjvOptions: Options = {
  // jsonPointers: true,
  allErrors: true,
}
export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
    customFormats: {
      // 有可能是数组也有可能是对象
      type: [Object, Array] as PropType<CustomFormat[] | CustomFormat>,
    },
  },
  setup(props) {
    const onChange = function(v: any) {
      props.onChange(v)
    }

    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
      // 如果自定义了format
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        customFormats.forEach((format) => {
          validatorRef.value.addFormat(format.name, format.definition)
        })
      }
    })
    const validateResolveRef = ref()
    const validateIndex = ref(0)
    // 校验函数
    async function doValidate() {
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        props.schema,
        props.value,
        validatorRef.value,
        'zh',
        props.customValidate,
      )
      if (index !== validateIndex.value) {
        return
      }
      errorSchemaRef.value = result.errorSchema
      // return result
      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }
    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      { deep: true },
    )
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          console.log('初始化了')
          props.contextRef.value = {
            async doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      {
        immediate: true,
      },
    )
    // format 和组件的映射关系
    const formatMapRef = computed(() => {
      // 如果自定义了format
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        return customFormats.reduce((result, format) => {
          result[format.name] = format.component
          return result
        }, {} as { [key: string]: CommonWidgetDefine })
      }
    })
    const context: any = {
      SchemaItem,
      formatMapRef,
    }
    provide(SchemaKeyIndexRef, context)
    return () => {
      const { schema, value, uiSchema } = props
      return (
        <SchemaItem
          uiSchema={uiSchema || {}}
          errorSchema={errorSchemaRef.value || {}}
          rootSchema={schema}
          schema={schema}
          value={value}
          onChange={onChange}
        ></SchemaItem>
      )
    }
  },
})
