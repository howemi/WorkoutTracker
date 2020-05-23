<template>
  <div v-bind:style="{height: '100%'}">
    <v-container fluid fill-height pa-0 >
      <v-layout row align-space-between justify-space-between>
        <transition name="slide-fade">
          <v-flex sm4 md3 pr-2 v-if="showWorkoutBar">
            <WorkoutList/>
          </v-flex>
        </transition>
        
        <v-flex sm8 md9 pr-3 pl-2 v-if="showWorkoutView">
          <router-view name="workout" :key="$route.fullPath"></router-view>
        </v-flex>
      </v-layout>
    </v-container>
    
    <Notification/>
  </div>
</template>

<style scoped>
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease;
  }
  
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

<script>
import WorkoutList from '../components/workout/WorkoutList'
import Notification from '../components/Notification'

export default {
  name: 'workoutDashboard',
  components: { WorkoutList, Notification },
  computed: {
    showWorkoutBar() {
      if(document.documentElement.clientWidth < 600) {
        if(this.$route.name === 'workoutDashboard') {
          return true
        } else return false
      } else return true
    },
    showWorkoutView() {
      if(document.documentElement.clientWidth > 600) {
        return true
      } else {
        if(this.$route.name === 'workout') {
          return true
        } else return false
      }
    },
  },
}
</script>
