import HTTPRequestUtil from '@/api/HTTPRequestUtil'

export function login (data) {
  return HTTPRequestUtil.lbPost('/api/scrm/auth/login-general', data, {
    'content-type': 'application/x-www-form-urlencoded'
  })
}
export function requestHierarchies (data) {
  return HTTPRequestUtil.lbGet('/api/scrm/institution/hierarchies', data)
}
