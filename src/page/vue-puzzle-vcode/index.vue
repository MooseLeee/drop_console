<template>
  <div>
    <Vcode
      :show="isShow"
      @success="success"
      @close="close"
    />
  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode";

export default {
  name: "index",
  data() {
    return {
      isShow: true,
    }
  },
  components: {
    Vcode,
  },
  methods: {
    success(e) {
      console.log(e, 'success')
    },
    close(e) {
      console.log(e, 'close')
    },
  }
}
</script>

<style scoped>

</style>