<template>
  <div class="login-container">
    <el-form class="login-form" :model="form" :rules="rules" ref="loginFormRef">
      <div class="title-container">
        <h3 class="title">{{ t('msg.login.title') }}</h3>
        <LangSelect class="lang-select" effect="light" />
      </div>
      <!-- username -->
      <el-form-item label="" prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input v-model="form.username" placeholder="username" name="username" type="text" />
      </el-form-item>
      <!-- passoword -->
      <el-form-item label="" prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          v-model="form.password"
          placeholder="password"
          name="password"
          type="password"
          show-password
        />
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        :loading="loading"
        style="width: 100%; margin-bottom: 30px"
        @click="HandleLogin"
        >{{ t('msg.login.loginBtn') }}</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, computed } from 'vue'
import type { LoginForm } from '@/types/user'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import LangSelect from '@/components/LangSelect/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loginFormRef = useTemplateRef('loginFormRef')

const { userLogin, getUser } = useUserStore()

const form = ref<LoginForm>({
  /*
  super-admin
  admin
  test
  */
  username: 'super-admin', // 账号
  password: '123456' // 密码
})

const validatePwd = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error(t('msg.login.passwordRule')))
  } else {
    callback()
  }
}

const rules = computed(() => ({
  username: [
    {
      required: true,
      message: t('msg.login.usernameRule'),
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: t('msg.login.passwordRule'),
      trigger: 'blur'
    },
    {
      validator: validatePwd,
      trigger: 'blur'
    }
  ]
}))

const loading = ref<boolean>(false) // 按钮loading
const router = useRouter()
const HandleLogin = async () => {
  await loginFormRef.value.validate()
  loading.value = true

  userLogin(form.value)
    .then((res) => {
      router.push('/')
    })
    .catch((err) => {
      // console.log('22', err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: (0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      .el-input__wrapper {
        width: 100%;
        background-color: transparent;
        border: none;
        outline: none;
        box-shadow: none;
      }
      input {
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .lang-select {
      font-size: 30px;
      position: absolute;
      right: 0;
      top: 6px;
    }
  }
}
</style>
