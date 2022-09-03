<template>
  <div>
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
            Spade Gaming
          </div>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/slot">สล็อต</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Spade Gaming</li>
          </ol>
          <div class="card-body">
            <div id="slot" class="row justify-content-center">
              <div
                class="col-6 col-lg-3"
                v-for="data in game"
                v-bind:key="data.id"
              >
                <div>
                  <div>
                    <img
                      @click="playgame(data.gameId)"
                      class="ampPoker mt-2"
                      :src="'https://s3-ap-southeast-1.amazonaws.com/cdn.ambbet.com/' +data.imgUrl"
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
import UserData from "./../../../home/user-data";
import gameService from "./../../../../../../services/game";
var gameWindow;
export default {
  components: {
    UserData,
  },
  data() {
    return {
      ambPoker: "",
      gameCom: "",
      game: [],
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
      let listgame;
      const resp = await gameService.getGameAll();
      this.ambPoker = resp.data;
      var slotxo = this.ambPoker;
      slotxo.map(function (data) {
        if (data.productCode === "spade_gaming") {
          listgame = data.lists;
        }
      });
      this.game = listgame;
    },
    async playgame(gameId) {
      this.gameId = gameId;
      try {
        const resp = await gameService.playSpade(gameId);
        if (resp.code == 0) {
          window.open("", "popup", "fullscreen").location.href = resp.url;
        }
      } catch (error) {
        this.$toast.error('ไม่สามารถใช้งานได้', {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
  },
};
</script>
