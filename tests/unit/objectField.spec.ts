import { mount } from '@vue/test-utils'
import { NumberField, StringField } from '../../lib'
import TestComponent from './utils/TestComponent'

describe('object field case', () => {
  let schema: any = undefined
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })
  it('组件是否存在', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: () => {},
        rootSchema: {},
      },
    })
    const _NumberField = wrapper.findComponent(NumberField)
    // const _StringField = wrapper.findComponent(StringField)
    expect(_NumberField.exists()).toBeTruthy()
    // expect(_StringField.exists()).toBeTruthy()
  })
  it('子组件触发onchange是否会更改父组件的value', () => {
    let value: any = ''
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: (v: any) => {
          value = v
        },
        rootSchema: {},
      },
    })
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)
    strField.props('onChange')('1')
    expect(value.name).toEqual('1')

    numField.props('onChange')('12')
    expect(value.age).toEqual('12')
  })
  it('将undefined的情况考虑进来', () => {
    let value: any = ''
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: value,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: (v: any) => {
          value = v
        },
        rootSchema: {},
      },
    })
    const strField = wrapper.findComponent(StringField)
    strField.props('onChange')(undefined)
    expect(value.name).toBeUndefined()

    const numField = wrapper.findComponent(NumberField)
    numField.props('onChange')(undefined)
    expect(value.age).toBeUndefined()
  })
})
