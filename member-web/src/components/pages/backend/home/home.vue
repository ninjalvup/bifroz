<template>
  <div id="whithdrawlist" class="mt-100 mb-100">
    <AFF />
    <div class="row mt-2 justify-content-center">
      <div class="col-12 col-lg-6 p-0">
        <div class="row mx-0 category-container">
            <lefttapp />
            <div
              class="col text-left game-container"
              id="game-container"
              onscroll="checkscrollGameContainer(this)"
            >
              <!---->

              <div class="game_card_container slide" style="width: 50%">
                <a
                    @click="postBetflixTokengamelist('pg', 'none')"
                    class="text-white"
                    style="text-decoration: none"
                  >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/game/1.png"
                  />
                </div>
              </a>
              </div>


              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenSexy()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/AE-Sexy-Logo.png"
                  />
                </div>
                </a>
              </div>


              <div class="game_card_container slide" style="width: 50%">
              <a
                @click="postBetflixTokengame('joker')"
                class="text-white"
                style="text-decoration: none"
              >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/joker2.png"
                  />
                </div>
              </a>
            </div>


            <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenSa()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/saGame.png"
                  />
                </div>
              </a>
              </div>

              <div class="game_card_container slide" style="width: 50%">
              <a
                @click="postBetflixTokengame('km')"
                class="text-white"
                style="text-decoration: none"
              >
                <div class="game_card">
                  <img
                    class="game_image"
                    src="assets/images/custom/kingmakerlogobf.png"
                  />
                </div>
              </a>
            </div>

            <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenDg()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/dg.png"
                  />
                </div>
                </a>
              </div>

              <div class="game_card_container slide" style="width: 50%">
              <a
                @click="postBetflixTokengame('jl')"
                class="text-white"
                style="text-decoration: none"
              >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/jl.png"
                  />
                </div>
              </a>
            </div>

            <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenCq9()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/cq9.png"
                  />
                </div>
                </a>
              </div>

              <div class="game_card_container slide" style="width: 50%">
              <a
                @click="postBetflixTokengame('fc')"
                class="text-white"
                style="text-decoration: none"
              >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/fachailogobf.png"
                  />
                </div>
              </a>
            </div>

            <div class="game_card_container slide" style="width: 50%">
              <a
                  @click="postBetflixTokengame('netent')"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/netent.png"
                  />
                </div>
              </a>
            </div>

              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenR88()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/r88.png"
                  />
                </div>
              </a>
              </div>





              <div class="game_card_container slide" style="width: 50%">

                <a
                  @click="postBetflixTokenAmb()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/ambpokerlogobf.png"
                  />
                </div>
                </a>
              </div>



              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenAg()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/asia gaming.png"
                  />
                </div>
                </a>
              </div>


              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenBg()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/bg.png"
                  />
                </div>
                </a>
              </div>






              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenEg()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/eg.png"
                  />
                </div>
                </a>
              </div>



              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenGd88()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/GD88.png"
                  />
                </div>
                </a>
              </div>







              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenWe()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/we.png"
                  />
                </div>
                </a>
              </div>


              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenWm()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/wm.png"
                  />
                </div>
                </a>
              </div>

              <div class="game_card_container slide" style="width: 50%">
                <a
                  @click="postBetflixTokenXg()"
                  class="text-white"
                  style="text-decoration: none"
                >
                <div class="game_card">
                  <!----><img
                    class="game_image"
                    src="assets/images/custom/xg.png"
                  />
                </div>
                </a>
              </div>

              <!---->
            </div>
          
          </div>
        
      </div>
    </div>

    <div
      class="modal fade"
      id="installapp"
      tabindex="-1"
      aria-labelledby="installapp"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="installapp">
              <i class="fa-solid fa-mobile-screen-button"></i> ติดตั้งแอพ
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body px-0">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active text-tabs"
                  id="IOS-tab"
                  data-toggle="tab"
                  href="#IOS"
                  role="tab"
                  aria-controls="IOS"
                  aria-selected="true"
                  ><i class="fa-brands fa-apple"></i> IOS</a
                >
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link text-tabs"
                  id="ANDROID-tab"
                  data-toggle="tab"
                  href="#ANDROID"
                  role="tab"
                  aria-controls="ANDROID"
                  aria-selected="false"
                  ><i class="fa-solid fa-mobile-screen"></i> ANDROID</a
                >
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="IOS"
                role="tabpanel"
                aria-labelledby="IOS-tab"
              >
                <img
                  class="img-fluid"
                  src="assets/images/custom/ios.png"
                  alt=""
                />
              </div>

              <div
                class="tab-pane fade"
                id="ANDROID"
                role="tabpanel"
                aria-labelledby="ANDROID-tab"
              >
                <img
                  class="img-fluid"
                  src="assets/images/custom/android.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              ตกลง
            </button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="minigame"
      tabindex="-1"
      aria-labelledby="minigame"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="minigame">MINIGAME</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">ปิดปรับปรุงชั่วคราว</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              ตกลง
            </button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL, gameURL } from "./../../../../services/api";
