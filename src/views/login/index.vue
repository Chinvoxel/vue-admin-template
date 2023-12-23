<template>
  <div class="login-container">
    <el-card class="login-card">
      <h3 class="title">用户登录</h3>

      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px" class="form">
        <el-form-item label="账号" prop="phone">
          <el-input v-model.trim="form.phone" placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item class="btn-group">
          <el-button type="primary" class="btn-submit" @click="handleSubmit(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()
const store = useUserStore()

const toRoutePath = computed(() => {
  return route.params?.redirect || '/'
})

const ruleFormRef = ref(null)
const form = reactive({
  phone: '',
  password: ''
})

const rules = {
  phone: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleSubmit = formEl => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      store.LoginByPhone(form).then(() => {
        ElMessage.success('登录成功')
        router.replace({ path: toRoutePath.value })
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  background: url('@/assets/images/login.png') no-repeat;
  background-size: contain;
  background-position: left;
  background-color: dimgray;
  .login-card {
    margin-right: 300px;
    width: 400px;
    padding: 20px;
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .form {
      margin-top: 10px;
    }
    .btn-group {
      text-align: right;
      margin-top: 20px;
    }
  }
}
</style>
