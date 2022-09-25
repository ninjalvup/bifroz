<template>
  <div id="whithdrawlist">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <UserData />
        <AFF />
        <div class="col">
          <div class="row">
            <div class="col-12 p-0 bg2">
              <div
                class="container-game"
                style="
                  background-image: url(assets/images/custom/bg-game.gif);
                  background-size: cover;
                  background-repeat: no-repeat;
                  position: relative;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  height: 90vw;
                  height: 90vw;
                  width: 100vw;
                "
              >
                <div class="positioned-1">
                  <div class="text-center">
                    <img
                      class="img-fluid bg-game"
                      src="assets/images/custom/game1.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="positioned-2">
                  <div class="text-center">
                    <img
                      class="img-fluid bg-game"
                      src="assets/images/custom/game2.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="positioned-3">
                  <div class="text-center">
                    <img
                      class="img-fluid bg-game"
                      src="assets/images/custom/game3.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="positioned-4">
                  <div class="text-center">
                    <img
                      class="img-fluid bg-game"
                      src="assets/images/custom/game4.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="positioned-5">
                  <div class="text-center">
                    <img
                      class="img-fluid bg-game"
                      src="assets/images/custom/game5.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="positioned-6">
                  <div class="text-center">
                    <img
                      class="img-fluid bg-game"
                      src="assets/images/custom/game6.png"
                      alt=""
                    />
                  </div>
                </div>
                <router-link to="/profile" class="btn">
                  <div class="positioned-7">
                    <div class="text-center">
                      <img
                        class="img-fluid bg-game"
                        src="assets/images/custom/game7.png"
                        alt=""
                      />
                    </div>
                  </div>
                </router-link>

                <a @click="logout">
                  <div class="positioned-8">
                    <div class="text-center">
                      <img
                        class="img-fluid bg-game"
                        src="assets/images/custom/game8.png"
                        alt=""
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <!-- <i class="fab fa-bitcoin text-danger"></i>
            เมนู ฝาก - ถอน

            <hr class="border-top-0" />

            <div class="row mlstyle">
              <router-link to="/depositlist" class="btn">
                <div class="col">
                  <div class="row">
                    <div class="col mts">
                      <img
                        class="zoom"
                        src="assets/images/icons/wallet.png"
                        alt
                      />
                    </div>
                  </div>
                </div>
              </router-link>

              <router-link to="/withdraw" class="btn">
                <div class="col">
                  <div class="row">
                    <div class="col mts">
                      <img
                        class="zoom"
                        src="assets/images/icons/withdraw.png"
                        alt
                      />
                    </div>
                  </div>
                </div>
              </router-link>

              <router-link to="/report" class="btn">
                <div class="col">
                  <div class="row">
                    <div class="col mts">
                      <img
                        class="zoom"
                        src="assets/images/icons/list.png"
                        alt
                      />
                    </div>
                  </div>
                </div>
              </router-link>

              <router-link to="/sharedLink" class="btn">
                <div class="col">
                  <div class="row">
                    <div class="col mts">
                      <img
                        class="zoom"
                        src="assets/images/icons/share.png"
                        alt
                      />
                    </div>
                  </div>
                </div>
              </router-link>

              <router-link to="/withdrawIncome" class="btn">
                <div class="col">
                  <div class="row">
                    <div class="col mts">
                      <img class="zoom" src="assets/images/icons/income.png" />
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="mt-3">
              <i class="fas fa-clinic-medical text-danger"></i>
              เมนู ทั่วไป

              <div class="row mlstyle">
                <a :href="line" class="btn" target="blank">
                  <div class="col">
                    <div class="row">
                      <div class="col mts">
                        <img
                          class="zoom"
                          src="assets/images/icons/contact.png"
                          alt
                        />
                      </div>
                    </div>
                  </div>
                </a>

                <router-link to="/profile" class="btn">
                  <div class="col">
                    <div class="row">
                      <div class="col mts">
                        <img
                          class="zoom"
                          src="assets/images/icons/user.png"
                          alt
                        />
                      </div>
                    </div>
                  </div>
                </router-link>

               

                <router-link to="/userTree" class="btn">
                  <div class="col">
                    <div class="row">
                      <div class="col mts">
                        <img
                          class="zoom"
                          src="assets/images/icons/pung.png"
                          alt
                        />
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <GAME /> -->
  </div>
