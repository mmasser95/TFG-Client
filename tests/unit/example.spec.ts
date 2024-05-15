import { mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import { describe, expect, test, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

describe('Test del component Login.vue', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
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
    wrapper.find('#input-correu').trigger('click');
    wrapper.find('#input-contrasenya').trigger('click');
    wrapper.find('#btn-login').trigger('click');
    expect(wrapper.text()).toBe('El correu és obligatori');
  });
});
