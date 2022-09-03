<template>
  <div id="backend">
    <div class="wrapper">
    <Header/>
     <Sidebar/>
      <div class="main-panel">
        <div class="container">
         <router-view></router-view>
         </div>
    <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './../components/shared/Header';
import Sidebar from './../components/shared/Sidebar';
import Footer from './../components/shared/Footer';
export default {
  name: "backend",
  components: {
    Header,
    Sidebar,
    Footer,
  },
};
</script>

<style></style>