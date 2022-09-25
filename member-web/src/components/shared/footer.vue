<template>
  <div id="footer">

    <div class="bottombar-mobile">
      <div class="container">
        <ul class="nav-menu">
          <li class="nav-item">





            <router-link v-if="bank_name === 'kbnk'" to="/decimal" class="nav-link">
              <img
                src="assets/images/custom/1f.png"
                class="img-fluid"
                alt=""
                srcset=""
                width="30"
              />
              <!-- <i class="fa fa-arrow-down"></i> -->
              <h5><span class="szfont">ฝากเงิน</span></h5>
              </router-link >


              <router-link v-if="bank_name !== 'kbnk'" to="/bankInfo" class="nav-link">
              <img
                src="assets/images/custom/1f.png"
                class="img-fluid"
                alt=""
                srcset=""
                width="30"
              />
              <!-- <i class="fa fa-arrow-down"></i> -->
              <h5><span class="szfont">ฝากเงิน</span></h5>
              </router-link >




          </li>

          <li class="nav-item">
            <router-link to="/#" class="nav-link">
              <!-- <router-link to="/home" class="nav-link"> -->
              <img
                src="assets/images/custom/2f.png"
                class="img-fluid"
                alt=""
                srcset=""
                width="30"
              />
              <!-- <i class="fas fa-home"></i> -->
              <h5><span class="szfont">โปรโมชั่น</span></h5>
            </router-link>
          </li>

          <!-- <a
            href="https://bacc1688.com/Home/Index"
            target="_blank"
            class="text-white"
            style="text-decoration: none"
          >
            <div class="circle-wrapper">
              <div class="success circle"></div>
              <div class="icon-game">
                <i class="fas fa-gamepad" style="font-size: 30px"></i>
              </div>
            </div>
            <h5 style="font-size: 16px; text-align: center; margin-top: 27px">
              เล่นเกม
            </h5>
          </a> -->

          <!-- <a
            :href="url"
            target="_blank"
            class="text-white"
            style="text-decoration: none"
          >
            <div class="circle-wrapper">
              <div class="success circle"></div>
              <div class="icon-game">
                <i class="fas fa-gamepad" style="font-size: 30px"></i>
              </div>
            </div>
            <h5 style="font-size: 16px; text-align: center; margin-top: 27px">
              เล่นเกม
            </h5>
          </a> -->

          <!-- <form id="customform" class="customform" method="POST" action="https://imi9bet.com/posttokenv2.php">
                    <input type="hidden" id="customform_lang" name="Lang" value="en-us">
                    <input type="hidden" id="customform_Com" name="Com" value="IMIBET">
                    <input type="hidden" id="customform_CustomDomain" name="CustomDomain" value="1"><input type="hidden" id="customform_IsMobile" name="IsMobile" value="false">
                    <dl>
                        <dd><input type="hidden" id="customform_UserName" name="UserName" placeholder="UserID"   :value="sb_username"></dd>
                    </dl>
                    <dl>
                        <dd><input type="hidden" id="customform_Password" name="Password" placeholder="Password" :value="sb_password2"></dd>
                    </dl>
                    <dl>
                        <dd><input type="submit" value="Login" id="customform_submit"></dd>
                    </dl>

                    <div id="customformmsg"></div>
                </form> -->


          <li class="nav-item">
            <!-- <router-link to="/withdraw" class="nav-link"> -->
            <router-link to="/home" class="nav-link circle-wrapper">
              <img
                src="assets/images/custom/footer.gif"
                class="img-fluid rounded-circle"
                alt=""
                srcset=""
              />
              <!-- <i class="fa fa-arrow-up"></i> -->
            </router-link>
          </li>

          <!-- <a
            @click="postBetflixToken()"
            class="text-white"
            style="text-decoration: none"
          >
            <div class="circle-wrapper">
              <img
                src="assets/images/custom/footer.png"
                class="img-fluid rounded-circle"
                alt=""
                srcset=""
              />
            </div>
          </a> -->

          <!-- <a
            @click="postBetflixTokenWe()"
            class="text-white"
            style="text-decoration: none"
          >
            <div class="circle-wrapper">
              <div class="success circle"></div>
              <div class="icon-game">
                <i class="fas fa-gamepad" style="font-size: 30px"></i>
              </div>
            </div>
            <h5 style="font-size: 16px; text-align: center; margin-top: 27px">
              ทดสอบ
            </h5>
          </a> -->

          <!-- <a
            @click="postGettoken()"
            class="text-white"
            style="text-decoration: none"
          >
            <div class="circle-wrapper">
              <div class="success circle"></div>
              <div class="icon-game">
                <i class="fas fa-gamepad" style="font-size: 30px"></i>
              </div>
            </div>
            <h5 style="font-size: 16px; text-align: center; margin-top: 27px">
              เล่นเกม
            </h5>
          </a> -->

          <li class="nav-item">
            <!-- <router-link to="/withdraw" class="nav-link"> -->
            <router-link to="announce" class="nav-link">
              <img
                src="assets/images/custom/3f.png"
                class="img-fluid"
                alt=""
                srcset=""
                width="30"
              />
              <!-- <i class="fa fa-arrow-up"></i> -->
              <h5><span class="szfont">ประกาศ</span></h5>
            </router-link>
          </li>

          <!-- <li class="nav-item">
            <a href="https://lin.ee/bFwggcX" class="nav-link">
              <i class="fa fa-arrow-up"></i><span class="szfont">ถอนเงิน</span>
            </a>
          </li> -->


          <li class="nav-item text-white">
              <a class="nav-link text-white nav-item " href="https://lin.ee/txP1QWO">
   
                <img
                  src="assets/images/custom/4f.png"
                  class="img-fluid"
                  alt=""
                  srcset=""
                  width="30"
                />
                <!-- <i class="fa fa-user"></i> -->
                <h5><span class="szfont">ติดต่อ</span></h5>
              </a>
            </li>




        </ul>

        <!-- <div class="sc-12wx88y-3 bVdwMI">
            <div class="sc-12wx88y-9 kuSzFa">
              <div class="sc-12wx88y-7 fiZGWH">
                <h4 class="sc-12wx88y-8 fyxztE">หน้าแรก</h4>
                <button class="sc-12wx88y-4 sc-12wx88y-5 jYMDzy">
                  <svg viewBox="0 0 69.066 75.106" class="icon">
                    <path
                      data-name="Path 8916"
                      d="M37.133.891a4.239 4.239 0 00-5.2 0L1.637 24.433A4.235 4.235 0 000 27.773v43.1a4.236 4.236 0 004.237 4.235h15.285a4.236 4.236 0 004.237-4.235V49.517a4.236 4.236 0 014.237-4.235H41.07a4.236 4.236 0 014.237 4.235v21.354a4.236 4.236 0 004.237 4.235h15.285a4.236 4.236 0 004.237-4.235V27.773a4.234 4.234 0 00-1.637-3.34z"
                      fill="#0C24FF"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="sc-12wx88y-7 fiZGWH">
                <h4 class="sc-12wx88y-8 fyxztE">ถอน</h4>
                <button class="sc-12wx88y-4 sc-12wx88y-5 jYMDzy">
                  <svg viewBox="0 0 19.609 19.608" class="icon">
                    <g data-name="027-withdraw">
                      <g data-name="Group 57">
                        <g data-name="Group 56">
                          <path
                            data-name="Path 8914"
                            d="M19 0H.613A.613.613 0 000 .613v8.579a.613.613 0 00.613.613h2.252a10.087 10.087 0 001.016-2.452h-.2a1.226 1.226 0 01-1.23-1.225V3.677a1.226 1.226 0 011.226-1.226h12.255a1.226 1.226 0 011.226 1.226v2.451a1.209 1.209 0 01-.906 1.156 13.067 13.067 0 01-.729 2.516H19a.613.613 0 00.613-.613V.613A.613.613 0 0019 0z"
                            fill="#6d7278"
                          ></path>
                        </g>
                      </g>
                      <g data-name="Group 59">
                        <g data-name="Group 58">
                          <path
                            data-name="Path 8915"
                            d="M15.141 3.677H5.327a10.648 10.648 0 01-1.56 7.033c-3.141 5.152-1.313 8.451-1.234 8.59a.614.614 0 00.532.308h8.579a.616.616 0 00.534-.914c-.064-.114-1.522-2.853 1.215-7.345a11.779 11.779 0 001.748-7.672zM7.354 5.515a.613.613 0 111.226 0v1.226a.613.613 0 01-1.226 0zm2.451 11.03a.613.613 0 11-1.226 0v-1.226a.613.613 0 011.226 0zm-1.226-3.37a2.17 2.17 0 111.838-2.145 2.012 2.012 0 01-1.839 2.145z"
                            fill="#6fb944"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
              <div class="sc-12wx88y-7 fiZGWH">
                <h4 class="sc-12wx88y-8 fyxztE">โปรโมชั่น</h4>
                <button class="sc-12wx88y-4 sc-12wx88y-5 jYMDzy">
                  <svg viewBox="0 0 512 512" class="icon">
                    <g fill="#136ef1">
                      <path
                        d="M361 241l-27.122 31.17-79.236 204.75L256 512l225-271-15.935-15h-82.503z"
                      ></path>
                      <path
                        d="M31 241l225 271 2.929-31.039-82.477-213.085L151 241l-19.681-15H51.634z"
                      ></path>
                    </g>
                    <g fill="#1689fc">
                      <path
                        d="M421 121l-23.999 17.998-41.438 82.876L361 241h120zM91 121l26.256 22.511 42.436 84.874L151 241H31z"
                      ></path>
                    </g>
                    <path
                      fill="#17ace8"
                      d="M361 241L256 512 151 241l26.4-15h155.4z"
                    ></path>
                    <path fill="#1689fc" d="M361 241L256 512V226h76.8z"></path>
                    <g fill="#cae8f9">
                      <path
                        d="M271 15v31c0 8.399-6.599 15-15 15s-15-6.601-15-15V15c0-8.401 6.599-15 15-15s15 6.599 15 15zM181.747 91.747a14.948 14.948 0 01-10.605-4.395l-21.211-21.211c-5.859-5.859-5.859-15.352 0-21.211s15.352-5.859 21.211 0l21.211 21.211c5.859 5.859 5.859 15.352 0 21.211a14.952 14.952 0 01-10.606 4.395z"
                      ></path>
                    </g>
                    <path
                      d="M330.253 91.747a14.948 14.948 0 01-10.605-4.395c-5.859-5.859-5.859-15.352 0-21.211l21.211-21.211c5.859-5.859 15.352-5.859 21.211 0s5.859 15.352 0 21.211l-21.211 21.211a14.952 14.952 0 01-10.606 4.395z"
                      fill="#b7e0f6"
                    ></path>
                    <g fill="#17ace8">
                      <path
                        d="M256 121l2.412 19.899 77.52 88.595L361 241l60-120z"
                      ></path>
                      <path
                        d="M256 121l2.281 14.536-78.342 89.534L151 241 91 121z"
                      ></path>
                    </g>
                    <path
                      d="M271 15v31c0 8.399-6.599 15-15 15V0c8.401 0 15 6.599 15 15z"
                      fill="#b7e0f6"
                    ></path>
                    <path fill="#cae8f9" d="M361 241H151l105-120z"></path>
                    <path fill="#b7e0f6" d="M361 241H256V121z"></path>
                  </svg>
                </button>
              </div>
              <div class="sc-12wx88y-7 fiZGWH">
                <h4 class="sc-12wx88y-8 fyxztE">ลิ้งค์รับรายได้</h4>
                <button class="sc-12wx88y-4 sc-12wx88y-5 jYMDzy">
                  <img
                    src="/images/icons/icon-menu/affiliate.svg"
                    class="icon"
                  />
                </button>
              </div>
              <div class="sc-12wx88y-7 fiZGWH">
                <h4 class="sc-12wx88y-8 fyxztE">บัญชีผู้ใช้</h4>
                <button class="sc-12wx88y-4 sc-12wx88y-5 jYMDzy">
                  <svg viewBox="-42 0 512 512" class="icon">
                    <path
                      d="M333.672 123.309c0 33.886-12.152 63.218-36.125 87.195-23.973 23.973-53.309 36.125-87.195 36.125h-.059c-33.844-.012-63.16-12.164-87.133-36.125-23.976-23.977-36.125-53.309-36.125-87.195 0-33.875 12.149-63.211 36.125-87.184C147.121 12.16 176.438.012 210.293 0h.059c33.875 0 63.21 12.152 87.195 36.125 23.973 23.973 36.125 53.309 36.125 87.184zm0 0"
                      fill="#ffbb85"
                    ></path>
                    <path
                      d="M427.168 423.945c0 26.735-8.504 48.38-25.254 64.32C385.36 504.02 363.464 512 336.844 512H90.313c-26.622 0-48.516-7.98-65.06-23.734C8.494 472.312 0 450.672 0 423.946c0-10.282.34-20.454 1.02-30.235.69-10 2.09-20.883 4.152-32.363 2.078-11.575 4.75-22.516 7.95-32.516 3.32-10.352 7.812-20.562 13.37-30.344 5.774-10.152 12.555-18.996 20.156-26.277 7.97-7.621 17.711-13.742 28.973-18.203 11.223-4.438 23.664-6.688 36.977-6.688 5.222 0 10.28 2.137 20.03 8.489a2715.05 2715.05 0 0020.895 13.472c6.704 4.274 15.782 8.282 27.004 11.903 9.864 3.191 19.875 4.972 29.766 5.28 1.09.04 2.18.06 3.27.06 10.984 0 22.093-1.801 33.046-5.34 11.223-3.621 20.313-7.63 27.012-11.903a2683.96 2683.96 0 0020.887-13.46c9.758-6.364 14.808-8.5 20.043-8.5 13.3 0 25.742 2.25 36.972 6.687 11.262 4.46 21.004 10.594 28.965 18.203 7.614 7.281 14.395 16.125 20.164 26.277 5.563 9.79 10.063 19.992 13.371 30.332 3.204 10.012 5.883 20.953 7.961 32.535 2.051 11.493 3.453 22.375 4.141 32.348.691 9.75 1.031 19.922 1.043 30.242zm0 0"
                      fill="#6aa9ff"
                    ></path>
                    <path
                      d="M210.352 246.629h-.059V0h.059c33.875 0 63.21 12.152 87.195 36.125 23.973 23.973 36.125 53.309 36.125 87.184 0 33.886-12.152 63.218-36.125 87.195-23.973 23.973-53.309 36.125-87.195 36.125zm0 0"
                      fill="#f5a86c"
                    ></path>
                    <path
                      d="M427.168 423.945c0 26.735-8.504 48.38-25.254 64.32C385.36 504.02 363.464 512 336.844 512H210.293V286.465c1.09.039 2.18.058 3.27.058 10.984 0 22.093-1.8 33.046-5.34 11.223-3.62 20.313-7.628 27.012-11.902a2683.96 2683.96 0 0020.887-13.46c9.758-6.364 14.808-8.5 20.043-8.5 13.3 0 25.742 2.25 36.972 6.687 11.262 4.46 21.004 10.594 28.965 18.203 7.614 7.281 14.395 16.125 20.164 26.277 5.563 9.79 10.063 19.992 13.371 30.332 3.204 10.012 5.883 20.953 7.961 32.535 2.051 11.493 3.453 22.375 4.141 32.348.691 9.75 1.031 19.922 1.043 30.242zm0 0"
                      fill="#2682ff"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="sc-12wx88y-7 fiZGWH">
                <h4 class="sc-12wx88y-8 fyxztE">ติดต่อ</h4>
                <button class="sc-12wx88y-4 sc-12wx88y-5 jYMDzy">
                  <img
                    class="icon"
                    src="/images/icons/icon-menu/icon-line.svg"
                    alt="line"
                  />
                </button>
              </div>
            </div>
            <button class="sc-12wx88y-4 sc-12wx88y-5 ddYCYu">
              <svg data-name="033-grid" viewBox="0 0 18 18" class="icon">
                <g data-name="Group 51">
                  <g data-name="Group 50" fill="#fff">
                    <path
                      data-name="Path 8908"
                      d="M7.615 0H.692A.692.692 0 000 .692v6.923a.692.692 0 00.692.692h6.923a.692.692 0 00.692-.692V.692A.692.692 0 007.615 0z"
                    ></path>
                    <path
                      data-name="Path 8909"
                      d="M17.307 0h-6.923a.69หฟก2.692 0 00-.692.692v6.923a.692.692 0 00.692.692h6.923a.692.692 0 00.692-.692V.692A.692.692 0 0017.307 0z"
                    ></path>
                    <path
                      data-name="Path 8910"
                      d="M7.615 9.692H.692a.692.692 0 00-.692.692v6.922a.692.692 0 00.692.692h6.923a.692.692 0 00.692-.692v-6.923a.692.692 0 00-.692-.691z"
                    ></path>
                    <path
                      data-name="Path 8911"
                      d="M17.307 9.692h-6.923a.692.692 0 00-.692.692v6.922a.692.692 0 00.692.692h6.923a.692.692 0 00.692-.692v-6.923a.692.692 0 00-.692-.691z"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
          </div>  -->
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL, gameURL } from "./../../services/api";
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
      bank_name: "",
      b1: window.location.origin,
    };
  },
  mounted() {
    // console.log(this.isMobile());
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
        console.log();
        // this.sb_username = response.data.data.tel;
        this.sb_username = response.data.data.sb_username;
        this.sb_password = response.data.data.sb_password;
        this.sb_password2 = encodeURIComponent(this.sb_password);
        this.bank_name = response.data.data.bank_name;
        //redirect game uking omg fastbet
        // let UserName = sessionStorage.getItem("sb_username");
        // let password = sessionStorage.getItem("sb_password");

        // hash kbbet 6002a1b41146f4001016d03f
        // hash fast987 5fec146babae5c0012cbc39e
        // hash mybet98 60375bf62ad5a20010c6f7d3
        // hash iwin98 5fa60df34cde9c2f1edba2ee

        // this.url = `https://${gameURL}.com/#!/redirect?username=${this.sb_username}&password=${this.sb_password2}&url=https%3A%2F%2F${gameURL}.com&hash=60f690b1f1b07b00232e35c2`; //xm
        // this.url = `https://${gameURL}.com/#!/redirect?username=${this.sb_username}&password=${this.sb_password2}&url=https%3A%2F%2F${gameURL}.com&hash=5fdc507e40845f001175deb8`;// fast18
        // this.url = `https://${gameURL}.com/#!/redirect?username=${this.sb_usernamme}&password=${this.sb_password2}&url=https%3A%2F%2F${gameURL}.com&hash=60dfed61c0222c0010cd268a`;// mabet
        // this.url = `https://${gameURL}.com/#!/redirect?username=${this.sb_username}&password=${this.sb_password2}&url=https%3A%2F%2F${gameURL}.com&hash=6113de480ecaeb002692f3f8`;// fastx98

        // this.url = `https://imi9bet.com/postprocv2.php/?Lang=th-th&Com=IMIBET&CustomDomain=1&isMobile=true&UserName=${UserName}&password=${password}`;
        // this.url =`https://imi79.com`
        //redirect game ambbet
        // 6089080eea7a3b0010d8224b wealthy

        if (this.isMobile() === true) {
          this.url = `https://m.${gameURL}.com/login/auto/?username=${this.sb_username}&password=${this.sb_password2}&hash=62961e8cc1abf2007ed73590&url=https://member-amfr.superfast-auto.com&lang=th`;
        } else {
          this.url = `https://${gameURL}.com/login/auto/?username=${this.sb_username}&password=${this.sb_password2}&hash=62961e8cc1abf2007ed73590&url=https://member-amfr.superfast-auto.com&lang=th`;
        }

        // this.url = `https://ambbet.com/login/auto/?username=${this.sb_username}&password=${this.sb_password2}&url=https://member-rich45.superfast-auto.com?&hash=6125afbacfb42f001fb6b41f`
        // this.url = `https://lucybet.net?username=${this.sb_username}&password=${this.sb_password2}`;
        // this.url = `https://plodnie.com?username=${this.sb_username}&password=${this.sb_password2}`;
        // this.url = `https://akin88.com?username=${this.sb_username}&password=${this.sb_password2}`;
        // this.url = `https://heng99.net?username=${this.sb_username}&password=${this.sb_password2}`;
        // this.url = `https://heng99.net?username=${this.sb_username}&password=${this.sb_password2}`;
        // let url = `https://api.bifroz.com/betflix/api/loginGame/${this.sb_username}`;
        this.checkMobile = this.isMobile();
        // this.url = `https://api-imi9bet.superfast-auto.com/imi/api/gamelogin/${this.sb_username}/${this.sb_password2}/${this.checkMobile}`;
        // this.url = `https://sportbook.thesunsport.net/?username=${this.sb_username}&password=${this.sb_password2}`;
      })
      .catch((error) => {
        if (error.response.data == "Unauthorized") {
          sessionStorage.removeItem("access_token");
        }
      });
  },
  methods: {
    // async postGettoken() {
    //     const form = {
    //         username: sessionStorage.getItem("sb_username"),
    //         password: sessionStorage.getItem("sb_password"),
    //     };
    //     const res = await postLogin.postUfa(form);
    //     console.log(res.data.url);
    //     // console.log(res.data.RedirectUrl);
    //     this.url = res.data.url;
    //     window.location.href = this.url;
    // },

    async postBetflixToken() {
      let url = `https://api.bifroz.com/betflix/api/loginGame/${this.sb_username}`;
      const res = await axios.get(url);
      window.location.href = res.data.url; // betflix
    },

    async postBetflixTokenWe() {
      let url = `https://api.bifroz.com/betflix/api/loginGameWe/${this.sb_username}`;
      const res = await axios.get(url);
      window.location.href = res.data.url;
    },

    async postGettoken() {
      //imi
      const form = {
        username: sessionStorage.getItem("sb_username"),
        password: sessionStorage.getItem("sb_password"),
      };

      // const res = await postLogin.getToken(form);
      const res = await postLogin.postUfa(form);
      // console.log(res.data.RedirectUrl);
      this.url = res.data.url;

      // this.url = res.data.RedirectUrl;
      //  window.location.href = this.url;
      // window.open();
      window.location.href = this.url;
      // window.location.target = "_blank";
    },
    async playPG() {},

    isMobile() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
  },
};
</script>

