<template>
  <section>
    <div :style="{backgroundImage: `url(${backgroundUrl})`}" style="margin-left: 0px; background-size: cover">
      <div style="height: 550px;" >
        <div style="background-color: rgba(255,255,255,0.6); position: absolute;
                margin-left: 10%; margin-right: 10%; margin-top: 5%; height: 80%; width: 80%;">
          <div style="text-align: center; padding-top: 125px; font-size: 50px; color: #1976d2; font-weight: bold;">
            Commit to be Fit
          </div>
          <br>
          <br>
          <br>
          <div style="text-align: center;">
            <v-btn
                    color="#1976d2"
                    style="color: white; display: inline-block; padding-top: 10px;"
                    :to="calcRoute()"
            >
              Get Started!
            </v-btn>
          </div>
          <br>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import backgroundUrl from '../assets/workout.jpg'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data: function() {
    return {
      backgroundUrl
    }
  },
  computed: {
    ...mapGetters(['TOKEN'])
  },
  methods: {
    calcRoute() {
      if (this.TOKEN) {
        return "/workouts"
      }
      else {
        return "/login"
      }
    }
  }
}
</script>
