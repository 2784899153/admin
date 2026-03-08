import request from '@/utils/request'

export const roleList = () => request({ url: '/role/list' })

// 获取用户指定权限
export const rolePermission = (roleId) =>
  request({
    url: `/role/permission/${roleId}`
  })

// 为角色修改权限
export const setRole = (data) =>
  request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
