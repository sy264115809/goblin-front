export function emitTitleChanged (title) {
  return (to, from, next) => {
    next(vm => {
      vm.$emit('title-change', title)
    })
  }
}
