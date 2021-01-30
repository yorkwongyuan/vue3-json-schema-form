import Ajv from 'ajv'
import { Schema } from './types'
import toPath from 'lodash.topath'
import { isObject } from './utils'

const i18n = require('ajv-i18n')
export interface TransformedErrorObject {
  name: string
  property: string
  params: Ajv.ErrorParameters
  message: string | undefined
  schemaPath: string
}

function transformErrors(
  errors: Ajv.ErrorObject[] | undefined | null,
): TransformedErrorObject[] {
  if (errors === undefined || errors === null) return []
  return errors.map((error) => {
    return {
      name: error.keyword,
      property: error.dataPath.slice(1),
      message: error.message,
      schemaPath: error.schemaPath,
      params: error.params,
    }
  })
}

export async function validateFormData(
  schema: Schema,
  formData: any,
  validator: Ajv.Ajv,
  locale: string,
  customValidate?: (data: any, errors: any) => void,
) {
  let validationError = null
  try {
    console.log(schema, 'schema')
    validator.validate(schema, formData)
  } catch (e) {
    console.log('本身出错了')
    validationError = e
  }
  i18n[locale](validator.errors)
  console.log(validator.errors, 'validator.errors')
  let errors = transformErrors(validator.errors)
  console.log(errors, 'errors')
  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError.message,
      },
    ] as TransformedErrorObject[]
  }
  console.log(errors, 'errors')
  const errorSchema = toErrorSchema(errors)
  console.log(errorSchema, 'errorSchema结果')
  if (!customValidate) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0,
    }
  }
  const proxy = createErrorProxy()
  await customValidate(formData, proxy)
  const newErrorSchema = mergeObjects(errorSchema, proxy, true)
  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0,
  }
}

// 这里使用proxy是因为要利用其get方法，来重置点操纵符
function createErrorProxy() {
  const raw = {}
  return new Proxy(raw, {
    get(target, key, reciver) {
      if (key === 'addError') {
        return (msg: string) => {
          const __errors = Reflect.get(target, '__errors', reciver)
          if (__errors && Array.isArray(__errors)) {
            __errors.push(msg)
          } else {
            ;(target as any).__errors = [msg]
          }
        }
      }
      const res = Reflect.get(target, key, reciver)
      if (res === undefined) {
        const p: any = createErrorProxy()
        ;(target as any)[key] = p
        return p
      }
      return res
    },
  })
}

// 合并对象
export function mergeObjects(obj1: any, obj2: any, concatArrays = false) {
  // Recursively merge deeply nested objects.
  const acc = Object.assign({}, obj1) // Prevent mutation of source object.
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {},
      right = obj2[key]
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays)
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right)
    } else {
      acc[key] = right
    }
    return acc
  }, acc)
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[]
}
interface ErrorSchemaObject {
  [key: string]: ErrorSchema
}

function toErrorSchema(errors: TransformedErrorObject[]) {
  if (errors.length < 0) return {}
  return errors.reduce((errorSchema, error) => {
    const { property, message } = error
    const path = toPath(property)
    let parent = errorSchema
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }

    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || [])
    } else {
      parent.__errors = []
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {} as ErrorSchema)
}
