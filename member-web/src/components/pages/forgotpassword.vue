<template>
  <div id="register"
  style="
    height: 100vh;
"
  
  >
    <div class="row pt-5">
      <div class="p-5">
           <div class="text-center mb-4">
          <img v-bind:src="logo" class="rounded" alt="..." width="80%" />
        </div>
        <div class="mt-5">
          <div class="card-body"
          style="background-color: rgba(0, 0, 0, 0.3) !important; border-radius: 1.25rem !important;"
          
          
          
          >
            <form id="regiration_form" class="mb-2">
              <section v-if="step == 1">
                <h6 class="mb-3 text-center">ลืมรหัสผ่าน? 1/2</h6>
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
                <br />
                <br />
                <p class="text-center">
                  มีบัญชีผู้ใช้แล้ว
                  <router-link to="/">
                    <i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ
                  </router-link>
                </p>
                <br />
              </section>
              <section v-if="step == 2">
                <h6 class="mb-3 text-center">ลืมรหัสผ่าน? 2/2</h6>
           
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
                <div class="form-group">
                  <label for="fname">ชื่อจริง*กรอกภาษาไทยเท่านั้น</label>
                  <input
                    v-model="first_name"
                    type="text"
                    class="form-control"
                    name="first_name"
                    id="first_name"
                    placeholder="กรุณาใช้ชื่อจริงที่ตรงกับบัญชีเท่านั้น"
                    @keyup="onlyText"
                  />
                </div>
                  <div class="form-group">
                  <label for="fname">นามสกุล*กรอกภาษาไทยเท่านั้น</label>
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
      

                 <button
                  @click.prevent="backsteps"
                  type="button"
                  name="previous"
                  class="btn btn btn-gradient w-100 mr-1"
                >
                  <i class="fas fa-arrow-circle-left"></i> กลับ
                </button>

                <button
                  @click.prevent="forgotpassword"
                  name="submit"
                  value="forgotpassword"
                  class="btn btn btn-gradient-success w-100 mt-2 mb-4 text-white"
                 
                >
                  <i class="fas fa-check-circle"></i> ส่ง
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
import { baseURL } from "../../services/api";

export default {
  components: {
 
  },
  data() {
    return {
      first_name: "",
      last_name: "",
      bank_number: "",
      bank_name: "",
      tel: "",
      line_id: "",
      know_us: "",
      bonus: "",
      password: "",
      prefix: "",
      step: 1,
      totalsteps: 3,
      errors: [],
      logo: "",
      captcha: "",
      form: {
        robot: false,
      },
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
        this.logo = response.data.data.prefix[0].logo;
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
    async forgotpassword(){
       try {
            const forgotForm = {
                first_name: this.first_name,
                last_name: this.last_name,
                bank_number: this.bank_number,
                tel: this.tel,
               
        };
         const response = await authService.forgotPassword(forgotForm);
            sessionStorage.setItem("pwc", response.uuid);
            this.$toast.success(`${response.data} เข้าหน้า แก้ไข password `, {
            position: "top-right",
            timeout: 1500,
          });
           this.$router.push("/updatepassword");
           
       } catch (error) {
     
            this.$toast.error(error.response.data.error.message, {
            position: "top-right",
            timeout: 2500,
          });
       }
    },
    
  },
  //------->
};
</script>

<style scoped>
.btn-gradient {
    background-image: linear-gradient(
270deg
,#01b3d7,#017fd7);
    border-width: 0;
    color: #fff!important;
}
.btn-gradient-success{
     background-image: linear-gradient(
270deg
,#1e7e34,#28a745);
    border-width: 0;
    color: #fff!important;
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
    border-radius: 1.25rem;
    box-shadow: rgb(0 0 0 / 10%) 0px 5px 20px 5px;
}






#register{
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-image: url(/img/input.4f058afc.jpg) !important;
    background-position: center;
}


* {
  color: wheat;
}
.btn-gradient {
    background-image: linear-gradient( 270deg ,wheat, wheat);
    color: wheat;
    border-width: 0;
    color: black!important;
}
</style>