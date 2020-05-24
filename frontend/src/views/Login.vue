<template>
    <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-form
          v-model="valid"
        >
          <v-card class="elevation-12">
            <v-toolbar dark color="blue">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-alert
              type="error"
              :value="error"
              :dismissible="true"
              :text="true"
              border="right"
            >
              Could not log in with provided credentials.
            </v-alert>
            <v-card-text>
              <v-text-field
                v-model="username"
                prepend-icon="mdi-account"
                name="login"
                label="Login"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn to="/signup" color="blue" dark>Sign up</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="green" dark @click.prevent="login()">
                Login
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: 'login',
  data: () => ({
    username: '',
    password: '',
    valid: true,
    error: false
  }),
  methods: {
    login() {
      this.$store.dispatch('LOGIN', {
        username: this.username,
        password: this.password
      })
      .then(success => {
          success;
        this.$router.push('/')
      })
      .catch(error => {
          error;
        this.error = true;
      })
    }
  }
    }
</script>

<style scoped>

</style>