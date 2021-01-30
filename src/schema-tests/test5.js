const Ajv = require('ajv')
const localize = require('ajv-i18n')
const ajv = new Ajv()
ajv.addKeyword('test', {
  // compile(sch, data) {
  //   // console.log(data, 'data')
  //   return () => false
  // },
  // metaSchema: {
  //   type: 'boolean'
  // },
  // validate(schema, data) {
  //   console.log(schema, data)
  //   return schema > data
  // }
  macro(schema, data) {
    return {
      minLength: 12
    }
  }
})
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: 5
    }
  }
}
const validate = ajv.compile(schema)
const valid = validate({
  name: 'york'
})

if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}