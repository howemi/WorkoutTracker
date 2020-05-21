import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  
  {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/workouts',
    name: 'workoutPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutPage.vue'),
    children: [
      {
        path: ':id',
        name: 'workout',
        components: { workout: () => import(/* webpackChunkName: "about" */ '../components/workout/Workout.vue') },
      },
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
