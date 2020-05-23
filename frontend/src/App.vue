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
          Log in
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-content>


        <!-- If using vue-router -->
        <router-view></router-view>

    </v-content>

    <v-footer height="auto" color="indigo">
      <v-layout justify-center>
        <v-flex indigo white--text text-xs-center>
          &copy;2020
          <strong>Olympiate</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  })
};
</script>
