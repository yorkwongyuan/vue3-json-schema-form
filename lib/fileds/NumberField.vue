<template>
  <input type="number" :value="value" @input="handleChange" />
</template>
<script setup="props" lang="ts">
import { fieldPropsDefined, Schema } from '../types'
export default {
  props: fieldPropsDefined,
}
declare const props: {
  value: any
  onChange: (v: any) => void
  schema: Schema
}
export const handleChange = (e: any) => {
  console.log(e.target.value, 'value')
  const num = e.target.value
  if (Number.isNaN(num)) {
    props.onChange(num)
  } else {
    props.onChange(Number(num))
  }
}
</script>
