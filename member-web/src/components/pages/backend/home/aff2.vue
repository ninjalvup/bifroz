<template>
  <div id="aff">
    <div
      class="row justify-content-center"
      style="
        background-image: url(assets/images/custom/bg-2.png);
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        /* width: 100%; */
      "
    >
      <!-- <div class="col-1"></div> -->
      <div class="col-6 p-1 pl-3 pb-2">
        <router-link to="/depositlist">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-1.webp"
            alt=""
          />
        </router-link>
      </div>

      <!-- <div class="col-2"></div> -->
      <div class="col-6 p-1 pr-3 pb-2">
        <router-link to="/withdraw">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-2.webp"
            alt=""
          />
        </router-link>
      </div>

      <!-- <div class="col-1"></div> -->
      <!-- <div class="col-4">
        <router-link to="/report">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-3.webp"
            alt=""
          />
        </router-link>
      </div> -->

      <div class="col-md-12">
        <img
          class="img-fluid w-100"
          src="assets/images/custom/aff-bg.webp"
          alt=""
        />
        <!-- คอมพิวเตอร์ -->

        <div
          class="positioned-1-pc d-none d-md-block"
          style="width: 14vw; position: absolute"
        >
          <router-link to="/sharedLink">
            <img
              class="img-fluid position-relaive w-100"
              src="assets/images/custom/aff-link.webp"
              alt=""
            />
          </router-link>
        </div>

        <div class="positioned-2-pc d-none d-md-block">
          <div class="text-center">
            <h5 class="link-text-pc">
              รายได้
              {{ this.income }}
              <img
                @click="refresh"
                class="refresh crossRotate"
                src="./../../../../assets/img/lk/reload.png"
                alt=""
                width="40px"
              />
            </h5>
          </div>
        </div>

        <!-- โทรศัพท์ -->

        <div class="positioned-1-mb d-md-none" style="position: absolute">
          <router-link to="/sharedLink">
            <img
              class="img-fluid position-relaive w-100"
              src="assets/images/custom/aff-link.webp"
              alt=""
            />
          </router-link>
        </div>

        <div class="positioned-2-mb d-md-none">
          <div class="text-center">
            <h5 class="link-text-mb">
              รายได้
              {{ this.income }}
              <img
                @click="refresh"
                class="refresh crossRotate"
                src="./../../../../assets/img/lk/reload.png"
                alt=""
                width="40px"
              />
            </h5>
          </div>
        </div>
      </div>

      <!-- <div class="card-link">
              <div
                class="container-game"
                style="
                  background-image: url(assets/images/custom/aff-bg.webp);
                  background-size: cover;
                  background-repeat: no-repeat;
                  position: relative;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  height: 90vw;
                  height: 90vw;
                  width: 100vw;
                "
              ></div>
              <img
                class="img-fluid position-relaive w-100"
                src="assets/images/custom/aff-bg.webp"
                alt=""
              />
              <img
                class="img-fluid position-relaive w-100"
                src="assets/images/custom/aff-link.webp"
                alt=""
              />
            </div> -->
    </div>
    <!-- ลิงค์รับทรัพย์ -->

    <!-- <div class="row mt-1 justify-content-center">
        <div class="col-md-12">
            <div class="card  shadow">
                <div class="card-body " style="  background: linear-gradient(0deg, #007bff 0%, rgb(0 121 255 / 62%) 100%);">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-center text-white">
                                <img src="assets/images/icons/profile.png" style="width: 50px; height: 50px" />
                                <h6 class="font-size-label">
                                    User: {{ sb_username }}
                                    <i @click="copy" v-clipboard:copy="sb_username" class="far fa-copy"></i>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 mx-auto col-6">
                            <br />
                            <div class="d-flex justify-content-center">
                                <div class=" text-white">
                                    <span class="text-warning text-center" style="font-size: 22px">เครดิต
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center  text-center mt-2">
                                <label class="text-white" style="font-size: 22px">
                                    {{ credit | formatNumber }}
                                    <img @click="refresh" class="refresh crossRotate" src="./../../../../assets/img/lk/reload.png" alt="" width="40px" />
                                </label>
                            </div>
                        </div>

                        <div class="col-sm-6 col-6 ">
                            <div class="d-flex justify-content-center mt-4">
                                <span class="text-warning " style="font-size: 22px">รายได้
                                </span>
                            </div>
                            <div class="d-flex  justify-content-center mt-2">
                                <label class="text-white" style="font-size: 22px">
                                    {{ this.income }}
                                    <img @click="refresh" class="refresh crossRotate" src="./../../../../assets/img/lk/reload.png" alt="" width="40px" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { baseURL } from "./../../../../services/api";
