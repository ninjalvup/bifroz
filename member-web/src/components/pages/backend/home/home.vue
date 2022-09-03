<template>
  <div id="whithdrawlist">
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <UserData />

        <div class="card mt-3 shadow border-0">
          <div class="card-body border-0">
            <i class="fab fa-bitcoin text-danger"></i>
            เมนู ฝาก - ถอน
            <!--    <a
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-danger btn-sm float-right rounded-pill text-white"
              ><i class="fas fa-gamepad"></i> เล่นเกม</a
            > -->

            <!--  <a :href="url" class="rainbow-button float-right rounded-pill" alt="เล่นเกม"></a>  -->
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
              <!-- <a :href="urlsport" class="btn" target="blank">
                <div class="col">
                  <div class="row">
                    <div class="col mts">
                      <img
                        class="zoom"
                        src="assets/images/icons/sport.png"
                        alt
                      />
                    </div>
                  </div>
                </div>
              </a> -->

              <!-- AFFILIATE -->

              <router-link to="/sharedLink" class="btn">
                            <div class="col">
                                <div class="row">
                                    <div class="col mts">
                                        <img class="zoom" src="assets/images/icons/share.png" alt />
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
            <!-- <div class="d-flex justify-content-start flex-row mt-3">
              <div>
                <router-link to="/depositlist" class="btn bgbo">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <img
                          src="assets/images/icons/wallet.png"
                          alt
                          height="40"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p for>ฝาก</p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="pl-2">
                <router-link to="/withdraw" class="btn bgbo">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <img
                          src="assets/images/icons/withdraw.png"
                          alt
                          height="40"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p for>ถอน</p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="pl-2">
                <router-link to="/report" class="btn bgbo">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <img
                          src="assets/images/icons/list.png"
                          alt
                          height="40"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p for>รายการ</p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div> -->
            <!-- <img class="responsive" v-bind:src="bandner" /> -->
            <div class="mt-3">
              <i class="fas fa-clinic-medical text-danger"></i>
              เมนู ทั่วไป
              <!-- <hr /> -->

              <div class="row mlstyle">
                <!-- <router-link to="/profile" class="btn">
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
                </router-link> -->

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

                <!-- AFFILIATE -->

                <router-link to="/userTree" class="btn">
                                <div class="col">
                                    <div class="row">
                                        <div class="col mts">
                                            <img class="zoom" src="assets/images/icons/pung.png" alt />
                                        </div>
                                    </div>
                                </div>
                            </router-link>
              </div>

              <!-- <div class="pl-2">
                  <router-link to="/profile" class="btn bgbo">
                    <div class="col">
                      <div class="row">
                        <div class="col">
                          <img src="assets/images/icons/user.png" alt height="40" />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <p for>บัญชี</p>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div> -->
            </div>
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
// import Swal from "sweetalert2";

// import GAME from "./game";
export default {
  components: {
    UserData,
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

  beforeCreate() {},

  methods: {
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

img {
  -webkit-filter: drop-shadow(5px 5px 5px rgb(125, 138, 250));
  filter: drop-shadow(5px 5px 5px rgb(151, 122, 255));
}

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
</style>
