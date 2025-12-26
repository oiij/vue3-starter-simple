// https://github.com/posva/unplugin-vue-router
import VueRouter from 'unplugin-vue-router/vite'

export default VueRouter({
  extensions: ['.vue', '.md', '.tsx'],
  exclude: ['**/components/**/*.*'],
  extendRoute: (route) => {
    const sortNum = Number.isNaN(Number(route.path.match(/(\d+)_/)?.[1])) ? null : Number(route.path.match(/(\d+)_/)?.[1])
    route.addToMeta({ sort: sortNum })

    if (route.name) {
      const newName = `${route.name.replace(/\d+_/g, '')}`
      route.name = newName.startsWith('/') ? newName : `/${newName}`
      if (route.path !== '') {
        route.path = route.name
      }
    }
  },
})
