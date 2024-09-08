import { apiEnum } from "@/enum/apiEnum";
interface CreateDatabaseType {
  tenant_name: string
  database_name: string
  metadata?: Record<string, string>
}
export function getDatabaseByName(name: string) {
  return fetch(apiEnum.DATABASE_GET, {
    body: JSON.stringify({name})
  })
}

export function getDatabases() {
  return fetch(apiEnum.DATABASE_GET_ALL)
}

export function createDatabase(data:CreateDatabaseType) {
  return fetch(apiEnum.DATABASE_CREATE, {
    body: JSON.stringify(data)
  })
}