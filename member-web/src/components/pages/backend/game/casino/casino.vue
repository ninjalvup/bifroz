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
            คาสิโนออนไลน์
          </div>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              คาสิโนออนไลน์
            </li>
          </ol>
          <div class="card-body">
            <div class="row justify-content-start">
              <div class="col-6 col-md-3">
                <div>
                  <div @click="Pretty()">
                    <img
                      class="casinolist mt-2"
                      src="https://wow668.com/image/pt.gif"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div @click="saGame()">
                  <img
                    class="casinolist mt-2"
                    src="https://wow668.com/image/sa.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div @click="dreamGame()">
                  <img
                    class="casinolist mt-2"
                    src="https://wow668.com/image/dg.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div @click="agGame()">
                  <img
                    class="casinolist mt-2"
                    src="https://wow668.com/image/ag.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div @click="sexy()">
                  <img
                    class="casinolist mt-2"
                    src="https://wow668.com/image/sexy.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div @click="eBet()">
                  <img
                    class="casinolist mt-2"
                    src="https://wow668.com/image/ebet.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div @click="allbet()">
                  <img
                    class="casinolist mt-2"
                    src="https://wow668.com/image/allbet.gif"
                    alt=""
                  />
                </div>
              </div>
               <div class="col-6 col-md-3">
                <div @click="bigGame()">
                  <img
                    class="casinolist mt-2"
                    src="./../../../../../assets/img/gamemenu/BG.gif"
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
import UserData from "./../../home/user-data";
var gameWindow;
export default {
  components: {
    UserData,
  },
  methods: {
    routerCasino() {
      this.$router.push("/casino");
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
    async Pretty() {
      if (!this.checkLogin()) {
        this.$toast.error("กรุณากดปุ่มรีเฟรชเครดิตก่อน", {
          position: "top-right",
          timeout: 1500,
        });
        return;
      }
      let uri = "https://ukingbet.secure-restapi.com/pretty/login?client=";

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

    //sagame
    async saGame() {
      if (!this.checkLogin()) {
        this.$toast.error("กรุณากดปุ่มรีเฟรชเครดิตก่อน", {
          position: "top-right",
          timeout: 1500,
        });
        return;
      }
      let uri = "https://ukingbet.secure-restapi.com/sagame/login?client=";

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
    //dreamGame
    async dreamGame() {
      if (!this.checkLogin()) {
        this.$toast.error("กรุณากดปุ่มรีเฟรชเครดิตก่อน", {
          position: "top-right",
          timeout: 1500,
        });
        return;
      }
      let uri = "https://ukingbet.secure-restapi.com/dreamgame/login?client=";

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
    //agGame
    async agGame() {
      if (!this.checkLogin()) {
        this.$toast.error("กรุณากดปุ่มรีเฟรชเครดิตก่อน", {
          position: "top-right",
          timeout: 1500,
        });
        return;
      }
      let uri =
        "https://ukingbet.secure-restapi.com/agg/login?gameId=1&prefix=VIEWBET&website=https://viewbet.com&client=";

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
    //ebet
    async eBet() {
      if (!this.checkLogin()) {
        alert("กรุณาเข้าสู่ระบบก่อน.");
        return;
      }

      let uri = "https://ukingbet.secure-restapi.com/ebet/login?client=";

      if (this.isMobile()) {
        uri = uri + "MB";
      } else {
        uri = uri + "PC";
      }

      if (this.isLine()) {
        let resp = await axios.get(uri);

        if (resp.data.code == 0) {
          location.href = resp.data.url;
        } else {
          if (resp.data.code == 1005) {
            alert(resp.data.message);
            sessionStorage.removeItem("token");
          } else {
            sessionStorage.removeItem("token");
          }
        }
      } else {
        this.checkWindow();
        let resp = await axios.get(uri);

        if (resp.data.code == 0) {
          gameWindow.location.href = resp.data.url;
        } else {
          if (resp.data.code == 1005) {
            alert(resp.data.message);
            sessionStorage.removeItem("token");
          } else {
            alert(resp.data.message);
            gameWindow.close();
          }
        }
      }
    },
    //allbet
    async allbet() {
      if (!this.checkLogin()) {
        alert("กรุณาเข้าสู่ระบบก่อน.");
        return;
      }

      let uri = "https://ukingbet.secure-restapi.com/allbet/login?client=";

      if (this.isMobile()) {
        uri = uri + "MB";
      } else {
        uri = uri + "PC";
      }

      if (this.isLine()) {
        let resp = await axios.get(uri);

        if (resp.data.code == 0) {
          location.href = resp.data.url;
        } else {
          if (resp.data.code == 1005) {
            alert(resp.data.message);
            sessionStorage.removeItem("token");
          } else {
            alert(resp.data.message);
          }
        }
      } else {
        this.checkWindow();
        let resp = await axios.get(uri);

        if (resp.data.code == 0) {
          gameWindow.location.href = resp.data.url;
        } else {
          if (resp.data.code == 1005) {
            alert(resp.data.message);
            sessionStorage.removeItem("token");
          } else {
            alert(resp.data.message);
            gameWindow.close();
          }
        }
      }
    },
    //sexy
    async sexy() {
      if (!this.checkLogin()) {
        alert("กรุณาเข้าสู่ระบบก่อน.");
        return;
      }

      let uri =
        "https://ukingbet-client-d.askmebet.cloud/sexy-baccarat/login?client=";

      if (this.isMobile()) {
        uri = uri + "MB";
      } else {
        uri = uri + "PC";
      }

      if (this.isLine()) {
        let resp = await axios.get(uri);

        if (resp.data.code == 1) {
          location.href = resp.data.url;
        } else {
          if (resp.data.code == 1005) {
            alert(resp.data.message);
            sessionStorage.removeItem("token");
            location.href = "index.html";
          } else {
            alert(resp.data.message);
          }
        }
      } else {
        this.checkWindow();
        let resp = await axios.get(uri);

        if (resp.data.code == 1) {
          gameWindow.location.href = resp.data.url;
        } else {
          if (resp.data.code == 1005) {
            alert(resp.data.message);
            sessionStorage.removeItem("token");
            location.href = "index.html";
          } else {
            alert(resp.data.message);
            gameWindow.close();
          }
        }
      }
    },
    //big
    async bigGame() {
      if (!this.checkLogin()) {
        this.$toast.error("กรุณากดปุ่มรีเฟรชเครดิตก่อน", {
          position: "top-right",
          timeout: 1500,
        });
        return;
      }
      let uri = "https://ukingbet-client-d.askmebet.cloud/bg/login?client=";

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

<style>
</style>