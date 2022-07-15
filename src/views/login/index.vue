<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="账号登录"
      @click-left="goBack"
      class="navbar"
      style="height: 45px"
    >
      <template #left>
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
    <!-- 账号密码 -->
    <van-form @submit="login" class="form">
      <van-field
        v-model="username"
        name="账号"
        placeholder="请输入账号"
        :rules="usernameRules"
      />
      <van-field
        v-model="password"
        :type="type"
        name="密码"
        placeholder="请输入密码"
        :rules="passwordRules"
      >
        <template #right-icon>
          <van-icon name="eye-o" v-if="flag == 1" @click="pswEye" />
          <van-icon name="closed-eye" v-else @click="pswEye" />
        </template>
      </van-field>
      <div>
        <van-button block type="info" native-type="submit" class="btn-login"
          >登 录</van-button
        >
      </div>
    </van-form>
    <!-- 去注册 -->
    <div class="go-zc">
      <a>还没有账号，去注册~</a>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { usernameRules, passwordRules } from './rules'
export default {
  data () {
    return {
      username: '',
      password: '',
      flag: 0,
      type: 'password',
      usernameRules,
      passwordRules
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '不要着急，加载中..',
        forbidClick: true
      })
      try {
        const res = await login(this.username, this.password)
        console.log(res)
        this.$toast.success('登录成功')
        // if (res.data.status === 200) {
        //   this.$toast.success('登录成功')
        // } else {
        //   this.$toast.fail(res.data.description)
        // }
      } catch (err) {
        // console.log(error)S
        console.log(err)
        if (err.response.status === 401) {
          this.$toast.fail('账号或密码错误')
        } else {
          this.$toast.fail('登录失败')
        }
      }
    },
    pswEye () {
      if (this.flag) {
        this.flag = 0
        this.type = 'password'
      } else {
        this.flag = 1
        this.type = 'text'
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 头部导航样式
.navbar {
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 18px;
  }
  .van-icon {
    color: #fff;
  }
}
// 账号密码样式
.form {
  margin: 20px 15px 0;
  :deep(.van-field__control) {
    font-size: 17px;
    height: 60px;
    line-height: 60px;
    padding: 2px 0;
  }
  :deep(.van-field__body) {
    margin-bottom: 9px;
    border-bottom: 1px solid #eee;
    .van-icon {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .van-cell {
    padding: 0;
  }
  .btn-login {
    background-color: #21b97a;
    width: 345px;
    height: 50px;
    border: none;
    font-size: 18px;
    margin-top: 20px;
  }
}
// 去注册
.go-zc {
  font-size: 14px;
  text-align: center;
  margin-top: 25px;
  color: #666;
}
</style>
