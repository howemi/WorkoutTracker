<template>
  <v-content>
    <v-container
        class="fill-height"
        fluid
      >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Not authorized</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              Please log in
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              to="/login"
              color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  
}
</script>