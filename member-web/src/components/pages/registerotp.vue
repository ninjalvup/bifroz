<template>
  <div
    id="register"
    style="height: 100vh"
    class="d-flex justify-content-center"
  >
    <div class="row p-4">
      <div class="">
        <div class="text-center mb-4">
          <img v-bind:src="logo" class="rounded" alt="..." width="80%" />
        </div>
        <div class="mt-5">
          <div
            class="card-body rounded"
            style="background-color: rgba(0, 0, 0, 0.3) !important"
          >
            <form id="regiration_form" class="mb-2">
              <section v-if="step == 1">
                <h6 class="mb-3 text-center">สมัครสมาชิก 1/3</h6>
                <br />
                <span></span>
                <div class="form-group">
                  <label for="tel">หมายเลขโทรศัพท์</label>
                  <input
                    v-model="tel"
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
                <button
                  @click.prevent="nextsteps"
                  type="button"
                  name="password"
                  class="btn btn btn-gradient w-100"
                  value="ถัดไป"
                  :disabled="!$v.tel.minLength"
                >
                  ถัดไป
                  <i class="fas fa-arrow-circle-right"></i>
                </button>
                <br />
                <hr />
                <router-link to="/" style="color: black">
                <p class="text-center btn btn btn-gradient w-100">
                  มีบัญชีผู้ใช้แล้ว
                    <i class="fas fa-sign-in-alt" style="color: black"></i>
                    เข้าสู่ระบบ
                  </p>
                </router-link>
                  <br />
              </section>
              <section v-if="step == 2">
                <h6 class="mb-3 text-center">สมัครสมาชิก 2/3</h6>
                <div>
                  <!-- <img
                    width="100%"
                    src="../../assets/img/kbank-recommended.png"
                    alt=""
                  /> -->
                </div>
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
                  <div class="col-6">
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
                  <div class="col-6">
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
                  กลับ
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
                  <label for="exampleInputPassword1">รหัสผ่าน</label>
                  <input
                    v-model.trim="password"
                    type="password"
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

                <!-- ยืนยันรหัส -->
                <div
                  class="form-group"
                  :class="{ 'form-group--error': $v.password.$error }"
                >
                  <label for="exampleInputPassword1">ยืนยันรหัสผ่าน</label>
                  <input
                    v-model.trim="password2"
                    type="password"
                    class="form-control"
                    id="password2"
                    name="password2"
                    placeholder="ยืนยันรหัสผ่าน"
                  />

                  <transition name="hint" appear>
                    <div
                      v-if="passwordValidation.errors.length > 0 && !submitted"
                      class="mt-2"
                    >
                      <div class="alert alert-danger">
                        <span
                          class="text-danger"
                          v-for="error in passwordValidation.errors"
                          :key="error"
                          >{{ error }}<br
                        /></span>
                      </div>
                    </div>
                  </transition>
                </div>

                <button
                  @click.prevent="backsteps"
                  type="button"
                  name="previous"
                  class="btn btn btn-gradient w-100"
                >
                  <i class="fas fa-arrow-circle-left"></i> กลับ
                </button>
                <button
                  @click.prevent="register"
                  name="submit"
                  value="register"
                  class="btn btn btn-gradient-success w-100 mt-3 mb-4"
                  :disabled="password2 != password || !password || !password2"
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
import { required, minLength } from "vuelidate/lib/validators";
import authService from "@/services/authService.js";
import axios from "axios";
import Swal from "sweetalert2";

