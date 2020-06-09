<template>
  <v-navigation-drawer 
    permanent 
    style="width: 100%; overflow: hidden"
  >
    <v-toolbar color="blue" dark>
      <v-toolbar-title >Your Workouts</v-toolbar-title>
    </v-toolbar>
    
    <v-list>
      <v-list-item
        color="blue"
        @click.prevent="openNewWorkoutForm()"
        v-if="!openNewWorkoutFormValue"
        key="openForm"
      >
        <v-list-item-content>
          <v-list-item-title>Create new workout</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-title>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-title>
        </v-list-item-action>
      </v-list-item>

      <v-list-item v-if="openNewWorkoutFormValue">
        <NewWorkoutForm/>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>

      <div v-if="workouts.length > 0" >
        <v-list-item
          v-for="(workout, key) in workouts"
          :key="key"
          :to="{ name: 'workout', params: { id: workout.workout_id} }"
        >
          <v-list-item-content>
            <v-list-item-title>{{ workout.name }}</v-list-item-title>
          </v-list-item-content>
          <!-- <v-list-item-action>
            <v-list-item-title>{{ EXERCISE_COUNT(workout.workout_id) }}</v-list-item-title>
          </v-list-item-action> -->
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import NewWorkoutForm from './NewWorkoutForm'
  import {mapGetters} from 'vuex'

  export default {
    name: 'workoutList',
    components: { NewWorkoutForm },
    data: () => ({}),
    computed: {
      ...mapGetters(['WORKOUTS']),
      openNewWorkoutFormValue: {
        get() {
          return this.$store.getters.NEW_WORKOUT_FORM
        },
        set(value) {
          this.$store.commit('SET_NEW_WORKOUT_FORM', value)
        },
      },
      workouts: {
        get() {
          console.log("WORKOUTS: ", this.WORKOUTS)
          return this.WORKOUTS
        }
      }
    },
    methods: {
      initialize() {
        if(this.WORKOUTS.length === 0) {
          this.$store.dispatch("GET_WORKOUTS")
        }
      },
      openNewWorkoutForm() {
        this.openNewWorkoutFormValue = true
      },
      EXERCISE_COUNT(index) {
        return this.$store.getters.EXERCISE_COUNT(index);
      }
    },
    mounted () {
     this.initialize()
    }
  }
</script>
