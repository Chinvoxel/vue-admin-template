<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == breadcrumbList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>

        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbList = ref([])

const getBreadcrumb = () => {
  let matched = route.matched.filter(item => item.meta && item.meta.title) || []
  // console.log('matched: ', matched)
  // const first = matched[0]

  // if (isDashboard(first)) {
  //   matched = [{ path: '/home', meta: { title: 'home' } }].concat(matched)
  // }
  breadcrumbList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

const isDashboard = route => {
  const name = route && route.name
  if (!name) return false
  return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
}

getBreadcrumb()
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  margin-left: 8px;
}
</style>
