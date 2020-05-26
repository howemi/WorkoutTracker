<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/">
        <v-btn
          text
        >
          Olympiate
        </v-btn>
      </router-link>
      <router-link to="/workouts">
        <v-btn
          text
        >
          Workouts
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/login">
        <v-btn
          text
        >
          {{loginText()}}
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer
      color="info lighten-1"
      padless
    >
      <v-row
        justify="center"
      >
        <v-col
          class="primary lighten-2 py-1 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Olympiate</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(['TOKEN'])
  },
  methods: {
    loginText() {
      if (this.TOKEN) {
        return "Logged In"
      }
      else {
        return "Log In"
      }
    }
  }
};
</script>
