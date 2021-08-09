import { useRouter, useRoute } from 'vue-router'

function isMenuRoute(route) {
  return route && route.meta && route.meta.menu
}

function joinPath(...paths) {
  return paths.join('/').replaceAll(/\/{2,}/g, '/')
}

function routes2Menus(routes) {
  const menus = []
  const doRoutes2Menus = function(list, menuList = [], parent, fullPath = '', depth = 0)  {
    if (!list || !list.length) return
    list.forEach(route => {
      const currentPath = joinPath(fullPath, route.path)
      let menuChildren = menuList
      if (isMenuRoute(route)) {
        const menu = {
          path: currentPath,
          title: route.meta.title,
          route,
          children: []
        }
        menuList.push(menu)
        menuChildren = menu.children
      }
      doRoutes2Menus(route.children, menuChildren, route, currentPath, depth + 1)
    })
  }

  doRoutes2Menus(routes, menus)
  return menus
}

export default function() {
  const router = useRouter()
  const route = useRoute()

  const routes = router.options.routes
  const menus = routes2Menus(routes)

  return {
    router,
    route,
    menus
  }
}
