import { PropType, DefineComponent } from 'vue'
import { ErrorSchema } from './validator'
export enum SchemaTypes {
  'STRING' = 'string',
  'NUMBER' = 'number',
  'BOOLEAN' = 'boolean',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'INTEGER' = 'integer',
}

type SchemaRef = { $refs: string }

export interface Schema {
  description?: string
  type?: SchemaTypes | string
  allOf?: Schema[]
  anyOf?: Schema[]
  title?: string
  uniqueItems?: any
  properties?: {
    [key: string]: Schema
  }
  format?: string
  default?: any
  items?: Schema | Schema[] | SchemaRef
  required?: string[]
  enum?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema
  const?: any
  oneOf?: Schema[]
  minLength?: number
}

export const fieldPropsDefined = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(str: any) => void>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
    required: true,
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true,
  },
} as const

export type CommonFieldType = DefineComponent<typeof fieldPropsDefined>

export const commonThemeProps = {
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  options: {
    type: Object as PropType<{ [keys: string]: any }>,
  },
} as const

export const selectionThemeProps = {
  ...commonThemeProps,
  options: {
    type: Array as PropType<{ label: string; value: any }[]>,
    required: true,
  },
} as const

export type CommonWidgetDefine = DefineComponent<
  typeof commonThemeProps,
  {},
  {}
>

export type SelectionWidgetDefine = DefineComponent<
  typeof selectionThemeProps,
  {},
  {}
>
export enum SelectWidgetNames {
  Selection = 'Selection',
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
}

export interface Theme {
  widgets: {
    [SelectWidgetNames.Selection]: SelectionWidgetDefine
    [CommonWidgetNames.TextWidget]: CommonWidgetDefine
    [CommonWidgetNames.NumberWidget]: CommonWidgetDefine
  }
}

export type UISchema = {
  widget?: string | CommonWidgetDefine
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[]
} & {
  [key: string]: any
}