import axios from "axios";
import lefttapp from "../../../shared/lefttapp.vue";
import AFF from "./aff";
import postLogin from "@/services/postLogin";
//import Lefttap from '../../../shared/lefttap.vue';
// import Swal from "sweetalert2";

// import GAME from "./game";
export default {
  components: {
   
    lefttapp,
    AFF,
    // GAME,
  },
  data() {
    return {
      sb_username: "",
      sb_password: "",
      url: "",
      bg: "",
      line: "",
      bandner: "",
      urlsport: "",
    };
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

    logout() {
      const removeToken = sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      location.reload();
      if (removeToken == null) {
        this.$router.push("/login");
      }
    },
    async saGame() {
      let uri = `https://cauthapi.linkv2.com/api/credit-auth/login`;
      // let uri = 'https://omgbet888-client-d.askmebet.cloud/sagame/login?gameId=601&client=';
      const form = {
        UserName: "Zt8b1247845",
        Password: "Aa112233",
      };
      console.log(form);
      await axios({
        method: "post",
        url: uri,
        form,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      }).then((res) => {
        console.log(res);
      });
    },
  },

  mounted() {
    this.urlsport = `https://${gameURL}.com/login/auto/?username=${sessionStorage.getItem(
      "sb_username"
    )}&password=${sessionStorage.getItem(
      "sb_password"
    )}&hash=6291e00fd1303d427e28d655&url=https://member-1fast99.superfast-auto.com&state=sport&lang=th`;

    axios({
      method: "get",
      url: baseURL + "/photo/prefix",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.bg = response.data.data.prefix[0].bg;
        this.bandner = response.data.data.prefix[0].bandner;
        this.line = response.data.data.prefix[0].line;
        // this.line = "https://lin.ee/bFwggcX";
      })
      .catch((error) => {
        if (error.response.data == "Unauthorized") {
          sessionStorage.removeItem("access_token");
        }
      });
    // redirect play game by path_URL
    axios({
      method: "get",
      url: baseURL + "/member/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        console.log(gameURL);
        this.sb_username = response.data.data.sb_username;
        this.sb_password = response.data.data.sb_password;
        this.sb_password2 = encodeURIComponent(this.sb_password);
        //redirect game uking omg fastbet
        //         const a ="'\/\/mem.imi9bet.com\/m\/login?token=be7f6b8d-88ef-4ae4-9bb3-a878394bf753&lang=en-us'";
        //         //  this.url = `https://${gameURL}.com/#!/redirect?username=${this.sb_username}&password=${this.sb_password2}&url=https%3A%2F%2F${gameURL}.com&hash=5971acd0f7531e570a3f06a4`;
        // this.url='\/\/mem.imi9bet.com\/m\/login?token=be7f6b8d-88ef-4ae4-9bb3-a878394bf753&lang=en-us'
        //redirect game ambbet

        // this.url = `https://ambbet.com/login/auto/?username=${this.sb_username}&password=${this.sb_password2}&url=https://member.ambet1668.com?&hash=5971acd0f7531e570a3f06a4`
      })
      .catch((error) => {
        if (error.response.data == "Unauthorized") {
          sessionStorage.removeItem("access_token");
        }
      });
  },
};
</script>

