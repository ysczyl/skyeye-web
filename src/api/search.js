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


export function searchKind(params) {
  return request({
    url: '/searchKind',
    method: 'post',
    data :{
      ...params
    }
  })
}



export function searchUrlKey(params) {
  return request({
    url: '/searchUrlKey',
    method: 'post',
    data :{
      ...params
    }
  })
}
