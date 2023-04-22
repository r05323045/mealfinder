import axios from 'axios'
import Swal from 'sweetalert2'
const baseURL = process.env.VUE_APP_API_URL
// const baseURL = 'http://localhost:3000/api'

export const apiHelper = axios.create({
  baseURL,
  withCredentials: true
})

console.log(process.env, 'baseURL')

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
