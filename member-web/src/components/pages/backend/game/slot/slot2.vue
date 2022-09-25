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
              src="assets/images/custom/slot.jpg"
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
            <li class="breadcrumb-item" aria-current="page">สล็อต</li>
          </ol>
          <div class="card-body">
            <div class="row justify-content-start">
              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('joker')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/joker2.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">JOKER GAME</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('pg', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/pg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">PG</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('aws')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/aws.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >AE Gaming Slot</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('kg')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/kg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">KA Gaming</small>
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
                  @click="postBetflixTokengame('fc')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/fachailogobf.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Fachai</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('funky')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/funky.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Funky Games</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('gamatron')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/gamatron2.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Gamatron</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('ep')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/evoplay2.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Evo Play</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('pp')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/pplogo.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Pragmatic Play</small
                  >
                </a>
              </div>











              
              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('netent')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/netent.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">NetEnt</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('bpg')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/bpg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Blueprint Gaming</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('bng')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/bng.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Booongo</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('hab')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/hab.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Habanero</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('kgl')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/kgl.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Kalamba Games</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('rlx')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/rlx.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Relax Gaming</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('ygg')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/ygg.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Yggdrasil</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('red')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/red.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Red Tiger</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('qs')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/qs.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Quickspin</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('ids')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/ids.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Iron Dog</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('tk')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/tk.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Thunderkick</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('mav')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/mav.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Maverick</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('ds')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/ds.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Dragoon Soft</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('nlc')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/nlc.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Nolimit City</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('ga')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/ga.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Game Art</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('png')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/png.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Play n Go</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('pug')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/pug.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">Push Gaming</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('fng')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/fng.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Fastasma Gaming</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('nge')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/nge.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Fastasma Gaming</small
                  >
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('onextwo')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/1x2.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">1X2 Gaming</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengame('hak')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/hak.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block"
                    >Hacksaw Gaming</small
                  >
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
                  @click="postBetflixTokengamelist('r88', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/r88.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">RICH88</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('ps', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/ps3.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">PlayStar</small>
                </a>
              </div>

              <div class="col-4 text-center">
                <a
                  @click="postBetflixTokengamelist('sp', 'none')"
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
                  @click="postBetflixTokengamelist('ttg', 'none')"
                  class="text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="assets/images/custom/toptrend gaming.png"
                    class="img-fluid logoGame w-100"
                    alt="Responsive image"
                  />
                  <small class="wrapper-gametxtName d-block">TTG</small>
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