import { apiEnum } from "@/enum/apiEnum";

export function getTenant(name: string) {
  return fetch(apiEnum.TENANT_GET, {
    body: JSON.stringify({
      name
    })
  })
}

export function getTenants() {
  return fetch(apiEnum.TENANT_GET_ALL)
}

export function createTenant(name: string) {
  return fetch(apiEnum.TENANT_CREATE, {
    body: JSON.stringify({
      name
    })
  })
}