import axios from 'axios'

export const $axios = axios.create({
  baseURL: '/api'
})
