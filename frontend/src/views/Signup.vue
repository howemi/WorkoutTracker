<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>Signup form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
            v-model="valid">
              <v-alert
                :value="userExists"
                type="error"
                :dismissible="true"
                :text="true"
                icon="mdi-alert"
              >User already exists.</v-alert>

              <v-text-field
                prepend-icon="mdi-account"
                name="login"
                v-model="username"
                label="Username"
                required
                :rules="rules.name"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-moon-last-quarter"
                name="login"
                v-model="firstName"
                label="First Name"
                required
                :rules="rules.name"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-moon-first-quarter"
                name="login"
                v-model="lastName"
                label="Last Name"
                required
                :rules="rules.name"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                v-model="email"
                label="Email"
                required
                :rules="[rules.email]"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                required
                type="password"
                hint="Password must be greater than 8 characters"
                v-model="password"
                :rules="rules.password"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock-outline"
                name="password"
                label="Confirm Password"
                required
                type="password"
                v-model="confirm_password"
                :error="!passwordMatch()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn to="/login" color="blue" dark>Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" :disabled="!valid" @click.prevent="register()">
              Register
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "signup",
      data: () => ({
        valid: true,
        userExists: false,
        username: '', 
        firstName: '',
        lastName: '',
        email: '',
        password: "",
        confirm_password: "",
        rules: {
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          },
          name: [
            v => !!v || 'Name is required',
            v => v.length <= 60 || 'Name must be less than 60 characters',
          ],
          password: [
            v => !!v || 'Password is required',
            v => v.length > 8 || 'Password must be greater than 8 characters'
          ],
        },
      }),
      methods: {
        register() {
          if (this.valid) {
            this.$store.dispatch('REGISTER', {
              username: this.username,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password
            })
            .then(({ response }) => {
              response;
              this.$store.commit("SET_NOTIFICATION", {
                display: true,
                text: 'Your account has been successfully created! Logging in.',
                alertClass: "danger"
              });
              this.$router.push('/');
            })
            .catch (error => {
              error;
              this.userExists = true;
            })
          }
        },
        passwordMatch() {
          return this.password === this.confirm_password;
        }
      }
    }
</script>

<style scoped>

</style>