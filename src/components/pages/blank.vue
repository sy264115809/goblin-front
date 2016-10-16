<template>
<div class="note note-info">
  <p> A blank page template with a minimal dependency assets to use as a base for any custom page you create </p>
</div>
</template>

<script>
  export default {
    name: 'Blank',
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$emit('title-change', 'Blank Page')
      })
    }
  }
</script>
