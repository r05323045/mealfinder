import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/restaurants',
    component: () => import('@/views/Restaurants.vue')
  },
  {
    path: '/restaurants/:id',
    component: () => import('@/views/Restaurant.vue')
  },
  {
    path: '/booking',
    component: () => import('@/views/Booking.vue')
  },
  {
    path: '/booking/success',
    component: () => import('@/views/BookingSuccess.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
