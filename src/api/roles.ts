import request from '@/utils/request';

function getRoles() {
  return request('/users-permissions/roles');
}

export default { getRoles };
