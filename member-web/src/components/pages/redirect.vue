<template>
  <div></div>
</template>

<script>
import authService from "@/services/authService.js";

// import Axios from 'axios'
export default {
  mounted() {
 
    const loginForm = {
      tel: this.$route.query.tel,
      password: this.$route.query.password,
    };
    const res = authService.loginAdmin(loginForm).then((resp) => {
      console.log(resp);

      if (resp.success == true) {
        console.log("A");
        sessionStorage.setItem("access_token", resp.access_token);
        this.$router.push("/home");
      }
    });
   
    console.log(res.Res);
  },
};
</script>

<style></style>
