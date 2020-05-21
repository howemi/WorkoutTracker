<template>
  <div v-bind:style="{maxHeight: '96.3vh', height: '100%'}">
    <v-container fluid fill-height pl-0 pr-0 pb-0 pt-0>
      <v-layout row align-space-between justify-space-between>
        <v-flex sm4 md3 pr-2>
          <WorkoutList/>
        </v-flex>
        
        <v-flex sm8 md9 pr-2 pl-2>
          <router-view name="workout" :key="$route.fullPath"></router-view>
        </v-flex>
      </v-layout>
    </v-container>
    <v-footer height="auto" color="indigo">
      <v-layout justify-center>
        <v-flex indigo white--text text-xs-center>
          &copy;2020
          <strong>Olympiate</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
import WorkoutList from "../components/workout/WorkoutList.vue"

export default {
  name: 'workoutPage',
  components: { WorkoutList },
}
</script>
