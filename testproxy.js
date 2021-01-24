function createErrorProxy() {
  const raw = {}
  return new Proxy(raw, {
    get(target, key, reciver) {
      if (key === 'addError') {
        return (msg) => {
          const __errors = Reflect.get(target, '__errors', reciver)
          if (__errors && Array.isArray(__errors)) {
            __errors.push(msg)
          } else {
            target.__errors = [msg]
          }
        }
      }
      const res = Reflect.get(target, key, reciver)
      if (res === undefined) {
        const p = createErrorProxy()
        target[key] = p
        return p
      }
      return res
    },
  })
}

const proxy = createErrorProxy()
proxy.name.addError('哈哈')
proxy.name.age.addError('1 ')

console.log(proxy, 'name')
