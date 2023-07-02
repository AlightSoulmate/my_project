// test.ts

import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'OK',
        status: 'success',
        data: {
          name: 'Young',
          age: 20,
          avatar: '/images/011.png',
          permissions:['editor_markdown','article_edit']
        }
      }
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'Login successfully',
        status: 'success',
        data: {
          token:Random.string(10)
        }
      }
    },
  }
] as MockMethod[]