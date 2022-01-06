<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    console.log(process.env.NODE_ENV, 'NODE_ENV')
  },
  methods: {
    showPDF() {
      window.open('/assets/pdf/web/viewer.html?file=http://10.97.1.7:30675/zkwg-f57a56d8/b83624983cc8d6a50d4a680fab43f8ce.pdf')
    },
  }
}
</script>

<style>
</style>
