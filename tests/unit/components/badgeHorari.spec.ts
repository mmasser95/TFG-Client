import { describe, expect, test, beforeEach, beforeAll, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import badgeHorari from '@/components/badgeHorari.vue';

//Funcio per a montar el component amb diferents props
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
  test('Comprovacions de que no es renderitza quan no cal', () => {
    const wrapper = myBadgeFactory([]);
    expect(wrapper.find('.horari').exists()).toBe(false);
  });
  test('Comprovacions de que es renderitzen correctament dos badges', () => {
    const wrapper = myBadgeFactory([
      { inici: '12:30', final: '13:00' },
      { inici: '18:00', final: '21:00' },
    ]);
    expect(wrapper.find('[data-test="badge"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-test="badge"]').length).toBe(2);
  });
  test('Comprovacions de que es renderitzen els dos badges amb el text esperat',()=>{
    const wrapper = myBadgeFactory([
      { inici: '12:30', final: '13:00' },
      { inici: '18:00', final: '21:00' },
    ]);
    expect(wrapper.findAll('[data-test="badge"]')[0].text()).toBe("12:30-13:00");
    expect(wrapper.findAll('[data-test="badge"]')[1].text()).toBe("18:00-21:00");
  })
});
