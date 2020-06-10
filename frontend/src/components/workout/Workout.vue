<template>
  <div v-if="!loading">
    
    <v-data-table
    :headers="headers"
    :items="exercises"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ CURRENT_WORKOUT(id).name }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Exercise</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Exercise Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="exercisetypes" v-model="editedItem.type" label="Exercise Type"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.seconds" label="Duration (seconds)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.weight" label="Weight"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.reps" label="Reps"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      Add an exercise to get started
    </template>
  </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'workout',
    data: () => ({
      loading: true,
      dialog: false,
      snack: false,
      snackColor: '',
      snackText: '',
      exercises: [],
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Type', value: 'type' },
        { text: 'Duration (seconds)', value: 'seconds' },
        { text: 'Weight', value: 'weight' },
        { text: 'Reps', value: 'reps' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      exercisetypes: ['Strength', 'Endurance'],
      editedItem: {
        setid: 0,
        name: '',
        type: '',
        seconds: 0,
        weight: 0,
        reps: 0,
      },
      defaultItem: {
        setid: 0,
        name: '',
        type: '',
        seconds: 0,
        weight: 0,
        reps: 0,
      },
    }),
    computed: {
      ...mapGetters(['WORKOUT_EXERCISES', 'CURRENT_WORKOUT']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      rightNow() {
        return this.$moment().format('MMMM Do YYYY - HH:MMA')
      },
      id() {
        return this.$route.params.id
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {
        if(this.WORKOUT_EXERCISES(this.id) === undefined) {
          this.$store.dispatch("GET_EXERCISES", {workoutId: this.$route.params.id})
          .then(() => {
            this.exercises = this.WORKOUT_EXERCISES(this.id)
            this.loading = false
          })
        } else {
          this.exercises = this.WORKOUT_EXERCISES(this.id)
          this.loading = false
        }
      },
      editItem (item) {
        this.editedIndex = this.exercises.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.exercises.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.$store.dispatch('DELETE_EXERCISE', {
          exerciseId: item.exercise_id,
          workoutId: this.id,
          index: index,
        })
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        // this.loading = true
        if (this.editedIndex > -1) {
          this.$store.dispatch('UPDATE_EXERCISE', {
            editedItem: this.editedItem,
            editedIndex: this.editedIndex,
            workoutId: this.id,
          })
            .then(() => {
              this.exercises = this.WORKOUT_EXERCISES(this.id)
            })
        } else {
          // this.loading = true
          this.$store.dispatch('POST_EXERCISE', {
            newExercise: this.editedItem,
            workoutId: this.id,            
          })
            .then(() => {
              this.exercises = this.WORKOUT_EXERCISES(this.id)
            })
        }
        this.close()
      },
    },
  }
</script>