<style>
.footer-lg {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 65px;
  background-color: white;
}

.container-footer {
  padding-top: 0px;
  width: auto;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .footer-lg {
    display: none;
  }

  .footer-mobile {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: white;
  }
}

@media only screen and (min-width: 600px) {
  .footer-mobile {
    display: none;
  }
}

.bottombar-mobile {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(25, 25, 25, 1) 35%,
    rgba(25, 25, 25, 1) 65%,
    rgba(0, 0, 0, 1) 100%
  );
  position: fixed;
  right: 0;
  left: 0;
  padding-top: 2px;
  bottom: 0;
  z-index: 1000;
  box-shadow: 0 0 5px gold;
  /* background: linear-gradient(0deg, #007bff 0%, rgb(0 121 255 / 62%) 100%);
  position: fixed;
  right: 0;
  left: 0;
  padding-top: 2px;
  bottom: 0;
  z-index: 1000; */
}

.bottombar-mobile .nav-menu {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

.bottombar-mobile .nav-menu .nav-item {
  flex: 1 1;
  list-style-type: none;
  text-align: center;
}

.bottombar-mobile .nav-menu .nav-item .nav-link {
  text-decoration: none;
  padding: 0.25rem 0;
  opacity: 1;
  color: #fff;
  display: block;
}

.bottombar-mobile .nav-menu .nav-item {
  flex: 1 1;
  list-style-type: none;
  text-align: center;
}

.bottombar-mobile .nav-menu .nav-item .nav-link i {
  display: block;
  line-height: 1.4;
  color: #fcfcfc;
}

.bottombar-mobile .nav-menu .nav-item.middle-item .nav-link {
  opacity: 1;
  border-radius: 50%;
  position: relative;
  color: #f1c40f;
  width: 60px;
  height: 60px;
  margin: -2.15rem auto auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.15s ease-out;
  animation: pulse 2s infinite;
  padding: 0;
  background-image: linear-gradient(225deg, #ff00db, #e08918);
}

.szfont {
  font-size: 14px;
}

.bottombar-mobile .nav-menu .nav-item .nav-link i {
  display: block;
  line-height: 1.4;
  text-shadow: 2px 0px rgb(80 80 76);
  color: #ffffff;
}

.bVdwMI {
  position: fixed;
  bottom: 70px;
  right: 1rem;
  z-index: 2160;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: end;
  justify-content: flex-end;
  align-items: flex-end;
  max-height: 100vh;
  overflow: auto;
  padding: 0px 6px 6px 0px;
}

.kuSzFa {
  display: flex;
  flex-direction: column;
  height: 0px;
  width: 0px;
  overflow: hidden;
  transition: height 0.1s ease-in 0s;
}

.fiZGWH {
  display: grid;
  grid-template-columns: auto 50px;
  -webkit-box-align: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.fyxztE {
  margin: 0px;
  color: rgb(255, 255, 255);
  text-align: right;
}

.ddYCYu .icon {
  height: 22px;
  width: auto;
  margin-bottom: 0.25rem;
}

button:not(:disabled),
[type="button"]:not(:disabled),
[type="reset"]:not(:disabled),
[type="submit"]:not(:disabled) {
  cursor: pointer;
}

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  appearance: button;
  cursor: pointer;
}

.ddYCYu {
  display: inline-flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0px;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(255, 255, 255);
  background: linear-gradient(
    67deg,
    rgb(211, 47, 47) 0%,
    rgb(241, 60, 60) 100%
  );
  box-shadow: rgb(0 0 0 / 50%) 0px 3px 6px;
}

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  appearance: button;
  cursor: pointer;
}

button,
select {
  text-transform: none;
}

button {
  overflow: visible;
  font-weight: 400;
}

.bsjNcI {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 0.1s ease-in 0s;
  width: auto;
  height: 346px;
  margin-bottom: 0.5rem;
}

svg:not(:root) {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
}

*,
::after,
::before {
  box-sizing: border-box;
}

.circle-wrapper {
  position: relative;
  /* width: 60px;
  height: 60px;
  float: left; */
  margin: -1.4rem auto auto;
}

.icon-game {
  position: absolute;
  color: #fff;
  font-size: 55px;
  top: 20px;
  left: 30px;
  transform: translate(-50%, -50%);
}

.circle {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 2.5px;
  background-clip: content-box;
  animation: spin 10s linear infinite;
}

.circle-wrapper:active .circle {
  animation: spin 2s linear infinite;
}

/* .success {
  background-color: red;
  border: 2.5px dashed #ffa9a9;
} */

/* .error {
} */

.warning {
  background-color: #f0d500;
  border: 2.5px dashed #f0d500;
}

@keyframes spin {
  100% {
    transform: rotateZ(360deg);
  }
}

.page-wrapper {
  height: 100vh;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
