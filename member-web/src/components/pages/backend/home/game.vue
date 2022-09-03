<template>
  <div>
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card mt-4 shadow">
          <div class="card-header text-white" style="background-color: #00a4e4">
            <i class="fab fa-bitcoin"></i>
            เกมส์
          </div>
          <div class="card-body">
            <div class="row justify-content-start pl-3">
              <div class="col-6 col-md-2">
                <div @click="SBO()" target="_blank">
                  <img
                    class="game mt-2"
                    src="./../../../../assets/img/gamemenu/sport.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-2">
                <div @click="routerCasino()">
                  <img
                    class="game mt-2"
                    src="./../../../../assets/img/gamemenu/casino.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-2">
                <div @click="AMBLOTTO()">
                  <img
                    class="game mt-2"
                    src="./../../../../assets/img/gamemenu/lotto.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-2">
                <div @click="routerSlot()">
                  <img
                    class="game mt-2"
                    src="./../../../../assets/img/gamemenu/slot.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-2">
                <div @click="routerPoker()">
                  <img
                    class="game mt-2"
                    src="./../../../../assets/img/gamemenu/Card.gif"
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
</template>
<script>
import axios from "axios";
var gameWindow;
export default {
  data() {
    return {};
  },
  methods: {
    routerCasino() {
      this.$router.push("/casino");
    },
    routerSlot() {
      this.$router.push("/slot");
    },
    routerPoker() {
      this.$router.push("/ambPoker");
    },
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
    async SBO() {
      let uri =
        "https://ukingbet.com/?url=https%3A%2F%2Fukingbet.com&hash=5971acd0f7531e570a3f06a4&username=" +
        sessionStorage.getItem("sb_username") +
        "&password=" +
        sessionStorage.getItem("sb_password") +
        "#!/redirect";
      if (this.isLine()) {
        window.open("", "popup", "fullscreen").location.href.url;
        sessionStorage.removeItem("token");
      } else {
        this.checkWindow();
        window.open("", "popup", "fullscreen").location.href = uri;
        sessionStorage.removeItem("token");
      }
    },
    async AMBLOTTO() {
      if (!this.checkLogin()) {
        this.$toast.error("กรุณากดปุ่มรีเฟรชเครดิตก่อน", {
          position: "top-right",
          timeout: 1500,
        });
        return;
      }
      let uri = "https://ukingbet-client-d.askmebet.cloud/lotto/login?client=";

      if (this.isMobile()) {
        uri = uri + "MB";
      } else {
        uri = uri + "WEB";
      }

      if (this.isLine()) {
        let resp = await axios.get(uri);

        if (resp.data.code == 0) {
          window.open("", "popup", "fullscreen").location.href = resp.url;
        } else {
          if (resp.data.code == 1005) {
            this.$toast.error(resp.data.message, {
              position: "top-right",
              timeout: 1500,
            });
            sessionStorage.clear();
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

<style scoped>
.pl-3, .px-3 {
    padding-left: 2rem !important;
}
.game {
    border-radius: 30%;
    width: 110px;
    cursor: pointer;
    border: 3px solid #dee2e6;
    border-color: #00a4e4;
}

</style>

