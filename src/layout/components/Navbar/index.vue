<template>
  <div class="navbar">
    <Hamburger :is-active="store.sidebar.collapsed" @toggle="toggleSideBar" />
    <Breadcrumb />
    <AvatarIcon class="avatar-container" />
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import AvatarIcon from './AvatarIcon.vue'

const store = useAppStore()

const toggleSideBar = () => {
  store.TOGGLE_SIDEBAR()
}
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 9;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-right: 15px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transition: width 0.28s;
  .avatar-container {
    margin-left: auto;
  }
}
</style>
