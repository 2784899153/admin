import request from '@/utils/request'
import type { Response } from '@/utils/request'

export const getUserManageList = (data: any) =>
  request({
    url: '/user-manage/list',
    params: data
  }) as Promise<Response<any>>

// 批量导入
export const useBatchImport = (data: any) =>
  request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })

// 获取所有用户的列表数据
export const getUserManageAllList = () =>
  request({
    url: '/user-manage/all-list'
  })

// 获取用户信息
export const userRoles = (id) =>
  request({
    url: `/user-manage/role/${id}`
  })

// 分配用户角色
export const updateRole = (id, roles) =>
  request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
