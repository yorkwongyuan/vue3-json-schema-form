import PasswordWidget from '../components/PasswordWidget'

export default {
  name: 'Validate',
  schema: {
    title: '同步校验',
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: '请输入密码',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: '请输再次入密码',
      },
      color: {
        type: 'string',
        format: 'color',
        title: '颜色',
      },
    },
  },
  async customValidate(data: any, proxy: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          proxy.pass2.addError('两次输入的不同')
        }
        resolve()
      }, 1000)
    })
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget,
      },
      pass2: {
        color: 'green',
      },
    },
  },
  default: {
    pass1: '',
    pass2: '',
  },
}
