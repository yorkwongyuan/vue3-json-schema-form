import { mount } from '@vue/test-utils'
import { NumberField, StringField, Selection } from '../../lib'
import TestComponent from './utils/TestComponent'

describe('数组组件', () => {
  it('判断数组组件是否存在', () => {
    let value: any = undefined
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
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
        value: value,
        onChange: (v: any) => {
          value = v
        },
        rootSchema: {},
      },
    })
    const _NumberField = wrapper.findComponent(NumberField)
    const _StringField = wrapper.findComponent(StringField)

    expect(_NumberField.exists()).toBeTruthy()
    expect(_StringField.exists()).toBeTruthy()
  })
  it('判断单类型数组组件', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['1', '2'],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: () => {},
        rootSchema: {},
      },
    })
    const arr = wrapper.findAllComponents(StringField)
    expect(arr.length).toBe(2)
  })
  it('判断选择性组件', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['1', '2'],
          },
        },
        value: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: () => {},
        rootSchema: {},
      },
    })
    const _selection = wrapper.findComponent(Selection)
    expect(_selection).toBeTruthy()
  })
})
