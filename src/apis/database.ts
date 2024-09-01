import { apiEnum } from "@/enum/apiEnum";

export function getDatabaseByName(name: string) {
  return fetch(apiEnum.DATABASE_GET, {
    body: JSON.stringify({
      name
    })
  })
}

export function getDatabases() {
  return fetch(apiEnum.DATABASE_GET_ALL)
}

export function createDatabase(name: string) {
  return fetch(apiEnum.DATABASE_CREATE, {
    body: JSON.stringify({
      name
    })
  })
}