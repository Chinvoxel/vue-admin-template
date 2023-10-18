<template>
  <el-row class="mb-4">
    <el-icon :size="20">
      <Edit />
    </el-icon>
    <el-button @click="handleSubmit"> Default </el-button>
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

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)

const handleSubmit = () => {
  toggleDark(isDark)
}
</script>

<style lang="scss" scoped>
.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
</style>
