import { CommonFieldType } from './types'
import { inject } from 'vue'
export const SchemaKeyIndexRef = Symbol()

export function useVJSFCContext() {
  const context: { SchemaItem: CommonFieldType } | undefined = inject(
    SchemaKeyIndexRef,
  )
  if (!context?.SchemaItem) {
    throw Error('SchemaItem is not found')
  }
  return context
}
