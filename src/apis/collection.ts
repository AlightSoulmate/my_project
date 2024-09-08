import { apiEnum } from "@/enum/apiEnum";
interface CreateCollectionType {
  name: string
  tenant_name: string
  database_name: string
  metadata?: Record<string, string>
}

export function getCollectionByName(name: string) {
  return fetch(apiEnum.COLLECTION_GET, {
   body: JSON.stringify({ name })
  })
}

export function getCollections() {
  return fetch(apiEnum.COLLECTION_GET_ALL)
}

export function createCollection(data: CreateCollectionType) {
  return fetch(apiEnum.COLLECTION_CREATE, {
   body: JSON.stringify(data) // 发送创建集合所需的数据
  })
}

// import { apiEnum } from "@/enum/apiEnum";
// interface CreateCollectionType {
//   name: string
//   tenant_name: string
//   database_name: string
//   metadata: Record<string, string>
// }

// export function getCollectionByName(name: string) {
//   return fetch(apiEnum.COLLECTION_GET, {
//     body: JSON.stringify({
//       name
//     })
//   })
// }

// export function getCollections() {
//   return fetch(apiEnum.COLLECTION_GET_ALL)
// }

// export function createCollection(data: CreateCollectionType) {
//   return fetch(apiEnum.COLLECTION_CREATE, {
//     body: JSON.stringify({
//       name
//     })
//   })
// }