import request from '@/utils/request'

export function searchKeys(params) {
  return request({
    url: '/searchKeys',
    method: 'post',
    data: {
      ...params
    }
  })
}
