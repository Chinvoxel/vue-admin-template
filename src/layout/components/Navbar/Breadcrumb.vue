<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <span v-if="index === breadcrumbList.length - 1">
          {{ item.meta.title }}
        </span>

        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
const router = useRouter()
const activeRoute = useRoute()
const { t } = useI18n()

const breadcrumbList = ref([])

// 获取面包屑导航数据
const getBreadcrumb = () => {
  let matched = activeRoute.matched.filter(item => item.meta && item.meta.title) || [] // 过滤出具有元信息和标题的路由匹配项
  const first = matched[0] // 取第一个匹配项
  // 如果第一个匹配项不是首页
  if (!isDashboard(first)) {
    // 在匹配项数组前添加一个“首页”路由项
    matched = [{ path: '/home/index', meta: { title: t('route.home') } }].concat(matched)
  }
  // 将符合条件的匹配项过滤为只包含元信息、标题并且 breadcrumb 不等于 false 的项
  breadcrumbList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

const isDashboard = route => {
  const name = route && route.name
  if (!name) return false
  return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
}

const handleLink = item => {
  const { redirect, path } = item
  const toLink = redirect || path
  router.push(toLink)
}

watch(
  activeRoute,
  () => {
    getBreadcrumb()
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-container {
  margin-left: 8px;
}
</style>
