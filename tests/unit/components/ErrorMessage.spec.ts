import { mount } from '@vue/test-utils'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { describe, expect, test,beforeEach } from 'vitest'

import {createPinia, setActivePinia} from 'pinia'
describe('components/ErrorMessage.vue', () => {
  const wrapper = mount(ErrorMessage,{propsData:{message:"Error general"}})

  test('Es renderitza correctament', () => {
    expect(wrapper.text()).toMatch('Error general')
  })
  test('Forma part de classe text-small',()=>{
    expect(wrapper.classes('text-small')).toBe(true)
  })
})
