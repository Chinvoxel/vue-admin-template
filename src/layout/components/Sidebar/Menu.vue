<template>
  <el-menu
    class="all-menu-wrapper"
    :class="{ 'no-expand-menu-wrapper': collapse }"
    :default-active="activeMenu"
    :collapse="collapse"
    :collapse-transition="false"
    :router="true"
    active-text-color="#409EFF"
    mode="vertical"
  >
    <!-- 遍历格式化后的路由 -->
    <template v-for="route in formattedRoutes">
      <!-- 渲染单个子路由 -->
      <template v-if="hasSingleChild(route) && !route.alwaysShow">
        <el-menu-item :index="resolvePath(route.path, route.children[0].path)" :key="route.children[0].path">
          <component :is="route.children[0].meta.icon" class="menu-icon"></component>
          <template #title>{{ route.children[0].meta.title }}</template>
        </el-menu-item>
      </template>

      <!-- 渲染包含多子路由的菜单 -->
      <el-sub-menu v-else-if="route.children" :index="route.path" :key="route.path">
        <template #title>
          <component :is="route.meta.icon" class="menu-icon"></component>
          <span>{{ route.meta.title }}</span>
        </template>

        <!-- 遍历子路由，并渲染对应的菜单项 -->
        <el-menu-item
          v-for="childRoute in route.children"
          class="nest-menu"
          :index="resolvePath(route.path, childRoute.path)"
          :key="childRoute.path"
        >
          <component :is="childRoute.meta.icon" class="menu-icon"></component>
          <template #title>{{ childRoute.meta.title }}</template>
        </el-menu-item>
      </el-sub-menu>

      <!-- 渲染无子路由的菜单项 -->
      <el-menu-item v-else :index="route.path" :key="route.path + '_no_children'">
        <component :is="route.meta.icon" class="menu-icon"></component>
        <template #title>{{ route.meta.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import currentRoutes from '@/router/routes'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const currentRoute = useRoute()

const activeMenu = computed(() => currentRoute.path)
const formattedRoutes = computed(() => formatRoutes(currentRoutes))

// 格式化路由
const formatRoutes = routes => {
  const formatted = []
  routes.forEach(route => {
    if (!route.hidden) {
      const formattedRoute = {
        ...route,
        children: route.children ? formatRoutes(route.children) : null
      }
      formatted.push(formattedRoute)
    }
  })
  return formatted
}

const hasSingleChild = route => {
  return route.children && route.children.length === 1
}

const resolvePath = (basePath, routePath) => {
  if (basePath.endsWith('/')) return `${basePath}${routePath}`
  return `${basePath}/${routePath}`
}
</script>

<style lang="scss" scoped>
.all-menu-wrapper {
  .menu-icon {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-right: 16px;
    color: $color-gray;
  }
}

.all-menu-wrapper.el-menu {
  border-right: none;
  :deep {
    .el-menu-item {
      padding: 0 18px;
      color: $color-gray;
      background-color: #304156;
      &:hover {
        background-color: $menu-hover-background !important;
      }
      .el-menu-tooltip__trigger {
        padding: 0 18px;
      }
    }

    .el-menu-item.is-active {
      color: $color-blue;
      .menu-icon {
        color: $color-blue;
      }
    }

    .el-sub-menu {
      background-color: $color-dark;
      .el-sub-menu__title {
        padding: 0 18px;
        color: $color-gray;
        &:hover {
          background-color: $menu-hover-background !important;
        }
      }
      .el-submenu__icon-arrow {
        color: #909399;
      }
      .nest-menu.el-menu-item {
        background-color: #1f2d3d !important;
        &:hover {
          background-color: #001528 !important;
        }
      }
    }
  }
}

/* 收缩菜单样式 */
.all-menu-wrapper.no-expand-menu-wrapper {
  width: auto;
  .menu-icon {
    margin: 0;
  }
}
</style>
