<template>
  <el-row class="mb-4">
    <el-icon :size="20">
      <Edit />
    </el-icon>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger </el-button>
  </el-row>

  <el-divider />

  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" class="scrollbar-demo-item" :key="item">
        {{ item }}
      </p>
    </div>
  </el-scrollbar>
</template>

<script setup></script>

<style lang="scss" scoped></style>
