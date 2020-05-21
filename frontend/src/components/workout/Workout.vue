<template>
  <div>
    WORKOUT {{ id }}
  </div>
</template>

<script>

  export default {
    name: 'workout',
    computed: {
      id() {
        return this.$route.params.id
      },
    },
  }
</script>
