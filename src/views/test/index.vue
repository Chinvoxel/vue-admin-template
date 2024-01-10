<template>
  <div @click="cc">{{ $t('route.test') }}</div>
</template>

<script setup>
const cc = () => {
  ElMessage.error('登录成功')
  ElNotification.success('登录成功')
}
</script>

<style lang="scss" scoped></style>
