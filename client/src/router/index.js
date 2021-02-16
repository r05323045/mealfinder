import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store'

Vue.use(VueRouter)

const authorticated = (to, from, next) => {
  if (!store.state.isAuthenticated) {
    next('/signin')
    return
  }
  next()
}

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
    path: '/map',
    component: () => import('@/views/Map.vue')
  },
  {
    path: '/booking',
    component: () => import('@/views/Booking.vue')
  },
  {
    path: '/booking/success/:id',
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
    redirect: '/users/center',
    component: () => import('@/views/Users.vue'),
    beforeEnter: authorticated,
    children: [
      {
        path: '/users/center',
        component: () => import('@/views/Member.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/profile',
        component: () => import('@/views/Profile.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/history',
        component: () => import('@/views/History.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/history/:id',
        component: () => import('@/views/Reservation.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/purchase',
        component: () => import('@/views/Purchase.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/purchase/:1',
        component: () => import('@/views/Record.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/checkout',
        component: () => import('@/views/Checkout.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/checkout/success',
        component: () => import('@/views/CheckoutSuccess.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/favorite',
        component: () => import('@/views/Favorite.vue'),
        beforeEnter: authorticated
      },
      {
        path: '/users/notification',
        component: () => import('@/views/Notification.vue'),
        beforeEnter: authorticated
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
