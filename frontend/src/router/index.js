import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Olympiate Workout Tracker',
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  
  {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Log In'
      },
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      title: 'Sign up'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/workouts',
    name: 'workoutDashboard',
    meta: {
      title: 'Olympiate Workout Tracker'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutDashboard.vue'),
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

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
