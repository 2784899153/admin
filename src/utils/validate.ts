// 判断是否为外部资源
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
