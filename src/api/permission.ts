import request from '@/utils/request'

export const permissionList = () =>
  request({
    url: '/permission/list'
  })
