function checkPermission(el: any, binding: any) {
  const { value } = binding

  if (value && value instanceof Array) {
    if (true) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
