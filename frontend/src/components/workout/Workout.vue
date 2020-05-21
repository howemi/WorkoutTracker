<template>
  <div>
    Your workout on {{ rightNow }}
  </div>
</template>

<script>

  export default {
    name: 'workout',
    data: () => ({
      
    }),
    computed: {
      rightNow() {
        return this.$moment().format('MMMM Do YYYY')
      },
      id() {
        return this.$route.params.id
      },
    },
  }
</script>
