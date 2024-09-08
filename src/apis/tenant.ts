import { apiEnum } from "@/enum/apiEnum";
interface CreateTenantType {
  tenant_name: string
  metadata?: Record<string, string>
}
export function getTenantByName(name: string) {
  return fetch(apiEnum.TENANT_GET, {
    body: JSON.stringify({name})
  })
}

export function getTenants() {
  return fetch(apiEnum.TENANT_GET_ALL)
}

export function createTenant(data:CreateTenantType) {
  return fetch(apiEnum.TENANT_CREATE, {
    body: JSON.stringify({data})
  })
}