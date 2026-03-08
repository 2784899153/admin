import request from '@/utils/request'
import type { Response } from '@/utils/request'
import type { LoginForm, LoginResult, UserResult } from '@/types/user'

export const login = (data: LoginForm) =>
  request({ url: '/sys/login', method: 'POST', data }) as Promise<Response<LoginResult>>

export const getUserInfo = () =>
  request({
    url: '/sys/profile'
  }) as Promise<Response<UserResult>>
