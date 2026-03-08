// 返回所有的子路由

const getChildrenRoutes = (routes: any) => {
  const result = []

  if (routes.children?.length > 0) {
    result.push(...routes.children)
  }
}
