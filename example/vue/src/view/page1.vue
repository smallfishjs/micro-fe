<template>
  <h4 @click="gotoPage2">goto page2</h4>
</template>
<script>
export default {
  methods: {
    gotoPage2() {
      this.$router.push({
        path: '/page-2'
      })
    }
  }
}
</script>