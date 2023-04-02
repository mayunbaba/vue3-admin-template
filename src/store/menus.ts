import { defineStore } from 'pinia';

export default defineStore('menusStore', () => {
  const menus = ref([]);
  const buttons = ref([]);
  const menusMap = ref(new Map());
  const addMenus = (data: any) => {
    menus.value = data.menus;
    buttons.value = data.buttons;
    menus.value.forEach((item: any) => {
      menusMap.value.set(item.id, item);
    });
  };
  return {
    menus,
    buttons,
    menusMap,
    addMenus,
  };
});
