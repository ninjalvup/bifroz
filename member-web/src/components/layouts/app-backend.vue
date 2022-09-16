<template>
  <div id="app-backend">
    <Header />

    <div class="container  pt-3" style="padding-bottom: 20%;">
    <router-view/>
    </div>
test
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