import gameService from "./../../../../services/loginGame";
import profileService from "./../../../../services/profile";
import jQuery from "jquery";
import incomeervice from "@/services/incomeService";
export default {
  name: "aff",
  data() {
    return {
      tel: "",
      first_name: "",
      last_name: "",
      member_credit: "",
      sb_username: "",
      sb_password: "",
      credit: "",
      income: "0.00",
    };
  },
  mounted() {
    jQuery(document).ready(function () {
      jQuery(".crossRotate").click(function () {
        if (jQuery(this).css("transform") == "none") {
          jQuery(this).css("transform", "rotate(360deg)");
        } else {
          jQuery(this).css("transform", "");
        }
      });
    });
    axios({
      method: "get",
      url: baseURL + "/member/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.first_name = response.data.data.first_name;
        this.last_name = response.data.data.last_name;
        this.tel = response.data.data.tel;
        this.member_credit = response.data.data.member_credit;
        this.sb_username = response.data.data.sb_username;
        this.sb_password = response.data.data.sb_password;
        this.prefix = response.data.data.prefix;
        sessionStorage.setItem("sb_username", this.sb_username);
        sessionStorage.setItem("sb_password", this.sb_password);
        sessionStorage.setItem("prefixAfiliate", this.prefix);
        // this.loginGame();
      })
      .catch((error) => {
        console.log(error);
        this.$router.push("/login");
      });
    this.getCredit();
    this.getIncome();
  },
  methods: {
    //ดึงเครดิต
    async getCredit() {
      const resp = await profileService.getCredit();
      this.credit2 = resp.data.data.credit;
      this.credit3 = this.credit2 | this.formatNumber;
      if (this.credit3 == 0) {
        this.credit = 0;
      } else {
        this.credit = this.credit2;
      }
    },
    refresh() {
      // this.loginGame();
      this.getCredit();
    },
    async loginGame() {
      try {
        const data = {
          username: sessionStorage.getItem("sb_username"),
          password: sessionStorage.getItem("sb_password"),
        };
        const resp = await gameService.loginGame(data);
        if (resp.code === 0) {
          sessionStorage.setItem("token", resp.result.access_token);
          sessionStorage.setItem("user", JSON.stringify(resp.result.profile));
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("password", data.password);
        }
      } catch (error) {
        console.log(error);
      }
    },
    copy() {
      this.$toast.success("คัดลอก User สำเร็จ", {
        position: "top-right",
        timeout: 1500,
      });
    },
    async getIncome() {
      const rs = await incomeervice.getIncome();
      this.income = rs.income;
    },
  },
};
</script>

<style scoped>
.positioned-1-pc {
  background-size: cover;
  /* height: 12vh;
  width: 55vh; */
  position: absolute;
  top: 20%;
  right: 7%;

  opacity: 1;
  /* optional, to see position */
}

.positioned-2-pc {
  background-size: cover;
  /* height: 12vh;
  width: 12vh; */
  position: absolute;
  top: 24%;
  left: 7%;
  opacity: 1;
  /* optional, to see position */
}

.positioned-1-mb {
  background-size: cover;
  /* height: 12vh;
  width: 55vh; */
  position: absolute;
  top: 22%;
  right: 7%;

  opacity: 1;
  /* optional, to see position */
}

.positioned-2-mb {
  background-size: cover;
  /* height: 12vh;
  width: 12vh; */
  position: absolute;
  top: 27%;
  left: 7%;
  opacity: 1;
  /* optional, to see position */
}

@media (max-aspect-ratio: 1/1) {
  /* css for vertical viewport */
  .container-aff {
    height: 90vw;
    width: 100vw;
  }
  .positioned-1 {
    /* height: 30vw;
    width: 30vw; */
  }
  .positioned-2 {
    height: 13vw;
    width: 45vw;
  }
}
.link-text-mb {
  font-size: 5vw;
  font-weight: bold;
  color: black;
}

.link-text-pc {
  font-size: 3vw;
  font-weight: bold;
  color: black;
}

h5 {
    background: linear-gradient(to bottom, #cfc09f 22%,#ffecb3 24%, #cfc09f 26%, #cfc09f 27%,#ffecb3 40%,#cfc09f 78%); 
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #fff;
font-family: 'Playfair Display', serif;
    position: relative;
	text-transform: uppercase;	
	font-size: 18vw;
	margin: 0;
	font-weight: 400;
}

h5:after {
    background: none;
    content: attr(data-heading);
    left: 0;
	top: 0;
    z-index: -1;
    position: absolute;
    text-shadow: 
		-1px 0 1px #c6bb9f, 
		0 1px 1px #c6bb9f, 
		5px 5px 10px rgba(0, 0, 0, 0.4),
		-5px -5px 10px rgba(0, 0, 0, 0.4);
}
</style>>
