<template>
  <div id="header">
    <!-- NavBar -->

    <div class="container-fluid text-white navbar-cus">
      <div class="row">
        <div
          class="col-4 d-flex flex-column align-items-center align-self-center"
        >
          <h5 class="text-center">
            <router-link to="/profile" class="">
              <img
                class="img-fluid logo-member"
                data-v-de248372=""
                src="assets/images/custom/logo.png"
              />
            </router-link>
          </h5>
          <h5 style="font-size: 3.25vw">{{ tel }}</h5>
        </div>
        <div
          class="
            col-4
            text-center
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <router-link to="/home" class="">
            <img class="img-fluid" :src="logo" alt="" />
          </router-link>
        </div>
        <div
          class="col-4 text-right d-flex align-items-center justify-content-end"
        >
          <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
              <h5 class="text-respon-1"><i class="fa fa-bars"></i></h5>
            </label>

            <ul class="menu__box2"  @click="clear()"></ul>
            <ul class="menu__box">



              <router-link to="/sharedLink" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/icon-link.PNG"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="25"
                    />
                    <span class="ml-4">

                      ลิงค์รับทรัพย์
                    </span>
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>


              <router-link to="/casino" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/icon-casino.PNG"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    <span class="ml-4">
                      คาสิโน
                    </span>
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>


              <router-link to="/casino" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/icon-casino.PNG"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    <span class="ml-4">
                      บาคาร่า
                    </span>
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>

              <router-link to="/hit" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/game1.png"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    <span class="ml-4">
                      เกมส์ฮิต
                    </span>
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>

              <router-link to="/slot" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/game2.png"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    <span class="ml-4">
                      สล็อต
                    </span>
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>


              <router-link to="/profile" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/icon-accountuser.PNG"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    <span class="ml-4">
                      บัญชีผู้ใช้
                    </span>
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>

              <router-link to="/changPassword" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/icon-changepassword.PNG"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    <span class="ml-4">
                      เปลี่ยนรหัสผ่าน
                    </span>
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>



              <li @click="logout" class="nav-link">
                  <a
                    class="menu__item"
                    href="#"
                    style="
                      color: white;
                      position: relative;
                    "
                  >
                  <img
                      src="assets/images/custom/icon-logout.PNG"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                  <span class="ml-4">
                    ออกจากระบบ
                  </span>
                    <div class="text-center mt-2" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
                  </a>
                </li>
              

              <!-- 
                <router-link to="/home" class="nav-link">
                <li @click="clear()">
                  <a
                    class="menu__item menu__item_home text-center"
                    href="#"
                    style="
                      color: black;
                      background-image: url(assets/images/custom/bg-menu.png);
                      background-size: cover;
                      background-repeat: no-repeat;
                      background-position: center top;
                      position: relative;
                    "
                  >
                    หน้าหลัก
                  </a>
                </li>
              </router-link>
              

              <router-link to="/depositlist" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/fak.webp"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    ฝากเงิน
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>


              
              <router-link to="/withdraw" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/fak.webp"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    ถอนเงิน
                  </a>
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>

              

              <router-link to="/promotion" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/promotion.webp"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    โปรโมชั่น</a
                  >
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>

              <router-link to="#" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/pagrad.webp"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    ประกาศ</a
                  >
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>

              <router-link to="#" class="nav-link">
                <li @click="clear()">
                  <a class="menu__item" href="#">
                    <img
                      src="assets/images/custom/tidtor.png"
                      class="img-fluid"
                      alt=""
                      srcset=""
                      width="30"
                    />
                    ติดต่อ</a
                  >
                </li>
                <div class="text-center" style="border-top: 1px solid #8c8b8b;width:100%;top: 6.2rem;"> </div>
              </router-link>


                <li @click="logout">
                  <a
                    class="menu__item menu__item_home text-center btn-danger m-3"
                    href="#"
                    style="
                      color: white;
                      position: relative;
                    "
                  >
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    ออกจากระบบ
                  </a>
                </li> -->
            </ul>
          </div>

          <!-- <h5 class="text-respon-1"><i class="fa fa-bars"></i></h5> -->
        </div>
      </div>
    </div>

    <!-- <nav
      class="navbar navbar-light border-bottom shadow-sm rounded fixed-top"
      style="background-color: #fff"
    >
      <div class="container">
        <router-link to="/home" class="navbar-brand">
          <div class="">

            <img :src="logo" width="40px" />
          </div>
        </router-link>
        <a
          class="btn btn-danger btn-sm rounded-pill border border-white"
          @click="logout"
        >
          <i class="fas fa-sign-out-alt"></i> ออกจากระบบ
        </a>
      </div>
    </nav>

    <section class="logo ml-4 mt-4 text-center">
      <router-link to="/home" class="navbar-brand">
        <div class="text-center"></div>
      </router-link>
    </section> -->
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
      tel: "",
    };
  },
  mounted() {
    axios({
      method: "get",
      url: baseURL + "/member/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    }).then((response) => {
      this.tel = response.data.data.tel;
      // this.loginGame();
    });

    axios({
      method: "get",
      url: baseURL + "/photo/prefix",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.data.prefix[0].logo);
        this.logo = response.data.data.prefix[0].logo;
        let regx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(this.logo);
        if (regx === false) {
          console.log("if");
          this.logo = require("../../../public/assets/images/Logo.png");
        } else {
          // console.log("elde");
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
    clear: () => {
      document.getElementById("menu__toggle").checked = false;
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

.navbar-cus {
  padding-top: 1%;
  padding-bottom: 1%;
  background: #000;
  display: inline-block;
  box-shadow: 0 0 15px #229999;
  transition: 0.4s;
}
.text-respon-1 {
  font-size: 7vw;
}
.logo-member {
  width: 10vw !important;
}

#menu__toggle {
  opacity: 0;
}

#menu__toggle:checked ~ .menu__box {
  /* left: 0 !important; */
  right: 0px !important;
}
#menu__toggle:checked ~ .menu__box2 {
  /* left: 0 !important; */
  right: 0px !important;
}

.menu__btn {
  /* position: fixed; */
  top: 40px;
  right: 20px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 1;
}

.menu__box {
  display: block;
  position: fixed;
  top: 0;
  right: -100%;
  width: 220px;
  /* height: 100%; */
  margin: 0;
  padding: 30px 0;
  list-style: none;
  background-color: #111315;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  transition-duration: 0.25s;
  z-index: 5;
  border-bottom-left-radius: 40px;
}

.menu__box2 {
  display: block;
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 80px 0;
  list-style: none;
  background-color: black;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  transition-duration: 0s;
  opacity: 50%;
  z-index: 4;
}


.menu__item {
  display: block;
  padding: 8px 0px;
  color: white;
  font-family: "PSL-BOLD" !important;
  /* font-family: "Roboto", sans-serif; */
  font-size: 1em;
  /* font-weight: 600; */
  text-decoration: none;
  transition-duration: 0.25s;
  text-align: left;
  padding-top: 0px;
  padding-bottom: 10px;
}


.menu__item_home {
  display: block;
  padding: 8px 0px;
  color: white;
  font-family: "PSL-BOLD" !important;
  /* font-family: "Roboto", sans-serif; */
  font-size: 1em;
  /* font-weight: 600; */
  text-decoration: none;
  transition-duration: 0.25s;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.menu__item:hover {
  background-color: black;
}


</style>
