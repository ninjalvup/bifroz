<template>
  <div id="header">
    <!-- NavBar -->
    <nav
      class="navbar navbar-light border-bottom shadow-sm rounded fixed-top"
      style="background-color: #fff"
    >
      <div class="container">
        <router-link to="/home" class="navbar-brand">
          <div class="">
            <!-- <img
             :src="require(`${logo}`)"
             
            /> -->

            <img :src="logo" width="40px" />

            <!-- <img src="https://api.iwin98.net/admin/images/2b7cc13b-fc85-4e64-863d-beccab7210d6.png" alt=""> -->
          </div>
        </router-link>
        <a
          class="btn btn-danger btn-sm rounded-pill border border-white"
          @click="logout"
        >
          <i class="fas fa-sign-out-alt"></i> ออกจากระบบ
        </a>

        <!--  <a href="#" @click="logout" class="rainbow-button" alt="ออกจากระบบ"></a> -->
      </div>
    </nav>

    <section class="logo ml-4 mt-4 text-center">
      <router-link to="/home" class="navbar-brand">
        <div class="text-center"></div>
      </router-link>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { baseURL } from "../../services/api";
// import Swal from "sweetalert2";

export default {
  data() {
    return {
      logo: "",
    };
  },
  mounted() {
    axios({
      method: "get",
      url: baseURL + "/photo/prefix",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.data.prefix[0].logo);
        this.logo = response.data.data.prefix[0].logo;
        let regx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(this.logo);
        if (regx === false) {
          console.log("if");
          this.logo = require("../../../public/assets/images/Logo.png");
        } else {
          console.log("elde");
          this.logo = response.data.data.prefix[0].logo;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // beforeUpdate() {
  //   if (sessionStorage.getItem("access_token")) {
  //     console.log("IF-BEFORE_UPDATE");
  //     let timerInterval;
  //     Swal.fire({
      

  //       imageUrl: "https://omgbet888.net/image/popup.png",
  //       imageWidth: '100%',
  //       imageHeight: '100%',

  //       // html: " ประมาน <b></b> นาที.",
  //       timer: 3456,
  //       timerProgressBar: true,
  //       background: false,
  //       showConfirmButton: true,
  //       allowOutsideClick: true,

  //       didOpen: () => {
  //         // Swal.showLoading();
  //         timerInterval = setInterval(() => {
  //           const content = Swal.getContent();
  //           if (content) {
  //             const b = content.querySelector("b");
  //             let ms = Swal.getTimerLeft();
  //             let minutes = Math.floor(ms / 60000);
  //             let seconds = ((ms % 60000) / 1000).toFixed(0);
  //             if (b) {
  //               b.textContent = `${minutes}:${
  //                 seconds < 10 ? "0" : ""
  //               }${seconds}`;
  //             }
  //           }
  //         }, 1000);
  //       },
  //       willClose: () => {
  //         clearInterval(timerInterval);
  //       },
  //     }).then(async (result) => {
  //       if (result.dismiss === Swal.DismissReason.timer) {
  //         this.time = "I was closed by the timer";
  //       }
  //     });
  //   } else {
  //     alert("ELSE");
  //   }
  // },
  methods: {
    logout() {
      const removeToken = sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      location.reload();
      if (removeToken == null) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
.rainbow-button {
  width: calc(100px + 3px);
  height: calc(30px + 3px);
  background-image: linear-gradient(
    90deg,
    #f8f9fa 0%,
    #aed1f3 49%,
    #ffffff 80%,
    #f8f9fa 100%
  );
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 16px;
  border-radius: 20px;
}
.rainbow-button:after {
  content: attr(alt);
  width: 100px;
  height: 30px;
  background-color: #ce1818;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
.rainbow-button {
  animation: slidebg 2s linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 200px;
  }
}
</style>
