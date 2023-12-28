<template>
  <div class="wrapper">
    <div class="login-container">
      <div class="login-form">
        <h2 class="title">用户登录</h2>

        <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
          <el-form-item class="mb-6" label="账号" prop="phone">
            <el-input class="form-input" v-model.trim="form.phone" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              class="form-input"
              v-model.trim="form.password"
              type="password"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>

          <el-form-item class="btn-group">
            <el-button type="primary" class="btn-submit" @click="handleSubmit(ruleFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
  phone: [{ min: 1, max: 20, message: '请输入账号', trigger: 'blur' }],
  password: [{ min: 1, max: 20, message: '请输入密码', trigger: 'blur' }]
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
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: #03a9f4;
  .login-container {
    display: flex;
    justify-content: flex-end;
    min-width: 1000px;
    height: 600px;
    padding: 30px;
    border-radius: 10px;
    background-color: #ffffff;
    background-image: url('@/assets/images/login.png');
    background-size: contain;
    background-repeat: no-repeat;

    .login-form {
      width: 400px;
      .title {
        margin-bottom: 40px;
        text-align: center;
        font-weight: bold;
      }
      .mb-6 {
        margin-bottom: 24px;
      }
      .form-input {
        @include autofill(white);
      }
      .btn-group {
        text-align: right;
        margin-top: 20px;
        .btn-submit {
          height: 36px;
          width: 100%;
        }
      }
    }
  }
}
</style>
