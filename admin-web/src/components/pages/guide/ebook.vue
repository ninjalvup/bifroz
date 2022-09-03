<template>

      <div class="ebook">      
</div>

</template>

<script>
import swal from 'sweetalert';

export default {
  data() {
            return {
               
            }
        },
  mounted() {
swal("อยู่ระหว่างการพัฒนา!", "", "warning").then(() => {
        this.$router.push("/home");

})
  },
}
</script>

<style>

</style>