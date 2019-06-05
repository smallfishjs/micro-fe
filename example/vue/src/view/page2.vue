<template>
  <h4 @click="gotoPage1">goto page1</h4>
</template>
<script>
export default {
  methods: {
    gotoPage1() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>