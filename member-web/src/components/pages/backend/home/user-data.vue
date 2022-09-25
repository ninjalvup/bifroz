<template>
  <div id="user-data">
    <div class="row justify-content-center">
      <div class="col-md-12 p-0">
        <img
          class="img-fluid w-100"
          src="assets/images/custom/money-bg.gif"
          alt=""
        />
        <div
          class="positioned-1 d-flex align-items-center justify-content-center justify-content-center"
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "
        >
          <div class="text-center">
            <h5 class="m-0 text-respon-1">
              ยอดเงิน
            </h5>
            <h6 class="m-0 text-respon-3">
              {{ credit | formatNumber }}
            </h6>
              <img
                @click="refresh"
                class="refresh crossRotate"
                src="./../../../../assets/img/lk/reload.png"
                alt=""
                width="40px"
              />
          </div>
        </div>

        <!-- <div class="row">
          <div class="col-12 bg1 p-0">
            <div
              class="container-game"
              style="
                background-image: url(assets/images/custom/money-bg.gif);
                background-size: cover;
                background-repeat: no-repeat;
                position: relative;

                height: 50vw;
                width: 100vw;
                z-index: 0;
              "
            >
              <div
                class="positioned-1"
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "
              >
                <div class="text-center">
                  <h3 class="m-0 text-respon-1">
                    <i class="fa fa-wallet"></i>
                  </h3>
                  <h6 class="m-0 text-respon-3">
                    {{ credit | formatNumber }}
                    <img
                      @click="refresh"
                      class="refresh crossRotate"
                      src="./../../../../assets/img/lk/reload.png"
                      alt=""
                      width="40px"
                    />
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
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
  name: "user-data",
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
.positioned-1 {
  background-size: cover;

  opacity: 1;
  /* optional, to see position */
}

@media (max-aspect-ratio: 1/1) {
  /* css for vertical viewport */
  .container-game {
    height: 90vw;
    width: 90vw;
  }
  .positioned-1 {
    height: 13vw;
    width: 35vw;
  }
}

.text-respon-1 {
  font-size: 2vh;
  font-weight: bold;
  color: black;
  text-shadow: 0.5px 0.5px black;
}
.text-respon-2 {
  font-size: 5vw;
  font-weight: bold;
  color: black;
  text-shadow: 0.5px 0.5px black;
}
.text-respon-3 {
  font-size: 2vh;
  font-weight: bold;
  color: black;
  text-shadow: 0.5px 0.5px black;
}


</style>>
