import { describe, expect, test, beforeEach, beforeAll, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import badgeHorari from '@/components/badgeHorari.vue';

const myBadgeFactory = (horaris) => {
  return mount(badgeHorari, {
    props: { horaris },
  });
};

describe("Tests del badge de l'horari", () => {
  test('Es renderitza correctament', () => {
    const wrapper = myBadgeFactory([{ inici: '18:00', final: '21:00' }]);
    expect(wrapper.find('[data-test="badge"]').exists()).toBe(true);
  });
  test("Comprovacions de que no es renderitza quan no cal",()=>{
    const wrapper=myBadgeFactory([])
    expect(wrapper.find(".horari").exists()).toBe(false)
  })
  test("Comprovacions de que es renderitzen correctament dos components",()=>{
    const wrapper = myBadgeFactory([{ inici: '18:00', final: '21:00' }]);
    expect(wrapper.find('[data-test="badge"]').exists()).toBe(true);
  })
  
});
