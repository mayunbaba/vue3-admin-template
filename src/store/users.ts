// 这一层的目的是为了解耦业务逻辑和api，方便后续的业务逻辑复用
// 但是这一层的复用性不高，因为每个页面的业务逻辑都不一样，所以这一层的复用性不高，所以暂时不用
// 采用hooks的方式，直接在页面中调用api，这样更加灵活
import { defineStore } from 'pinia';
import api from '@/api';

export default defineStore('usersStore', () => {
  const users = ref([]);
  const searchFormData = ref({ keyword: '' });
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const loading = ref(false);

  const search = async () => {
    currentPage.value = 1;
    await getUsers();
  };

  const reset = async () => {
    searchFormData.value = { keyword: '' };
    currentPage.value = 1;
    pageSize.value = 10;
    await getUsers();
  };

  const getUsers = async () => {
    loading.value = true;
    const res = await api.users.getUsers(
      searchFormData.value,
      currentPage.value,
      pageSize.value,
    );
    loading.value = false;
    users.value = res.data.data;
    return res;
  };

  const add = async (data: any) => {
    loading.value = true;
    const res = await api.users.addUser(data);
    loading.value = false;
    return res;
  };

  const edit = async (id: number, data: any) => {
    loading.value = true;
    const res = await api.users.updateUser(id, data);
    loading.value = false;
    return res;
  };

  const del = async (id: number) => {
    loading.value = true;
    const res = await api.users.deleteUser(id);
    loading.value = false;
    return res;
  };

  const pageChange = async (page: number) => {
    currentPage.value = page;
    await getUsers();
  };

  const sizeChange = async (size: number) => {
    pageSize.value = size;
    await getUsers();
  };

  return {
    users,
    searchFormData,
    currentPage,
    pageSize,
    total,
    loading,
    search,
    reset,
    getUsers,
    add,
    edit,
    del,
    pageChange,
    sizeChange,
  };
});
