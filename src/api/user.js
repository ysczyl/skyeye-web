import request from '@/utils/request'

export function users(params) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function update(params) {
  return request({
    url: '/updateUser',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function deleteusers(params) {
  return request({
    url: '/deleteUser',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function save(params) {
  return request({
    url: '/saveUser',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function deleteall(params) {
  return request({
    url: '/deleteAll',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function findbyId(params) {
  return request({
    url: '/listById',
    method: 'post',
    data: {
      ...params
    }
  })
}


export function changepassword(params) {
  return request({
    url: '/changepass',
    method: 'post',
    data: {
      ...params
    }
  })
}
