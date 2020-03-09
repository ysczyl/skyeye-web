import request from '@/utils/request'

export function searchSort(params) {
  return request({
    url: '/searchSort',
    method: 'post',
    data :{
      ...params
    }
  })
}

export function findSortInfo(params) {
  return request({
    url: '/findSortInfo',
    method: 'post',
    data :{
      ...params
    }
  })
}

export function searchKey(params) {
  return request({
    url: '/searchKey',
    method: 'post',
    data :{
      ...params
    }
  })
}



export function searchSortAll(params) {
  return request({
    url: '/searchSortAll',
    method: 'post',
    data :{
      ...params
    }
  })
}
