const BASE_URL = `http://localhost:8000/api`

export const API_EP = BASE_URL;

export const USER = {
  MAIN: `${BASE_URL}/users`, // /id
  CREATE: `${BASE_URL}/users/create`,
  LOGIN: `${BASE_URL}/users/login`,
  LOGOUT: `${BASE_URL}/users/logout`,
  REFRESH: `${BASE_URL}/users/refreshToken`,
}

export const TASKS = {
  MAIN: `${BASE_URL}/tasks`, // /id
  CREATE: `${BASE_URL}/tasks/create`,
  DATE: `${BASE_URL}/tasks/date`,
  USER: `${BASE_URL}/tasks/user`, // /id
  PROJECT: `${BASE_URL}/tasks/project`, // /id
}

export const TAGS = {
  MAIN: `${BASE_URL}/tags`, // /id
  CREATE: `${BASE_URL}/tags/create`,
  USER: `${BASE_URL}/tags/user`, // /id
}

export const PROJECTS = {
  MAIN: `${BASE_URL}/projects`, // /id
  CREATE: `${BASE_URL}/projects/create`,
  USER: `${BASE_URL}/projects/user`, // /id
  STATUS: `${BASE_URL}/projects/status`, // /id
}
