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
          Home
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
          Sign in
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
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
