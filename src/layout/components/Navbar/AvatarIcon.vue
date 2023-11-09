<template>
  <el-dropdown class="avatar-container" trigger="click">
    <el-avatar
      src="https://avatars.githubusercontent.com/u/50545911?s=400&u=9868b54b41faa4f31b1bd566468a839e05bec894&v=4"
      :size="40"
    />

    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/login">
          <el-dropdown-item>Action 1</el-dropdown-item>
        </router-link>
        <router-link to="/login">
          <el-dropdown-item>Action 1</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const router = useRouter

const logout = () => {
  store.FedLogout().then(() => {
    router.replace({ name: 'Login' })
  })
}
</script>

<style lang="scss" scoped></style>
