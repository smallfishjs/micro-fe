import ajax from './ajax';

export function getUser(params) {
  return ajax.get('/api/getError', params);
}
