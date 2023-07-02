<!-- <template>
  <Form class @submit="onSubmit">
    <Field name="account" :rules="{email:true,required:true}" :validate-oninput="true" #default="{ field, errorMessage } " label="账号">
      <input type="text"  v-bind="field">
      <hr>
      <p>{{errorMessage}}</p>
      <br>
    </Field>
    <br>
    <button>Submit</button>
  </Form>
</template>

<script setup lang="ts">
import v from '@/plugins/validate'
const {Form,Field} = v
const onSubmit = (values:any) => {
  console.log(values);
  alert('Access')
}

</script>

<style scoped lang="scss">
form {
  @apply h-screen w-screen flex justify-center items-center bg-gray-600 ;

  input {
    @apply border-4 rounded-md border-violet-500 p-2 outline-none focus:border-violet-200 duration-300;
  }
  button {
    @apply  block bg-gray-400 rounded-md text-white px-3 py-1;
  }
}
</style>
<script lang="ts">
// export default {
//   route: { path: '/user' }
// }
</script> -->