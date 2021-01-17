<template>
  <div>
    <div :style="{backgroundImage: `url(${backgroundUrl})`}">
        <div id="main-view">
          <div id="hero-box" class="text-center">
            Watch Yourself Grow
          </div>
          <div class="mt-5 text-center">
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
</template>

<style scoped>
  #main-view {
      position: absolute;
     width: 100%;
     background-size: cover;
     background-image: url(/img/fitness.99cfd922.jpg);
     /* background-size: cover; */
     background-repeat: no-repeat;
     /* background-size: 100%; */
     background-position: center;
     height: 100%;
 }
 #hero-box{
    padding-top: 125px;
    font-size: 50px;
    color: #1976d2;
    font-weight: bold;
 }
</style>
<script>

import backgroundUrl from '../assets/fitness.jpg'
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
