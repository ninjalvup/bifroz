<template>
  <div id="register" style="height: 100vh">
    <div class="row" style="">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto mt-5 p-0">
        <div class="col-12 text-center mb-4">
          <img v-bind:src="logo" class="rounded" alt="..." width="80%" />
        </div>
        <div class="col-12 mt-5">
          <div
            class="card-body"
            style="
              background-color: rgba(0, 0, 0, 0.3) !important;
              border-radius: 1.25rem !important;
            "
          >
            <form id="regiration_form" class="mb-2">
              <section v-if="step == 1">
                <h6 class="mb-3 text-center">สมัครสมาชิก 1/3</h6>
                <br />
                <!-- cm -->
                <!-- <mySlides></mySlides> -->
                <div class="slideshow-container d-none">
                  <div class="mySlides fade">
                    <div class="numbertext">1 / 3</div>
                    <img
                      src="https://picsum.photos/id/1037/900/400"
                      style="width: 100%"
                    />
                    <!-- <img src="../../assets/promo_img/1.png" style="width:100%"> -->
                    <!-- <div class="text">Caption Text</div> -->
                  </div>

                  <div class="mySlides fade">
                    <div class="numbertext">2 / 3</div>
                    <!-- <img src="https://picsum.photos/id/1038/900/400" style="width:100%">  -->

                    <!-- <div class="text">Caption Two</div> -->
                  </div>

                  <div class="mySlides fade">
                    <div class="numbertext">3 / 3</div>
                    <img
                      src="https://picsum.photos/id/1038/900/400"
                      style="width: 100%"
                    />
                    <!-- <img src="../../assets/promo_img/2.png" style="width:100%"> -->
                    <!-- <div class="text">Caption Two</div> -->
                  </div>
                </div>
                <br />

                <div class="d-none" style="text-align: center">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>

                <form id="send-code">
                  <div id="phone-input">
                    <label for="tel">หมายเลขโทรศัพท์</label>
                    <!-- <input type="tel" id="phone_number" /> -->
                    <input
                      v-model="tel"
                      id="phone_number"
                      type="tel"
                      class="form-control"
                      placeholder="กรุณากรอกเบอร์มือถือ"
                      minlength="8"
                      maxlength="10"
                      oninvalid="this.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก')"
                      @keyup="onNumber"
                    />
                    <span
                      class="error"
                      style="color: red"
                      v-if="!$v.tel.minLength"
                      >กรุณากรอกให้ครบทั้ง
                      {{ $v.tel.$params.minLength.min }} หลัก.</span
                    >
                  </div>
                  <input
                    type="submit"
                    value="กดเพื่อรับรหัสOTP"
                    id="btn_a"
                    :disabled="!$v.tel.minLength || !$v.tel"
                    class="btn btn btn-gradient1 w-100"
                    style="margin-top: 10px"
                  />

                  <span id="status" class="status"></span>
                  <p id="demo_x"></p>
                </form>

                <!-- OTP -->
                <section>
                  <div id="otp-modal">
                    <div
                      class="modal-content"
                      style="background-color: rgb(27, 27, 27)"
                    >
                      <span id="close" class="pretty_left">&#x2715; ปิด</span>
                      <form id="check-code" style="margin-top: 50px">
                        <div>
                          <input
                            type="text"
                            id="code"
                            placeholder="ใส่รหัส OTP 6 หลัก"
                            required
                            class="pretty_w"
                          />
                        </div>
                        <div style="margin-bottom: 1rem">
                          <input
                            type="submit"
                            value="ยืนยันรหัส OTP"
                            class="pretty_x"
                            id="btn_x"
                            style="
                              color: black;
                              background-color: wheat;
                              border-radius: 1.25rem;
                            "
                          />
                        </div>
                        <span id="modal-status" class="status"></span>
                      </form>
                    </div>
                  </div>
                </section>

                <!-- end here -->
                <router-link to="/" style="color: black">
                <p class="text-center btn btn btn-gradient w-100">
                  มีบัญชีผู้ใช้แล้ว
                    <i class="fas fa-sign-in-alt" style="color: black"></i>
                    เข้าสู่ระบบ
                  </p>
                </router-link>
                <button
                  id="first_nxt"
                  @click.prevent="nextsteps"
                  type="button"
                  name="password"
                  class="btn btn btn-gradient w-100"
                  value="ถัดไป"
                  style="visibility: hidden"
                >
                  ถัดไป
                  <i class="fas fa-arrow-circle-right"></i>
                </button>
                <!-- <br />
                <hr />
                <br />
                <br /> -->
                <br />
              </section>
              <section v-if="step == 2">
                <h6 class="mb-3 text-center">สมัครสมาชิก 2/3</h6>
                <!-- <div>
                  <img
                    width="100%"
                    src="../../assets/img/kbank-recommended.png"
                    alt=""
                  />
                </div> -->
                <div class="form-group">
                  <label for="bank_name">ธนาคาร </label>
                  <select
                    class="form-control"
                    id="bank_name"
                    name="bank_name"
                    v-model="bank_name"
                  >
                    <option value="">เลือกธนาคาร</option>
                    <option value="kbnk">ธนาคารกสิกรไทย</option>
                    <!-- <option value="truemoney">TrueMoney Wallet</option> -->
                    <option value="bbla">ธนาคารกรุงเทพ</option>
                    <option value="ktba">ธนาคารกรุงไทย</option>
                    <option value="scb">ธนาคารไทยพาณิชย์</option>
                    <option value="gsb">ธนาคารออมสิน</option>
                    <option value="bay">ธนาคารกรุงศรีอยุธยา</option>
                    <option value="uob">ธนาคารยูโอบี</option>
                    <option value="tisco">ธนาคารทิสโก้</option>
                    <option value="ibank">ธนาคารอิสลามแห่งประเทศไทย</option>

                    <option value="baac">
                      ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร
                    </option>
                    <option value="ttb">ธนาคารทหารไทยธนชาต (TTB)</option>
                    <option value="icbt">ธนาคารไอซีบีซี (ไทย)</option>
                    <option value="tcd">ธนาคารไทยเครดิตเพื่อรายย่อย</option>
                    <option value="citi">ธนาคารซิตี้แบงก์</option>
                    <option value="scbt">
                      ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)
                    </option>
                    <option value="cimb">ธนาคารซีไอเอ็มบีไทย</option>
                    <option value="hsbc">ธนาคารเอชเอสบีซี ประเทศไทย</option>
                    <option value="mizuho">ธนาคารมิซูโฮ คอร์ปอเรต</option>
                    <option value="ghb">ธนาคารอาคารสงเคราะห์</option>
                    <option value="lhbank">ธนาคารแลนด์ แอนด์ เฮ้าส์</option>
                    <!-- <option value="tbank">ธนาคารธนชาต</option> -->
                    <option value="kkp">ธนาคารเกียรตินาคิน</option>
                    <option value="ibank">ธนาคารอิสลามแห่งประเทศไทย</option>
                  </select>
                  <!-- <span
                    style="font-size: 11px"
                    class="alert alert-danger"
                    role="alert"
                  >
                    ถ้าลูกค้าใช้บัญชีธนาคารไทยพานิชย์(SCB) กรุณาแจ้งสลิป
                    เมื่อเติมเงิน เพื่อความรวดเร็ว
                  </span> -->
                </div>
                <div class="form-group">
                  <label for="account_number">หมายเลขบัญชี</label>
                  <input
                    v-model="bank_number"
                    type="tel"
                    class="form-control"
                    placeholder="กรุณากรอกหมายเลขบัญชี"
                    minlength="10"
                    maxlength="12"
                    oninvalid="this.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก')"
                    @keyup="onNumber"
                  />
                  <span
                    class="error"
                    style="color: red"
                    v-if="!$v.bank_number.minLength"
                    >กรุณากรอกให้ครบทั้ง
                    {{ $v.bank_number.$params.minLength.min }}-12 หลัก.</span
                  >
                </div>

                <div class="row">
                  <div class="col-6 pr-0">
                    <div class="form-group">
                      <label for="fname">ชื่อจริง</label>
                      <input
                        v-model="first_name"
                        type="text"
                        class="form-control"
                        name="first_name"
                        id="first_name"
                        placeholder="กรอกชื่อจริง"
                        @keyup="onlyText"
                      />
                    </div>
                  </div>
                  <div class="col-6 pl-0">
                    <div class="form-group">
                      <label for="fname">นามสกุล</label>
                      <input
                        v-model="last_name"
                        type="text"
                        class="form-control"
                        name="last_name"
                        id="last_name"
                        placeholder="กรอกนามสกุล"
                        @keyup="onlyText"
                      />
                    </div>
                  </div>
                </div>

                <button
                  @click.prevent="backsteps"
                  type="button"
                  name="previous"
                  class="btn btn-gradient float-left btn-block2 mr-1"
                >
                  <i class="fas fa-arrow-circle-left"></i> กลับ
                </button>

                <button
                  @click.prevent="nextsteps"
                  type="button"
                  name="password"
                  class="btn btn-gradient btn-block2 mr-1"
                  :disabled="
                    !bank_name ||
                    !$v.bank_number.minLength ||
                    !first_name ||
                    !last_name
                  "
                >
                  ถัดไป
                  <i class="fas fa-arrow-circle-right"></i>
                </button>
              </section>
              <section v-if="step == 3">
                <h6 class="mb-3 text-center">สมัครสมาชิก 3/3</h6>
                <div
                  class="form-group"
                  :class="{ 'form-group--error': $v.password.$error }"
                >
                  <label for="exampleInputPassword">รหัสผ่าน</label>
                  <input
                    v-model.trim="password"
                    type="text"
                    class="form-control"
                    id="password"
                    name="password"
                    placeholder="รหัสผ่าน*รหัสผ่านนี้ใช้สำหรับเข้าเกมด้วย"
                  />

                  <transition name="hint" appear>
                    <div
                      v-if="passwordValidation.errors.length > 0 && !submitted"
                      class="mt-2"
                    ></div>
                  </transition>
                </div>

                <div
                  class="form-group"
                  :class="{ 'form-group--error': $v.password.$error }"
                >
                  <label for="exampleInputPassword">ยืนยันรหัสผ่าน</label>
                  <input
                    v-model.trim="password2"
                    type="password"
                    class="form-control"
                    id="password2"
                    name="password"
                    placeholder="ยืนยันรหัสผ่าน"
                  />

                  <transition name="hint" appear>
                    <div
                      v-if="passwordValidation.errors.length > 0 && !submitted"
                      class="mt-2"
                    ></div>
                  </transition>
                </div>

                <!-- <div class="form-group">
                  <label for="line_id">ไลน์ไอดี</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ไลน์ไอดี"
                    name="line_id"
                    id="line_id"
                    v-model="line_id"
                  />
                </div> -->
                <div class="form-group d-none">
                  <label for="know_us">รู้จักเราผ่านช่องทางใด</label>
                  <select
                    class="form-control"
                    id="know_us"
                    name="know_us"
                    v-model="know_us"
                  >
                    <option value="google" selected>Google</option>
                    <!-- <option value="คุณโอชา">คุณโอชา</option> -->
                    <option value="google">Google</option>
                    <option value="line">Line</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">Youtube</option>
                    <option value="twitter">Twitter</option>
                    <option value="vk">VK</option>
                    <option value="tiktok">Tiktok</option>
                    <!-- <option value="เฮียอาร์ม">เฮียอาร์ม</option> -->
                    <!-- <option value="เฮียบาส">เฮียบาส</option> -->
                    <!-- <option value="เฮียโก้">เฮียโก้</option> -->
                    <!-- <option value="เฮียเจอร์">เฮียเจอร์</option> -->
                    <!-- <option value="เฮียอั๋น">เฮียอั๋น</option> -->
                    <!-- <option value="เฮียหมู">เฮียหมู</option> -->
                    <!-- <option value="เฮียจ๊อด">เฮียจ๊อด</option> -->
                    <!-- <option value="เฮียแบงค์">เฮียแบงค์</option> -->
                    <!-- <option value="เฮียบอล">เฮียบอล</option>
                    <option value="เฮียจิมมี่">เฮียจิมมี่</option>
                    <option value="เฮียกอล์ฟ">เฮียกอล์ฟ</option>
                    <option value="เฮียซิน">เฮียซิน</option>
                    <option value="เสี่ยเท่ห์">เสี่ยเท่ห์</option> -->
                    <option value="facebook">Facebook</option>
                    <option value="friend">เพื่อนแนะนำมา</option>
                  </select>
                </div>
                <div class="row pb-4 d-none">
                  <legend class="col-form-label col-sm-3 pt-0">โบนัส</legend>
                  <div class="col-sm-10">
                    <div class="form-check">
                      <input
                        v-model="bonus"
                        class="form-check-input"
                        type="radio"
                        name="bonus"
                        value="0"
                      />
                      <label class="form-check-label" for="gridRadios1"
                        >ไม่รับโบนัส</label
                      >
                    </div>
                    <div class="form-check">
                      <input
                        v-model="bonus"
                        class="form-check-input"
                        type="radio"
                        name="bonus"
                        value="1"
                      />
                      <label class="form-check-label" for="gridRadios2"
                        >รับโบนัส</label
                      >
                    </div>
                    <input type="text" hidden v-model="prefix" />
                  </div>
                  <label
                    for="robot"
                    class="col-12 col-sm-2 col-form-label"
                  ></label>
                  <div class="col-12 col-sm-12">
                    <!-- <vue-recaptcha
                      v-model="form.robot"
                      ref="recaptcha"
                      @verify="onVerify"
                      sitekey="6LcgzXUbAAAAAH3SPEsnlcQEvHSO2oIlZT0ZEd31"
                    >
                     
                    </vue-recaptcha> -->
                  </div>
                </div>
                <!-- 6LcgzXUbAAAAAH3SPEsnlcQEvHSO2oIlZT0ZEd31   mabet -->
                <!-- 6Ld2zn8aAAAAAF_0iJdXwSqDJ5B0oXXxF1fvAtBr  fast18 -->
                <!-- 6LdNbLsaAAAAAPxIbtnhvWeWi26DEOneKkO2GG7j wealthy -->
                <!-- 6LcZPzsaAAAAAG0TfmXifeQiLMyWoCa6UQPgeZzw iwin -->
                <!-- 6LcmYHwaAAAAAEF-JnsKzDK8b4p3VmiQta9gRP5w  imi79 -->
                <button
                  @click.prevent="backsteps"
                  type="button"
                  name="previous"
                  class="btn btn btn-gradient w-100"
                >
                  กลับ
                </button>
                <button
                  @click.prevent="register"
                  name="submit"
                  value="register"
                  class="btn btn btn-gradient-success w-100 mt-3 mb-4"
                  :disabled="!password || !password2 || password !== password2"
                >
                  <i class="fas fa-check-circle"></i> ยืนยันการสมัคร
                </button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// cm add verify script

