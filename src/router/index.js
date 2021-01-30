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
  },
  {
    path: '/coupons',
    component: () => import('@/views/Coupons.vue')
  },
  {
    path: '/coupons/:id',
    component: () => import('@/views/Coupon.vue')
  },
  {
    path: '/signin',
    component: () => import('@/views/SignIn.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/users',
    component: () => import('@/views/Users.vue'),
    children: [
      {
        path: '/users/center',
        component: () => import('@/views/Member.vue')
      },
      {
        path: '/users/profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: '/users/history',
        component: () => import('@/views/History.vue')
      },
      {
        path: '/users/history/:id',
        component: () => import('@/views/Reservation.vue')
      },
      {
        path: '/users/purchase',
        component: () => import('@/views/Purchase.vue')
      },
      {
        path: '/users/purchase/:1',
        component: () => import('@/views/Record.vue')
      },
      {
        path: '/users/checkout',
        component: () => import('@/views/Checkout.vue')
      },
      {
        path: '/users/checkout/success',
        component: () => import('@/views/CheckoutSuccess.vue')
      },
      {
        path: '/users/favorite',
        component: () => import('@/views/Favorite.vue')
      },
      {
        path: '/users/notification',
        component: () => import('@/views/Notification.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