<style scoped>
.content-header-banner{
  max-width: 100%;
  width: 100%;
  min-height:106px;
  overflow: hidden;
  border-radius: 10px;
}
.bottom-nav {
  background: black;
  padding-top: 0.5em;
  flex: 0;
  justify-content: space-around;
  padding: 0.75em 0.5em;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  box-shadow: 3px -4px 10px rgba(0,0,0,0.3);
}
.nav-logo{
  margin:0.5em;
  width: 140px;
}
.nav-header{

}
.nav-right{
  color:white;
  padding:10px 15px;
  font-family: "Helvetica"
}

/* Mobile Menu */
.menu-left-btn-container{
  padding:5px 5px 9px 15px;
}
.menu-left-btn {
  background: linear-gradient(to bottom, #393939, #292929);
  box-shadow: 0 5px 7px 0 #000000;
  border-radius: 15px;
  width: 66px;
  height: 55px;
  text-align: center;
  flex-wrap: wrap;
  padding: 7px 0;
  font-weight: bold;
  font-family: var(--systemfont);
  cursor: pointer;
}
.active.menu-left-btn{
  background: linear-gradient(to bottom, #e7d39d, #b19560);
}
.menu-left-btn img {
  width: 27px;
  height: 27px;
}
.top-section{
  position: fixed;
  background: var(--body-background);
  width: 100%;
  z-index: 11;
}
.active .menu-icon-active {
  width: 42px;
  height: 42px;
  margin-top: -8px;
}
.active .menu-text{
  margin-top:-3px;
  }
.menu-text{
  margin-top:4px;
  font-size: 9px;
  color: #ebc76e;;
}
.menu-icon-active + .menu-text{
  color:white;
}
.game_card_container{
  display: inline-block;
  position: relative;
}
.game_card_container:empty{
  display: none;
}
.game_card{
  width: 100%;
  height:100%;
  position: relative;
  border-radius: 10px;
  padding: 5px;
}
.game_image{
  height: 100%;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
}
.game_label{
  display:none;
  position: absolute;
  bottom:0;
  left:0;
  right: 0;
  background:rgba(0,0,0,0.75);
  font-weight: bold;
  text-align: center;
  padding:5px;
  border-radius: 0 0 10px 10px;
  color:white;
  animation: fadeIn 0.25s forwards;
}
.game_image:hover + .game_label{
  display: initial;
}
.nav-container{
  padding:0;
  overflow: auto;
  scroll-behavior:auto;
  overflow: auto;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  position: relative;
  width: 90px;
  -webkit-overflow-scrolling: auto;
}
.nav-container:hover::after ,.game-container:hover::after{
  pointer-events: none; 
}

.nav-container::-webkit-scrollbar { 
    width: 0;
    height: 0;
    display: none;
    pointer-events: none;
    z-index:-999;
    opacity: 0;
}
.content-header-container {
  box-shadow: 2px 7px 6px #2b2b2b;
  z-index: 0;
  position: relative;
  top:0;
  margin-bottom: 4px;
  padding: 5px 5px 5px 15px;
  overflow: hidden;

}
.game-container{
  padding:0 10px 0 0;
  overflow: auto;
}
.bottom-nav img{
  width: 25px;
  height: 25px;
}

.padding{
  height:120px;
}
.transfer-wrap {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top:0;
  text-align: center;
  padding: 1em;
  z-index: 13;
}
.transfer-backdrop2 {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 20px 20px 0 0;
    background: linear-gradient(147deg, #1d1b18, #494335);
    min-height: 490px;
}
.transfer-backdrop2.error{
  min-height: 385px;
}
.transfer-backdrop{
  content : " ";
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top:0;
  background: linear-gradient(147deg, #1b1a1720, #4a4535ff);
  z-index: 5;
}
.transfer-content{
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  z-index: 13;
}
.transfer-load{
  bottom:50%;
}
.transfer-modal{
  background: black;
  color:white;
  border-radius: 20px;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.36);
  padding:1.5em;
  margin:1em 2.5em;
}
.transfer-start{
  padding:0.75em;
  background: linear-gradient(to bottom, #e7d39d, #b19560);
  color:black;
  border-radius: 5em;
  width: 100%;
  min-width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
}
.transfer-plate{
  background: black;
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  height:70%;
}
.transfer-input{
  padding: 0.5em;
  margin: 1em 0 0;
  border-radius: 15px;
  text-align: center;
  display: inline-block;
  display:inline-block;
  width: 100%;
  border-color: black;
}
.transfer-input.red{
  border-color:var(--red);
}
.transfer-image img{
  width: 150px;
}
.transfer-logo img{
  width: 80px;
  margin-top:10px;
}
.transfer-close{
  font-size:40px;
}
.transfer-balance-header{
  opacity: 0.5;
}.transfer-credit{
  color:#8b8b8b;
}
.more-menu-wrapper{
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.more-menu{
  position: fixed;
  z-index: 20;
  right:0;
  top:0;
  bottom:0;
  max-width: 75%;
  width: 300px;
  background: black;
  padding:1em;
}
.more-menu-item{
  margin:1em 1em 2.5em 1em;
  cursor:pointer;
  color:#e1cc96;
}
.more-menu-close{
  position: fixed;
  left:0;
  bottom:0;
  top:0;
  right:0;
}
.transfer-all-table{
  width: 100%;
}
.transfer-all-table td{
  padding:1em 0.5em;
}
.transfer-all-table thead{
  border-top:1px solid #876c35;
  border-bottom:1px solid #876c35;
}
.transfer-all-table tbody tr{
  color:white;
  border-bottom:1px solid #876c35cc;
}
.balance-section{
  height:600px;
  overflow: auto;
}
.new-label {
  position: absolute;
  width: 35px;
}
.content-section {
    margin-top: 55px;
}
.content-section2 {
    margin-top: 128px;
}
.dark-backdrop{
  background: rgba(0,0,0,0.5);
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.dark-backdrop2{
  background: rgba(0,0,0,0.5);
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index: 200;
}
.transfer-input:focus{
  outline:0;
}

.transfer-modal2 {
    padding-bottom: 1.0em;
}
.transfer-cashout {
    padding: 0.3em 1.5em;
    background: transparent;
    border: 1px solid #ebc76e;
    border-radius: 5em;
    display: inline-block;
    font-size: 13px;
    line-height: 22px;
}
.lh{
    line-height: 80%;
}
.credit-left{
    padding-left: 15px;
}
.credit-balance {
    font-size: 24px;
    color: white;
    display: inline-block;
    vertical-align: middle;
    padding-left: 8px;
    font-weight: bold;
}
.credit-right{
    padding-right: 10px;
}
.credit-item{
    padding: 0.75em 0.5em;
    display: block;
    color: white;
}
.menu_mt {
    margin-top: 50px;
}

.btm_banner {
    bottom: 70px;
    position: fixed;
}

    .btm_banner_img {
        width: 90%;
        display: block;
        margin: auto;
    }

.nav-login{
    position: fixed;
    right:0;
}
.nav-center {
    display:flex;
    justify-content:center;
    align-items:center;
}
.navbar {
    margin: 0 auto;
    border-radius: 0;
    background-color: #000;
    padding: 0px;
    font-size: 1.2em;
    border: 0;
    position: absolute;
    display: block;
    width: 100%;
}

.navbar-header {
    background-color: #000;
}


.navbar .navbar-nav {
    display: inline-block;
    float: none;
    vertical-align: top;
}

.navbar .navbar-collapse {
    text-align: center;
}

.navbar-brand {
    float: left;
    min-height: 55px;
    padding: 15px;
    margin-bottom: 0px;
}

/*
.navbar-inverse .navbar-nav .active a, .navbar-inverse .navbar-nav .active a:focus, .navbar-inverse .navbar-nav .active a:hover {
	color: blue;
	background-color: #FFC;
}
*/

.navbar-inverse .navbar-nav li a {
    color: #e1cc96;
    column-width: 150px;
}

    .navbar-inverse .navbar-nav li a:hover {
        color: #9f7d3e;
    }


.navbar-toggle, .icon-bar {
    color: #deaf33;
    border: 2px solid #eadebf;
    background-color: black;
}

.nav > li > a {
    padding: 10px 15px;
    display: block;
    color: #e1cc96;
    font-size: 12pt;
}

.content-freecoin-banner{
  max-width: 100%;
  width: 100%;
  min-height:70px;
  overflow: hidden;
  border-radius: 10px;
}

.mt-100{
  margin-top: 100px;
}

.mb-100{
  margin-bottom: 100px;
}


</style>
