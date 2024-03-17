import envs from "./env";

export const url = envs.DEV_MODE ? envs.DEV_BACKEND_URL : envs.PRODUCTION_BACKEND_URL