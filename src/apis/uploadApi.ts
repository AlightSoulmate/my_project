import { http } from '../plugins/axios/index'
// export default class
export interface User {
  url:string
}
export function uploadImage(data:FormData) {
  return http.request<User>({
    url: `upload/image`,
    method:'post',
    data
  })
}
export function uploadFile(data:FormData) {
  return http.request({
    url: `/rag/upload_single`,
    method:'post',
    data
  })
}