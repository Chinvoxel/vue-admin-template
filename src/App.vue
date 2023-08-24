<template>
  <!-- <el-row class="mb-4">
    <el-button @click="handleSubmit">Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <el-divider /> -->

  <a-space wrap>
    <a-button type="primary" @click="handleSubmit">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
  </a-space>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const handleSubmit = () => {
  console.log('proxy: ', proxy)
}
</script>

<style scoped></style>
