<!-- <template>
  <div>
    <Form @submit="onSubmit">
      <section>
        <input type="text" v-model="usernameValue" />
        <p class="error" v-if="errors.username">{{ errors.username }}</p>
      </section>
      <section>
        <input type="text" v-model="passwordValue" />
        <p class="error" v-if="errors.password">{{ errors.password }}</p>
      </section>
      <button>Submit</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import v from '@/plugins/validate/yup'

const { handleSubmit, errors } = v.useForm({
  initialValues: {
    username: 'young',
    password: '',
  },
  validationSchema: {
    username: v.yup.string().email().required(),
    password: { required: true },
  },
}) as any

const { value: usernameValue } = v.useField('username', {}, { label: '用户名' })
const { value: passwordValue } = v.useField('password', {}, { label: '密码' })

const onSubmit = handleSubmit((values: any) => {
  console.log(values)
  alert('Access')
})
</script>

<style scoped lang="scss">
div {
  @apply h-screen w-screen flex justify-center items-center bg-gray-600;

  input {
    @apply border-4 rounded-md border-violet-500 p-2 outline-none focus:border-violet-200 duration-300;
  }

  button {
    @apply block bg-gray-400 rounded-md text-white px-3 py-1;
  }
}
.error {
  @apply bg-red-500 border-none rounded-sm text-white p-1;
}
</style> -->
