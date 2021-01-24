const Ajv = require('ajv')
const ajv = new Ajv()
const la = require('ajv-i18n')

ajv.addKeyword('test', {
  validate: function fn(sch, data) {
    fn.errors = [{
      keyword: 'test',
      dataPath: '.name',
      schemaPath: '#/properties/name/test',
      params: { keyword: 'test' },
      message: '这个是错误信息'
    }]
    return false
  }
})

let schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: false
    }
  }
}
const validate = ajv.compile(schema)
const valid = validate({
  name: 'york'
})

if (!valid) {
  la.zh(validate.errors)
  console.log(validate.errors)
}