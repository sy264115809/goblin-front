<template>
<div class="note note-info">
  <p> A blank page template with a minimal dependency assets to use as a base for any custom page you create </p>
</div>
</template>

<script>
  export default {
    name: 'BlankPage',
    data () {
      return {}
    },
    route: {
      activate (t) {
        this.$dispatch('titl-change', 'Blank Page')
        t.next()
      }
    }
  }
</script>
