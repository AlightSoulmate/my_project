<template>
  <form class="bg-gradient-to-l from-[#fab1a0] p-0 to-[#778beb] w-full h-screen" @submit="onSubmit">
    <div class="w-3/5 h-4/5 bg-white md:grid grid-cols-2 rounded-md shadow-sm translate-y-32 md:translate-y-0">
      <div class="hidden md:block relative">
        <img src="/images/registry.jpeg" class="absolute h-full w-full object-cover" />
      </div>
      <div class="p-6 flex flex-col justify-between overflow-hidden">
        <div>
          <h2 class="mt-16 font-bold text-center text-gray-700 text-2xl">用户注册</h2>
          <div class="mt-16">
            <yInput v-model="values.account" @input="validate"></yInput>
            <Error :error="errors.account"></Error>
            <yInput :isPassword="true" v-model="values.password" class="mt-5" @input="validate"></yInput>
            <Error :error="errors.password"></Error>
          </div>
          <YButton class="w-full">注册</YButton>
        </div>
        <div class="flex gap-3 justify-center mt-10">
          <y-link title="忘记密码" path="/404"></y-link>
          <y-link title="登录" path="/login"></y-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import Error from '@/components/y/error.vue'
import v from '../../plugins/validate'
import { loginWrap } from '../../utils/user'
import { ElNotification } from 'element-plus'
import router from '@/router'
import { registry } from '@/apis/user'
const { useForm, useFields, yup } = v

const schema = yup.object({
  account: yup
    .string()
    .required()
    .matches(/^\d{11}|.+@.+$/, '请输入邮箱')
    .label('邮箱'),
  password: yup.string().required().min(4, '密码不少于4位').label('密码'),
})
const { handleSubmit, values, errors, validate } = useForm({
  validationSchema: schema,
})

useFields(Object.keys(schema))
const onSubmit = handleSubmit(async (values: any) => {
  const { account, password } = values
  registry({
    name: account,
    email: account,
    password: password,
  })
    .then((r) => {
      console.log('r', r)
    })
    .then(() => {
      ElNotification({ title: '注册成功' })
      setTimeout(() => {
        router.push({ name: 'login' })
      }, 1000)
    })
})
</script>

<style lang="scss">
form {
  @apply bg-slate-300 h-screen flex justify-center items-start md:items-center p-5;
}
</style>
