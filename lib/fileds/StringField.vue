<template>
  <input type="text" :value="value" @input="handleChange" />
</template>
<script setup="props" lang="ts">
import { fieldPropsDefined, Schema } from '../types'
export default {
  props: fieldPropsDefined,
}
declare const props: {
  value: any
  onChange: (v: string) => void
  schame: Schema
}

export const handleChange = (v: any) => {
  props.onChange(v.target.value)
}
</script>
