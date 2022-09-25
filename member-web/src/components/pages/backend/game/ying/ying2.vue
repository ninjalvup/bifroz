<template>
  <div id="baccarat">
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <!-- <UserData /> -->
      </div>
    </div>

    <div class="row mt-2 mb-5 justify-content-center">
      <div class="col-md-9">
        <div
          class="card mt-2 shadow"
          style="
            background-image: url(assets/images/custom/bg-menu.png);
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            background-position: center center;
          "
        >
          <div class="card-header text-white p-0">
            <img
              class="img-fluid w-100"
              src="assets/images/custom/ying.png"
              alt=""
            />
          </div>
          <ol
            class="breadcrumb mb-0"
            style="
              background-image: url(assets/images/custom/bg-menu.png);
              background-size: cover;
              background-repeat: no-repeat;
              position: relative;
              background-position: center center;
            "
          >
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item" aria-current="page">เกมส์ยิงปลา</li>
          </ol>
          <div class="card-body">
            <div class="row justify-content-start">


              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokenCq9()"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/cq9.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">CQ9</small>
                </a>
              </div>



              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokenBg()"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/bg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">BG</small>
                </a>
              </div>



              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokenSp()"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/simpler play.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">SimplePlay</small>
                </a>
              </div>



              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokenAmb()"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/ambpokerlogobf.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">AMB Poker</small>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL, gameURL } from "@/services/api";
import axios from "axios";
import postLogin from "@/services/postLogin";

export default {
  data() {
    return {
      sb_username: "",
      sb_password: "",
      sb_password2: "",
      url: "",
      checkMobile: "",
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
    })
      .then((response) => {
        console.log();
        this.sb_username = response.data.data.sb_username;
        this.sb_password = response.data.data.sb_password;
        this.sb_password2 = encodeURIComponent(this.sb_password);

        if (this.isMobile() === true) {
          this.url = `https://m.${gameURL}.com/login/auto/?username=${this.sb_username}&password=${this.sb_password2}&hash=62961e8cc1abf2007ed73590&url=https://member-amfr.superfast-auto.com&lang=th`;
        } else {
          this.url = `https://${gameURL}.com/login/auto/?username=${this.sb_username}&password=${this.sb_password2}&hash=62961e8cc1abf2007ed73590&url=https://member-amfr.superfast-auto.com&lang=th`;
        }

        this.checkMobile = this.isMobile();
      })
      .catch((error) => {
        if (error.response.data == "Unauthorized") {
          sessionStorage.removeItem("access_token");
        }
      });
  },

  methods: {
    async postBetflixToken() {
      let url = `https://api.bifroz.com/betflix/api/loginGame/${this.sb_username}`;
      const res = await axios.get(url);
      window.location.href = res.data.url; // betflix
    },

    async postBetflixTokenWe() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameWe/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenXg() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameXg/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenEg() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameEg/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenCq9() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameCq9/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenR88() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameR88/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenAmb() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameAmb/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenGdg() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameGdg/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
    async postBetflixTokenGd88() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameGd88/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenAg() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameAg/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenBg() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameBg/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenPs() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGamePs/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenSp() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameSp/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenTtg() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameTtg/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenSa() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameSa/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenDg() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameDg/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenSexy() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameSexy/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokenWm() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGameWm/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
    

    async postBetflixTokenPg() {
      try {
        let url = `https://api.bifroz.com/betflix/api/loginGamePg/${this.sb_username}`;
        const res = await axios.get(url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }

      // let url = `https://api.bifroz.com/betflix/api/loginGamePg/${this.sb_username}`;
      // const res = await axios.get(url);
      // window.location.href = res.data.url;
    },

    async postGettoken() {
      //imi
      const form = {
        username: sessionStorage.getItem("sb_username"),
        password: sessionStorage.getItem("sb_password"),
      };

      const res = await postLogin.postUfa(form);
      this.url = res.data.url;

      window.location.href = this.url;
    },
    async playPG() {},

    isMobile() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
  },
};
</script>

<style scoped>
.logoGame {
  background: linear-gradient(to top, #212121, #0c0c0c) !important;
  border-radius: 15px;
}

.wrapper-gametxtName {
  white-space: nowrap;
}
* {
  color: #000;
  font-weight: 700 !important;
}
</style>