<template>
  <div id="aff">
    <div class="row mt-2 justify-content-center px-2">
      <div class="col-12 col-lg-6 p-0">
        <!-- pc -->
        <div
          class="position-absolute ab-3 d-none d-md-block"
          style="
            top: 10%;
            left: 9%;
            max-width: 100%;
            height: auto;
            text-align: end;
            display: flex;
          "
        >
          <div class="text-center">
            <span class="d-block f1">ยอดเครดิตของคุณ</span>
            <span class="d-block f2"
              >{{ Number(credit).toLocaleString() }} ฿
              <img
                @click="refresh"
                class="refresh crossRotate"
                src="./../../../../assets/img/lk/reload.png"
                alt=""
                width="40px"
              />
            </span>
          </div>
        </div>

        <!-- mb -->

        <div
          class="position-absolute ab-3 d-block d-md-none"
          style="
            top: 5%;
            left: 5%;
            max-width: 100%;
            height: auto;
            text-align: end;
            display: flex;
          "
        >
          <div class="text-center">
            <span class="d-block f1-m">ยอดเครดิตของคุณ </span>
            <span></span>
            <span class="d-block f2-m"
            style="
    margin-top: -15px;
"
              >{{ Number(credit).toLocaleString() }} ฿
              <img
                @click="refresh"
                class="refresh crossRotate"
                src="./../../../../assets/img/lk/reload.png"
                alt=""
                width="40px"
              />
            </span>
          </div>
        </div>

        <!-- pc -->
        <div
          class="position-absolute ab-3 d-none d-md-block"
          style="
            top: 60%;
            left: 11%;
            max-width: 100%;
            height: auto;
            text-align: end;
            color: wheat;
            display: flex;
          "
        >
          <div class="text-center">
            <span class="d-block ff1">ยอดรายได้แนะนำเพื่อนของคุณ</span>
            <span class="d-block ff2"
              >{{ this.income }} ฿
              <img
                @click="refresh"
                class="refresh crossRotate"
                src="./../../../../assets/img/lk/reload.png"
                alt=""
                width="40px"
              />
            </span>
          </div>
        </div>

        <!-- mb -->

        <div
          class="position-absolute ab-3 d-block d-md-none"
          style="
            top: 60%;
            left: 4%;
            max-width: 100%;
            height: auto;
            text-align: end;
            color: wheat;
            display: flex;
          "
        >
          <div class="text-center"
          style="
    margin-top: -9px;
"
          
          >
            <span class="d-block ff1-m">ยอดรายได้แนะนำเพื่อนของคุณ </span>
            <span class="d-block ff2-m"
              >{{ this.income }} ฿
              <img
                @click="refresh"
                class="refresh crossRotate"
                src="./../../../../assets/img/lk/reload.png"
                alt=""
                width="40px"
              />
            </span>
          </div>
        </div>

        <div
          class="position-absolute ab-3"
          style="
            top: 14%;
            left: 61%;
            max-width: 35%;
            height: auto;
            text-align: end;
            display: flex;
          "
        >
          <router-link v-if="bank_name === 'kbnk'" to="/decimal" class="">
            <img class="img-fluid" src="assets/images/header/f.png" alt="" />
          </router-link>

          <router-link v-if="bank_name !== 'kbnk'" to="/bankInfo" class="">
            <img class="img-fluid" src="assets/images/header/f.png" alt="" />
          </router-link>

          <router-link to="/withdraw" class="">
            <img class="img-fluid" src="assets/images/header/t.png" alt="" />
          </router-link>
        </div>

        <div
          class="position-absolute ab-3"
          style="top: 60%; left: 35%; text-align: end"
        >
          <router-link to="/sharedLink" class="">
            <img
              class="img-fluid"
              src="assets/images/header/l.png"
              alt=""
              style="max-width: 65%"
            />
          </router-link>
        </div>

        <img class="img-fluid" src="assets/images/header/bg.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseURL } from "../../../../services/api";
import gameService from "../../../../services/loginGame";
import profileService from "../../../../services/profile";
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
      credit5: "",
      income: "0.00",
      bank_name: "",
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
        this.bank_name = response.data.data.bank_name;
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
  background: linear-gradient(
    to bottom,
    #cfc09f 22%,
    #ffecb3 24%,
    #cfc09f 26%,
    #cfc09f 27%,
    #ffecb3 40%,
    #cfc09f 78%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #fff;
  font-family: "Playfair Display", serif;
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
  text-shadow: -1px 0 1px #c6bb9f, 0 1px 1px #c6bb9f,
    5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(0, 0, 0, 0.4);
}
.f1 {
  font-family: PSL-BOLD !important;
    font-weight: normal !important;
  font-size: 2vw;
}

.f1-m {
  font-family: PSL-BOLD !important;
    font-weight: normal !important;
  font-size: 6vw;
}
.f2 {
  font-family: PSL-BOLD !important;
    font-weight: normal !important;
  font-size: 3vw;
}

.f2-m {
  font-family: PSL-BOLD !important;
    font-weight: normal !important;
  font-size: 9vw;
}

.ff1 {
  font-family: PSL-BOLD !important;
    font-weight: normal !important;
  font-size: 1.5vw;
}

.ff1-m {
  font-family: PSL-BOLD !important;
    font-weight: normal !important;
  font-size: 5vw;
}
.ff2 {
  font-family: PSL-BOLD !important;
    font-weight: normal !important;
  font-size: 2vw;
}

.ff2-m {
  font-family: PSL-BOLD !important;
    font-weight: normal !important;
  font-size: 6vw;
}

.font-weight-bold {
    font-family: PSL-BOLD !important;
    font-weight: normal !important;
}

@font-face {
  font-family: PSL-BOLD;
  src: url(./../../../../assets/font/PSL-BOLD.TTF);
}
</style>>
