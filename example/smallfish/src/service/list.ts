import ajax from './ajax';

export function getList(params) {
  return ajax.post('/api/getList', params);
}