import { required, minLength } from "vuelidate/lib/validators";
import authService from "@/services/authService.js";
import axios from "axios";
import Swal from "sweetalert2";
import liff from "@line/liff";

// import getotp from "getotp.js";

import testOTP from "@/services/testOTP.js";
// import getOTP from "@/services/getOTP.js"
import { baseURL } from "../../services/api";
// import VueRecaptcha from "vue-recaptcha";

export default {
  // components: {
  //   "vue-recaptcha": VueRecaptcha,
  // },
  data() {
    return {
      slide: 0,
      sliding: null,

      first_name: "",
      last_name: "",
      bank_number: "",
      bank_name: "",
      tel: "",
      line_id: "none",
      know_us: "none",
      bonus: 0,
      password: "",
      password2: "",
      prefix: "",
      step: 1,
      totalsteps: 3,
      errors: [],
      logo: "",
      captcha: "",
      form: {
        robot: true,
      },
      rules: [],
    };
  },
  validations: {
    tel: {
      required,
      minLength: minLength(10),
    },
    bank_number: {
      required,
      minLength: minLength(10),
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  mounted() {
    axios({
      method: "get",
      url: baseURL + "/photo/prefix",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.data.prefix[0].logo);
        this.logo = response.data.data.prefix[0].logo;
        let regx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(this.logo);
        if (regx === false) {
          // console.log("if");
          this.logo = require("../../../public/assets/images/Logo.png");
        } else {
          // console.log("elde");
          this.logo = response.data.data.prefix[0].logo;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    let slideIndex = 0;

    // buyCursor()
    // function buyCursor() {
    //   console.log('here')
    //   document.getElementById("first_nxt").disabled = true;
    //   consol
    //   if (document.getElementById("demo_x").value == "การยืนยันตัวตนสำเร็จ")
    //   {
    //     document.getElementById("first_nxt").disabled = false;
    //   }else{document.getElementById("first_nxt").disabled = true;}

    // }

    showSlides();

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
      setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

    // cm end

    // ------------------------------------hereeeeee------------------------------------

    const statusSpan = document.getElementById("status");
    const modalStatusSpan = document.getElementById("modal-status");
    // const testblock = document.getElementById("otp-modal");

    // function showModalStatus(message, options = {color: "gray"}) {
    //   modalStatusSpan.style.color = options.color;
    //   modalStatusSpan.textContent = message;
    // }

    function showModalStatus(message, options = { color: "gray" }) {
      modalStatusSpan.style.color = options.color;
      modalStatusSpan.textContent = message;
    }

    function showError(error) {
      console.error(error);
      showStatus(error, { color: "#a94442" });
    }

    function showStatus(message, options = { color: "gray" }) {
      statusSpan.style.color = options.color;
      statusSpan.textContent = message;
    }

    function clearStatus() {
      statusSpan.textContent = "";
      modalStatusSpan.textContent = "";
    }

    const modal = document.getElementById("otp-modal");
    const modal_id = document.getElementById("code");
    const modal_btn = document.getElementById("btn_x");
    const model_btn_a = document.getElementById("btn_a");
    // const nxt_btn = document.getElementById("first_nxt");
    var to;

    // add
    var serverToken;
    async function sendOtp(event) {
      event.preventDefault();

      to = document.querySelector("#phone_number").value;

      const data = new URLSearchParams();
      data.append("to", to);

      try {
        const GetResponse = await testOTP.getOTP(to);
        setTimeout(function () {
          // const GetResponse = sessionStorage.getItem('objectGreeting');
          const GetResponseData = GetResponse.data;
          // console.log("from GetResponseData", GetResponse.data);
          serverToken = GetResponseData["token"];
          // sessionStorage.setItem("token", serverToken);
          // console.log('from serverToken')
          // console.log(serverToken);
          if (GetResponseData["status"] == "success") {
            clearStatus();
            modal.style.display = "block";
            showModalStatus(`Sent verification code to ${to}`);
          } else {
            showError(`Something went wrong while sending code to ${to}.`);
          }
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }

    document
      .getElementById("send-code")
      .addEventListener("submit", (event) => sendOtp(event));

    // var verifystatus;
    async function checkOtp(event) {
      event.preventDefault();
      let code = document.getElementById("code");
      showModalStatus(`Checking code ${code.value}...`);
      const data = new URLSearchParams();
      data.append("code", code.value);
      data.append("token", serverToken);

      try {
        const GetResponse = await testOTP.verifyOTP(serverToken, code.value);
        setTimeout(function () {
          // const GetVerifyResponse = sessionStorage.getItem('verifyObject');
          const GetVerifyResponseData = GetResponse.data;
          console.log("GetVerifyResponseData:", GetVerifyResponseData);
          // verifystatus = GetVerifyResponseData['status'];

          if (GetVerifyResponseData["status"] == "success") {
            // nxt_btn.style.display = "";
            modal_id.remove();
            modal_btn.remove();
            model_btn_a.remove();
            showModalStatus(
              "การยืนยันตัวตนเรียบร้อย ปิดหน้านี้พื่อดำเนินการต่อ!",
              { color: "green" }
            );
            document.getElementById("demo_x").innerHTML =
              "การยืนยันตัวตนสำเร็จ";
            code.value = "";
            var btnVisible = document.getElementById("first_nxt");
            var btnlineVisible = document.getElementById("regis_line");

            btnVisible.style.visibility = "visible";
            btnlineVisible.style.visibility = "hidden";
          } else {
            // modal_id.remove();
            // showModalStatus("การยืนยันตัวตนไม่สำเร็จกรุณาลองอีกครั้ง!", {color: "#a94442"})
            document.getElementById("demo_x").innerHTML =
              "การยืนยันตัวตนไม่สำเร็จกรุณาลองอีกครั้ง!";

            showModalStatus("Incorrect token!", { color: "#a94442" });
            code.value = "";
          }
        }, 1500);
      } catch (error) {
        console.error(error);
        showModalStatus("Something went wrong!");
        code.value = "";
      }
    }

    let checkCode = document.getElementById("check-code");
    checkCode.addEventListener("submit", (event) => checkOtp(event));

    let closeButton = document.getElementById("close");
    closeButton.addEventListener("click", () => {
      clearStatus();
      modal.style.display = "none";
    });

    window.onclick = function (event) {
      switch (event.target.id) {
        case "otp-modal":
          modal.style.display = "none";
          clearStatus();
          break;
        // case "channel-sms":
        //   showPhoneNumberInput();
        //   break;
      }
    };

    // ---- Line ---
    // async function LineLogin(event) {
    //   event.preventDefault();
    //   try{
    //     liff.init({
    //       liffID:'1657377145-nV8vBr8E'
    //       }).then(()=>{console.log('in liff init')},
    //       }catch (error) {
    //     console.error(error);
    //     } }

    // document
    //   .getElementById("regis_line")
    //   .addEventListener("submit", (event) => LineLogin(event));
    async function LineLogin(event) {
      event.preventDefault();
      console("clickhere");
      liff
        .init({
          liffID: "1657377145-P1pYBVpj",
        })
        .then(() => {
          console.log("inliff");
        });
    }

    document
      .getElementById("regis_line")
      .addEventListener("submit", (event) => LineLogin(event));

    // -------------------------------------------------------------------
  },

  created() {
    let uri = window.location.href.split("?");
    if (uri.length == 2) {
      let vars = uri[1].split("&");
      let getVars = {};
      let tmp = "";
      this.prefix = getVars;
      vars.forEach(function (v) {
        tmp = v.split("=");
        if (tmp.length == 2) getVars[tmp[0]] = tmp[1];
      });
      // do
    }
  },
  methods: {
    //RegEX
    onNumber() {
      this.tel = this.tel.replace(/[A-Za-zก-๛]/g, "");
      this.bank_number = this.bank_number.replace(/[A-Za-zก-๛]/g, "");
    },
    onlyText() {
      this.first_name = this.first_name.replace(/[A-Z0-9a-z]/g, "");
      this.last_name = this.last_name.replace(/[A-Za-z0-9]/g, "");
    },
    onVerify: function (response) {
      if (response) this.form.robot = true;
    },

    //สมัครเเบบ step
    nextsteps() {
      if (this.step == 1) {
        if (!this.tel) {
          return false;
        }
      }
      if (this.step == 2) {
        if (!this.bank_name) {
          return false;
        }
      }
      this.step++;
    },
    backsteps() {
      this.step--;
    },
    async register() {
      try {
        const registerForm = {
          first_name: this.first_name,
          last_name: this.last_name,
          bank_number: this.bank_number,
          bank_name: this.bank_name,
          tel: this.tel,
          line_id: this.line_id,
          know_us: this.know_us,
          bonus: this.bonus,
          password: this.password,
          prefix: this.prefix.prefix,
        };
        const loginForm = {
          tel: this.tel,
          password: this.password,
        };

        if (!this.form.robot) {
          this.$toast.error("ยังไม่ยืนยัน reCAPTCHA", {
            position: "top-right",
            timeout: 1500,
          });
        } else {
          let timerInterval;
          Swal.fire({
            title: "กรุณารอสักครู่",
            // text: "ประมาณ 1 - 2 นาที",
            // imageUrl:
            //   "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
            imageWidth: 300,
            imageHeight: 200,

            html: " ประมาน <b></b> นาที.",
            timer: 5678,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,

            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                const content = Swal.getContent();
                if (content) {
                  const b = content.querySelector("b");
                  let ms = Swal.getTimerLeft();
                  let minutes = Math.floor(ms / 60000);
                  let seconds = ((ms % 60000) / 1000).toFixed(0);
                  if (b) {
                    b.textContent = `${minutes}:${
                      seconds < 10 ? "0" : ""
                    }${seconds}`;
                  }
                }
              }, 1000);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then(async (result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              this.time = "I was closed by the timer";
            }
          });
          this.$toast.success("สมัครเรียบร้อย", {
            position: "top-right",
            timeout: 1500,
          });
          await authService.registerUser(registerForm);
          const resp = await authService.loginAdmin(loginForm);
          sessionStorage.setItem("access_token", resp.access_token);
          this.$router.push("/home");
          setTimeout(function () {
            location.reload();
          }, 1000);
        }
      } catch (error) {
        if (error.response.data.user) {
          this.$toast.error("มีผู้ใช้งงานนี้เเล้ว", {
            position: "top-right",
            timeout: 2500,
          });
        }
        if (error.response.data.error.message) {
          this.$toast.error(error.response.data.error.message, {
            position: "top-right",
            timeout: 2500,
          });
        } else {
          this.$toast.error("สมัครไม่สำเร็จ", {
            position: "top-right",
            timeout: 2500,
          });
        }
      }
    },
  },
  computed: {
    passwordValidation() {
      let errors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(this.password)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
    },
  },
};
</script>

<style scoped>
.alert-danger {
  color: #690a13;
  background-color: #ffd3d7;
  border-color: #fda7b0;
}
.alert {
  position: relative;
  padding: 0.15rem 0.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.15rem;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  height: 40px;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 20%);
  border: 1px solid #d8d8d8;
  -moz-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 20%);
}

.btn-gradient {
  background-image: linear-gradient(270deg, #01b3d7, #017fd7);
  border-width: 0;
  color: #fff !important;
}
.btn-gradient1 {
  background-image: linear-gradient(270deg, wheat, wheat);
  /* background-color:  #6f6f70; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0;
  color: #000 !important;
}
.btn-gradient-success {
  background-image: linear-gradient(270deg, #1e7e34, #28a745);
  border-width: 0;
  color: #fff !important;
}
.rc-anchor-normal {
  height: 74px;
  /* width: 280px; */
  width: 100%;
}
.rc-anchor-logo-portrait {
  margin: 5px 0 0 26px;
  /* width: 58px; */
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.rc-anchor-normal {
  height: 74px;
  width: 280px;
}
.rc-anchor-normal .rc-anchor-content {
  height: 74px;
  width: 156px;
}
.rc-anchor-normal .rc-anchor-pt {
  margin: 2px 11px 0 0;
  padding-right: 0px;
  position: absolute;
  right: 0;
  text-align: center;
  width: 165px;
}
.rc-anchor-normal {
  height: 74px !important;
  width: 245px !important;
}
* {
  color: #000;
  font-weight: 700 !important;
}

* {
  box-sizing: border-box;
}
body {
  font-family: Verdana, sans-serif;
}
.mySlides {
  display: none;
}
img {
  vertical-align: middle;
}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .text {
    font-size: 11px;
  }
}

/* main {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  } */

/* div.content {
    max-width: 100%;
  } */

/* input,
  select {
    font: inherit;
    border: 1px solid rgb(136, 145, 170);
    border-radius: 4px;
    padding: 0.6rem;
  } */

.status {
  margin-top: 1rem;
}

#otp-modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 5; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  text-align: center;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #f8f8f8;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 90%; /* Could be more or less, depending on screen size */
  position: relative;
}

.modal-content .pretty_x {
  background-color: #04aa6d;
  border: none;
  cursor: pointer;
  padding: 16px 20px;
  width: 80%;
}
.modal-content .pretty_w {
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  width: 80%;
}
.pretty_left {
  position: absolute;
  font-size: 15pt;
  float: left;
}

/* background-image: linear-gradient(270deg, #8c8e8f, #6f6f70);
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 0;
    color: #fff !important; */

/* btn btn btn-gradient1 w-100  */
.linebtn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0;
}
.linecolor {
  cursor: pointer;
  background-color: #06c755;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0;
  color: #fff !important;
  background-image: url("/../../assets/btn_base.png") 16px x 16px;
}

.card-login {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0px 0px 0px;
  box-shadow: rgb(0 0 0 / 10%) 0px 5px 20px 5px;
}
#register {
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-image: url("../../../public/assets/images/input.jpg") !important;
  background-position: center;
}
* {
  color: wheat;
}

#code {
  color: #000;
}

#close {
  color: wheat;
}

#modal-status {
  margin-top: 20px;
}
option {
  color: #000;
}

.btn-gradient {
  background-image: linear-gradient(270deg, wheat, wheat);
  color: wheat;
  border-width: 0;
  color: black !important;
}
</style>