import { baseURL } from "../../services/api";
// import VueRecaptcha from "vue-recaptcha";
export default {
  // components: {
  //   "vue-recaptcha": VueRecaptcha,
  // },
  data() {
    return {
      first_name: "",
      last_name: "",
      bank_number: "",
      bank_name: "",
      tel: "",
      line_id: "none",
      know_us: "",
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
      rules: [
        // { message: " รหัสผ่านทั้งสองช่องไม่ตรงกัน ", regex: this.password2 != this.password },
        // { message: "- ต้องใช้อักษรตัวพิมพ์ใหญ่หนึ่งตัว ", regex: /[A-Z]+/ },
        // { message: "- ขั้นต่ำ 8 ตัวอักษร ", regex: /.{8,}/ },
        // { message: "- ต้องการหนึ่งหมายเลข ", regex: /[0-9]+/ },
      ],
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
    password2: {
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
        console.log(response);
        console.log(response.data.data.prefix[0].logo);
        this.logo = response.data.data.prefix[0].logo;
        let regx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(this.logo);
        if (regx === false) {
          console.log("if");
          this.logo = require("../../../public/assets/images/Logo.png");
        } else {
          console.log("elde");
          this.logo = response.data.data.prefix[0].logo;
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          bonus: 0,
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
            imageUrl:
              "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
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
          // this.$toast.error(error.response.data.error.message, {
          //   position: "top-right",
          //   timeout: 2500,
          // });
          Swal.fire(
            "สมัครไม่สำเร็จ",
            error.response.data.error.message,
            "error"
          );
        } else {
          this.$toast.error("สมัครไม่สำเร็จ", {
            position: "top-right",
            timeout: 2500,
          });
        }
      }
    },

    // async register() {
    //   const registerForm = {
    //     first_name: this.first_name,
    //     last_name: this.last_name,
    //     bank_number: this.bank_number,
    //     bank_name: this.bank_name,
    //     tel: this.tel,
    //     line_id: this.line_id,
    //     know_us: this.know_us,
    //     bonus: this.bonus,
    //     password: this.password,
    //     prefix: this.prefix.prefix,
    //   };
    //   const loginForm = {
    //     tel: this.tel,
    //     password: this.password,
    //   };

    //   if (!this.form.robot) {
    //     this.$toast.error("ยังไม่ยืนยัน reCAPTCHA", {
    //       position: "top-right",
    //       timeout: 1500,
    //     });
    //   }

    //   let a = await authService.registerUser(registerForm).catch((error) => {
    //     this.$toast.error(error.response.data.error.message, {
    //       position: "top-right",
    //       timeout: 2500,
    //     });
    //   });

    //   if (a.message === "Success" || a.message === "add user success") {
    //   let timerInterval;
    //   Swal.fire({
    //     title: "กรุณาสักครู่ ระบบกำลังทำรายการ",
    //     // text: "ประมาณ 1 - 2 นาที",
    //     icon: "warning",

    //     // html: "I will close in <b></b> milliseconds.",
    //     timer: 1000,
    //     timerProgressBar: true,
    //     showConfirmButton: false,
    //     allowOutsideClick: false,

    //     didOpen: () => {
    //       Swal.showLoading();
    //       timerInterval = setInterval(() => {
    //         const content = Swal.getContent();
    //         if (content) {
    //           const b = content.querySelector("b");
    //           if (b) {
    //             b.textContent = Swal.getTimerLeft();
    //           }
    //         }
    //       }, 1000);
    //     },
    //     willClose: () => {
    //       clearInterval(timerInterval);
    //     },
    //   }).then(async (result) => {
    //     /* Read more about handling dismissals below */
    //     if (result.dismiss === Swal.DismissReason.timer) {
    //       console.log("I was closed by the timer");
    //       const resp = await authService.loginAdmin(loginForm);
    //       sessionStorage.setItem("access_token", resp.access_token);
    //       this.$router.push("/home");
    //     }
    //   });
    // }
    //   // if (a.data.Error.Code === -107) {
    //   //   this.$toast.error("เบอร์นี้มีผู้ใช้งานแล้ว", {
    //   //     position: "top-right",
    //   //     timeout: 2500,
    //   //   });
    //   // }
    //   // if (a.data.Error.Code === -105) {
    //   //   this.$toast.error("รูปแบบรหัสผ่านไม่ถูกต้อง", {
    //   //     position: "top-right",
    //   //     timeout: 2500,
    //   //   });
    //   // }
    //   // if (a.data.Error.Code === -104) {
    //   //   this.$toast.error("รหัสผ่านสั้นเกินไป", {
    //   //     position: "top-right",
    //   //     timeout: 2500,
    //   //   });
    //   // }
    // },
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
.btn-gradient-success {
  background-image: linear-gradient(270deg, #1e7e34, #28a745);
  border-width: 0;
  color: #fff !important;
}
.rc-anchor-normal {
  height: 74px;
  width: 280px;
}
.rc-anchor-logo-portrait {
  margin: 5px 0 0 26px;
  width: 58px;
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
  background-image: url(/img/input.4f058afc.jpg) !important;
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

.rounded {
  border-radius: 1.25rem !important;
}
</style>