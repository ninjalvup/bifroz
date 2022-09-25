<template>
  <div id="casino">
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
              src="assets/images/custom/casino.jpg"
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
            <li class="breadcrumb-item" aria-current="page">คาสิโน</li>
          </ol>
          <div class="card-body">
            <div class="row justify-content-start">
              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('sexy', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/AE-Sexy-Logo.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">SEXY</small>
                </a>
              </div>




              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('amb', 'none')"
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

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('ag', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/asia gaming.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">ASIA Gaming</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('bg', 'none')"
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
                  @click="postBetflixTokengamelist('cq9', 'none')"
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
                  @click="postBetflixTokengamelist('dg', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/dg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">DG</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('eg', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/eg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Evolution Gaming</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('gd88', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/GD88.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Green Dragon</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('jl')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/jl.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">JILI</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('km')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/kingmakerlogobf.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">KINGMAKER</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('r88', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/r88.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Rich88</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('sa', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/saGame.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">SA Gaming</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('swg')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/swg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >SkyWind Group</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('we', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/we.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >WE Entertainment</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('wm', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/wm.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">WM</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('xg', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/xg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Xtream Gaming</small
                  >
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

    async postBetflixTokengamelist(provider, code) {
      this.provider = provider.toLowerCase();
      this.code = code.toLowerCase();
      try {
        let url = `https://api.bifroz.com/betflix/api/gamelist/${this.sb_username}/${this.provider}/${this.code}`;
        const res = await axios.get(url);
        console.log(res.data.url);
        window.location.href = res.data.url;
      } catch (error) {
        this.$toast.error("ปิดปรับปรุงชั่วคราว", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

    async postBetflixTokengame(game) {
      this.game = game.toLowerCase();
      let url = `/#/${this.game}`;
      const res = await axios.get(url);
      console.log(res.data.url);
      window.location.href = url;
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