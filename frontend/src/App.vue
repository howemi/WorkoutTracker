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
      <router-link
        v-if="!loggedIn"
        to="/login">
        <v-btn
          text
        >
          Log in
        </v-btn>
      </router-link>
      <v-btn
        v-else
        @click.prevent="logout()"
        text
      >
      Log out
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

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
    ...mapGetters(['TOKEN']),
    loggedIn() {
      return this.TOKEN !== null
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('INVALIDATE_TOKEN')
        .then(() => {
          this.$router.push('/')
        })
      this.$store.commit('CLEAR_WORKOUTS')
    }
  }
};
</script>
