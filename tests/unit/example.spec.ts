import { mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import { describe, expect, test, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

describe('Test del component Login.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test('Es renderitza el component', () => {
    const wrapper = mount(Login);
    expect(wrapper.find('#input-correu').exists()).toBe(true);
    expect(wrapper.find('#input-contrasenya').exists()).toBe(true);
    expect(wrapper.find('#btn-login').exists()).toBe(true);
  });
  test("S'inicialitza correctament la store de Pinia", () => {
    const wrapper = mount(Login);
    
  });
});