</template>

<script>
import { baseURL, gameURL } from "./../../../../services/api";
import axios from "axios";
import UserData from "./user-data";
import AFF from "./aff";
// import Swal from "sweetalert2";

// import GAME from "./game";
export default {
  components: {
    UserData,
    // GAME,
    AFF,
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

  beforeCreate() {},

  methods: {
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
.bgbo {
  background-color: #c1797940;
}

.mts {
  margin-top: 10px;
  height: 50%;
}

.mtst {
  margin-top: 10px;
}

@media only screen and (max-width: 600px) {
  .col {
    position: relative;
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
  }

  .mts {
    margin-top: 0px;
  }

  .mtst {
    margin-top: 5px;
  }

  .pama {
    padding: 0px;
    margin: 0px;
  }
}

a {
  text-decoration: none;
  color: #fff;
}

.rainbow-button {
  width: calc(110px + 6px);
  height: calc(40px + 6px);
  background-image: linear-gradient(
    90deg,
    #f8f9fa 0%,
    #3554dc 49%,
    #ffffff 80%,
    #f8f9fa 100%
  );
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 16px;
}

.rainbow-button:after {
  content: attr(alt);
  width: 110px;
  height: 40px;
  background-color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

.rainbow-button {
  animation: slidebg 2s linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 200px;
  }
}

.zoom:hover {
  -ms-transform: scale(1.5);
  /* IE 9 */
  -webkit-transform: scale(1.5);
  /* Safari 3-8 */
  transform: scale(1.5);
}

/* img {
  -webkit-filter: drop-shadow(5px 5px 5px rgb(125, 138, 250));
  filter: drop-shadow(5px 5px 5px rgb(151, 122, 255));
} */

.zoom {
  margin: 0px;
  width: 100px;
}

.mlstyle {
  margin-left: 50px !important;
  padding-left: 32px !important;
}

@media only screen and (max-width: 768px) {
  .zoom {
    height: 60px;
    margin: 9px;
    width: 70px;
  }

  .mlstyle {
    margin-left: 0px !important;
    padding-left: 2px !important;
  }

  .rainbow-button {
    display: none;
  }

  br {
    display: none;
  }

  .hexagon-wrapper[data-v-4ee29e69] {
    display: flex;
    text-align: initial;
    width: 70px;
    height: 73px;
    cursor: pointer;
    margin-top: 18px;
    /* margin-right: 50px; */
    margin-left: 24px;
  }

  .hexagon i {
    margin-top: 15px !important;
    font-size: 30px !important;
  }
}

.hexagon-wrapper {
  display: flex;
  text-align: initial;
  width: 100px;
  height: 100px;
  cursor: pointer;

  margin-top: 20px;
  /* margin-right: 50px; */
  margin-left: 50px;
}

.hexagon {
  position: relative;
  width: 46%;
  height: 80%;

  color: white;
  background: linear-gradient(-180deg, #e8e8e8, #435ce7);
  display: flex;
  align-content: center;
  justify-content: center;
  transition: 0.5s;
}

.hexagon i {
  z-index: 1;
  margin-top: 15px;
  font-size: 50px;
  color: transparent;
  background: linear-gradient(45deg, #ffffff, #e37682);
  background-clip: text;
  -webkit-background-clip: text;
}

.hexagon:before,
.hexagon:after {
  position: absolute;
  content: "";
  background: inherit;
  height: 100%;
  width: 100%;
  border-radius: 0;
  transition: 0.5s;
  transform-origin: center;
}

.hexagon:before {
  transform: rotateZ(60deg);
}

.hexagon:after {
  transform: rotateZ(-60deg);
}

.hexagon:hover {
  border-radius: 50px;
  transition: 0.5s;
}

.hexagon:hover:before {
  border-radius: 50px;
  transition: 0.5s;
}

.hexagon:hover:after {
  border-radius: 50px;
  transition: 0.5s;
}
.positioned-1 {
  background-size: cover;
  height: 12vh;
  width: 12vh;
  position: absolute;
  top: 15%;
  /* Positioned on bottom left corner of factory*/
  left: 5%;
  /* Positioned on bottom left corner of factory*/
  opacity: 0.8;
  /* optional, to see position */
}

.positioned-2 {
  background-size: cover;
  height: 12vh;
  width: 12vh;
  position: absolute;
  top: 14%;
  /* Positioned on bottom left corner of factory*/
  left: 26%;
  /* Positioned on bottom left corner of factory*/
  opacity: 0.8;
  /* optional, to see position */
}

.positioned-3 {
  background-size: cover;
  height: 12vh;
  width: 12vh;
  position: absolute;
  top: 14%;
  /* Positioned on bottom left corner of factory*/
  left: 62%;
  /* Positioned on bottom left corner of factory*/
  opacity: 0.8;
  /* optional, to see position */
}

.positioned-4 {
  background-size: cover;
  height: 12vh;
  width: 12vh;
  position: absolute;
  top: 14%;
  /* Positioned on bottom left corner of factory*/
  left: 82%;
  /* Positioned on bottom left corner of factory*/
  opacity: 0.8;
  /* optional, to see position */
}

.positioned-5 {
  background-size: cover;
  height: 12vh;
  width: 12vh;
  position: absolute;
  top: 51%;
  /* Positioned on bottom left corner of factory*/
  left: 1%;
  /* Positioned on bottom left corner of factory*/
  opacity: 0.8;
  /* optional, to see position */
}

.positioned-6 {
  background-size: cover;
  height: 12vh;
  width: 12vh;
  position: absolute;
  top: 51%;
  /* Positioned on bottom left corner of factory*/
  left: 21%;
  /* Positioned on bottom left corner of factory*/
  opacity: 0.8;
  /* optional, to see position */
}

.positioned-7 {
  background-size: cover;
  height: 12vh;
  width: 12vh;
  position: absolute;
  top: 51%;
  /* Positioned on bottom left corner of factory*/
  left: 66%;
  /* Positioned on bottom left corner of factory*/
  opacity: 0.8;
  /* optional, to see position */
}

.positioned-8 {
  background-size: cover;
  height: 12vh;
  width: 12vh;
  position: absolute;
  top: 51%;
  /* Positioned on bottom left corner of factory*/
  left: 86%;
  /* Positioned on bottom left corner of factory*/
  opacity: 0.8;
  /* optional, to see position */
}

.positioned-1:hover {
  background-image: none;
  /* optional, to see position */
}

.positioned-2:hover {
  background-image: none;
  /* optional, to see position */
}

.positioned-3:hover {
  background-image: none;
  /* optional, to see position */
}

.positioned-4:hover {
  background-image: none;
  /* optional, to see position */
}

.positioned-5:hover {
  background-image: none;
  /* optional, to see position */
}

.positioned-6:hover {
  background-image: none;
  /* optional, to see position */
}

.positioned-7:hover {
  background-image: none;
  /* optional, to see position */
}

.positioned-8:hover {
  background-image: none;
  /* optional, to see position */
}

@media (max-aspect-ratio: 1/1) {
  /* css for vertical viewport */
  .container-game {
    height: 90vw;
    width: 100vw;
  }
  .positioned-1 {
    height: 13vw;
    width: 13vw;
  }
  .positioned-2 {
    height: 13vw;
    width: 13vw;
  }
  .positioned-3 {
    height: 13vw;
    width: 13vw;
  }
  .positioned-4 {
    height: 13vw;
    width: 13vw;
  }
  .positioned-5 {
    height: 13vw;
    width: 13vw;
  }
  .positioned-6 {
    height: 13vw;
    width: 13vw;
  }
  .positioned-7 {
    height: 13vw;
    width: 13vw;
  }
  .positioned-8 {
    height: 13vw;
    width: 13vw;
  }
}
</style>
