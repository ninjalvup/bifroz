<template>
  <div id="app-backend">
    <Header />

    <div class="container-fluid mt-1">
    <router-view/>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "./../shared/header";
import Footer from "./../shared/footer";
export default {
  name: "app-backend",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>