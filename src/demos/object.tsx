export default {
  name: 'Object',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      singleArray: {
        title: '名字',
        type: 'array',
        items: {
          type: 'string',
        },
      },
      firstName: {
        title: '姓氏',
        type: 'string',
        default: 'Chuck',
      },
      lastName: {
        title: '名字',
        type: 'string',
      },
      telephone: {
        title: '手机号码',
        type: 'string',
        minLength: 10,
      },
      pets: {
        type: 'array',
        items: [
          {
            title: 'a数据',
            type: 'string',
          },
          {
            title: 'b数据',
            type: 'number',
          },
        ],
      },
      multipleArray: {
        type: 'array',
        title: '业务列表',
        items: {
          type: 'string',
          enum: ['预约', '转诊', '会诊'],
        },
      },
    },
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'Telephone',
      },
      pets: {
        type: 'array',
        items: [
          {
            type: 'string',
          },
          {
            type: 'number',
          },
        ],
      },
    },
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    pets: ['', 1],
    singleArray: ['1', '2'],
    multipleArray: '',
    telephone: '',
  },
}
