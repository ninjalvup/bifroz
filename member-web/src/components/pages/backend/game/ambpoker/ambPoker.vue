<template>
  <div id="casino">
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <UserData />
      </div>
    </div>

    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card mt-4 shadow">
          <div class="card-header text-white" style="background-color: #00a4e4">
            <i class="fab fa-bitcoin"></i>
            เกมไพ่
          </div>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">เกมไพ่</li>
          </ol>
          <div class="card-body ">
            <div class="row justify-content-center ">
              <div
                class="col-6 col-lg-3"
                v-for="data in ambPoker"
                v-bind:key="data.id"
              >
                <div>
                  <div>
                    <img
                      @click="playgame(data.gameId)"
                      class="ampPoker mt-2"
                      :src="data.imageUrl"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UserData from "./../../home/user-data";
import gameService from "./../../../../../services/game";

var gameWindow;
export default {
  components: {
    UserData,
  },
  data() {
    return {
      ambPoker: "",
    };
  },
  mounted() {
    this.getGame();
  },
  methods: {
    checkLogin() {
      if (!sessionStorage.getItem("token")) {
        return false;
      } else {
        axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
          "token"
        );
        return true;
      }
    },

    isMobile() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    isLine() {
      return /Line/i.test(navigator.userAgent);
    },
    checkWindow() {
      if (gameWindow && !gameWindow.closed) {
        gameWindow.close();
      }

      gameWindow = window.open("", "popup", "fullscreen");
      gameWindow.moveTo(0, 0);
      gameWindow.resizeTo(screen.width, screen.height);
      gameWindow.document.write("Loading...");
      return;
    },
    async getGame() {
      const resp = await gameService.getGame();
      this.ambPoker = resp.data;
      console.log(this.ambPoker);
    },
    async playgame(gameId) {
      if (!this.checkLogin()) {
        this.$toast.error("กรุณากดปุ่มรีเฟรชเครดิตก่อน", {
          position: "top-right",
          timeout: 1500,
        });
        return;
      }
      let uri = `https://ukingbet-client-d.askmebet.cloud/ambgame2/login?gameId=${gameId}&gameKey=`;
      if (this.isMobile()) {
        uri = uri + "MB";
      } else {
        uri = uri + "WEB";
      }

      if (this.isLine()) {
        let resp = await axios.get(uri);

        if (resp.data.code == 0) {
          window.open("", "popup", "fullscreen").location.href = resp.data.url;
        } else {
          if (resp.data.code == 1005) {
            this.$toast.error(resp.data.message, {
              position: "top-right",
              timeout: 1500,
            });
            sessionStorage.removeItem("token");
          } else {
            this.$toast.error(resp.data.message, {
              position: "top-right",
              timeout: 1500,
            });
            sessionStorage.removeItem("token");
          }
        }
      } else {
        this.checkWindow();
        let resp = await axios.get(uri);
        if (resp.data.code == 0) {
          window.open("", "popup", "fullscreen").location.href = resp.data.url;
        } else {
          if (resp.data.code == 1005) {
            this.$toast.error(resp.data.message, {
              position: "top-right",
              timeout: 1500,
            });
            sessionStorage.removeItem("token");
          } else {
            this.$toast.error(resp.data.message, {
              position: "top-right",
              timeout: 1500,
            });
            sessionStorage.removeItem("token");
            gameWindow.close();
          }
        }
      }
    },
  },
};
</script>
