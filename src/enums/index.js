const modules = import.meta.globEager('./*.js')

const enums = Object.keys(modules).reduce((acc, path) => {
  const moduleEnums = modules[path]
  Object.keys(moduleEnums).forEach(key => {
    if (acc[key]) {
      Object.assign(acc[key], moduleEnums[key])
    } else {
      acc[key] = moduleEnums[key]
    }
  })
  return acc
}, {})

const EnumPlugin = {
  install(app) {
    app.config.globalProperties.$enums = enums
    app.provide('$enums', enums)
  }
}

export default EnumPlugin
