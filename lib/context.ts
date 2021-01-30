import { CommonFieldType, CommonWidgetDefine } from './types'
import { inject, Ref } from 'vue'
export const SchemaKeyIndexRef = Symbol()

export function useVJSFCContext() {
  const context:
    | {
        SchemaItem: CommonFieldType
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
      }
    | undefined = inject(SchemaKeyIndexRef)
  if (!context?.SchemaItem) {
    throw Error('SchemaItem is not found')
  }
  return context
}
