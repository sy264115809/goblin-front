<template>
<div class="note note-info">
  <p> 这是一个仅供展示的空白页。 </p>
</div>
</template>

<script>
  import {emitTitleChanged} from './helper'
  export default {
    name: 'Blank',
    beforeRouteEnter: emitTitleChanged('空白页')
  }
</script>
