import request from '@/utils/request';
import { ref } from 'vue';

// HOOKS 中不能使用 async/await 语法，所以这里使用了 then 方法
export function useFetch(url: string) {
  const list = ref();

  request.get(url).then((res) => {
    list.value = res;
  });

  return { list };
}
