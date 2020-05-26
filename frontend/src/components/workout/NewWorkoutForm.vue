<template>
  <v-container fluid>
    <v-layout row>
      <v-col cols="12">
        <v-text-field
          v-model="workoutName"
          label="Workout Title"
          placeholder="Type a name"
          :loading="loading"
          color="success"
          :disabled="disabled"
          counter="60"
          :rules="rules.name"
          @keyup.enter="postWorkout()"
        ></v-text-field>
      </v-col>
    </v-layout>
    <v-layout row>
      <v-col cols="12">
        <v-btn
          class="flex"
          text
          color="secondary"
          @click="cancelNewWorkout()"
          key="cancelForm"
        >
          Cancel
        </v-btn>
        <v-btn
          class="flex"
          color="primary"
          @click="postWorkout()"
          key="postWorkout"
        >
          Add +
        </v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: 'newWorkoutForm',
    data: () => ({
      workoutName: '',
      loading: false,
      disabled: false,
      rules: {
        name: [
            v => !!v || 'Name is required',
            v => v.length <= 60 || 'Name must be less than 60 characters',
          ],
      },
    }),
    created() {
      this.workoutName = this.$moment().format('MMMM D, YYYY - hh:mm A')
    },
    methods: {
      cancelNewWorkout() {
        this.$store.commit('SET_NEW_WORKOUT_FORM', false)
      },
      postWorkout() {
        this.loading = true
        this.disabled = true
        this.$store.dispatch('POST_WORKOUT', {
          name: this.workoutName,
        })
          .then(() => {
            this.$store.commit("SET_NEW_WORKOUT_FORM", false)
            
          })
          .catch(() => {
            this.loading = false
            this.disabled = false
          })
      }
    },
  }
</script>
