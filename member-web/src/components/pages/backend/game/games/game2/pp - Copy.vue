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
          <div class="card-header text-white" style="background-color: #00a4e4">
            <i class="fab fa-bitcoin"></i>
            PragmaticPlay
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
            <li class="breadcrumb-item" aria-current="page">PragmaticPlay</li>
          </ol>
          <div class="card-body">
            <div class="row justify-content-start">
              <div
                v-for="gamelists in gamelist"
                v-bind:key="gamelists"
                class="col-4 text-center"
              >
                <a
                  @click="postBetflixTokengamelist(gamelists.provider, gamelists.code)"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    :src="gamelists.img"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">{{
                    gamelists.name
                  }}</small>
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
      gamelist: [],
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
    axios.get("https://lion-gp.com/list.php?game=pp").then((resp) => {
      this.gamelist = resp.data;
      // console.log(this.gamelist);
    });
  },

  methods: {
    async postBetflixToken() {
      let url = `https://api.bifroz.com/betflix/api/loginGame/${this.sb_username}`;
      const res = await axios.get(url);
      window.location.href = res.data.url; // betflix
    },

    async postBetflixTokengamelist(provider, code) {
      this.provider = provider.toLowerCase()
      this.code = code
      let url = `https://api.bifroz.com/betflix/api/gamelist/${this.sb_username}/${this.provider}/${this.code}`;
      const res = await axios.get(url);
      console.log(res.data.url)
       window.location.href = res.data.url;
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