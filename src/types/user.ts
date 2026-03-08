export interface LoginForm {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

// 角色信息
interface Role {
  id: string
  title: string
}

// 权限信息
interface Permission {
  menus: string[]
  points: string[]
}

export type UserResult = {
  id: string
  _id: string
  avatar: string
  title: string
  username: string
  role: Role[]
  permission: Permission
}
