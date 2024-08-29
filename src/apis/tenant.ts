import { apiEnum } from "@/enum/apiEnum";

export function getTenant(name: string) {
  return fetch(apiEnum.TENANT_GET, {
    body: JSON.stringify({
      name
    })
  })
}

export function createTenant(name: string) {
  return fetch(apiEnum.TENANT_CREATE, {
    body: JSON.stringify({
      name
    })
  })
}