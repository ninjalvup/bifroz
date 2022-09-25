<template>
  <div class="login"
  style="
    height: 100vh;
"
  
  >
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto mt-5 p-0">
        <div class="text-center mb-4">
          <img v-bind:src="logo" class="rounded" alt="..." width="50%" />
        </div>
        <div class="card-signin my-5 rounded"

            >
            <div class="card-body mb-3 mt-3 p-5" >
            <div
                class="card-header text-center rounded-top"
                style="background-color: rgb(0, 0, 0, 0.3) !important"
              >
                <h5 class="font-weight-bold" style="color: wheat">
                  เข้าสู่ระบบ
                </h5>
              </div>
            

              <div
                class="card-header rounded-bottom"
                style="background-color: rgb(0, 0, 0, 0.3) !important"
              >
              <form v-on:submit.prevent="login">
                <div class="form-label-group">
                  <label for="inputTel">เบอร์โทร</label>
                  <span class="mb-3" style="color: red"> {{ text }}</span>
                  <input
                    v-model="tel"
                    type="tel"
                    class="form-control"
                    placeholder="กรุณากรอกเบอร์มือถือ"
                    minlength="8"
                    maxlength="10"
                    oninvalid="this.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก')"
                  />
                </div>
                <div class="form-label-group mt-2">
                  <label for="inputPassword">รหัสผ่าน</label>
                  <input
                    v-model="password"
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="กรุณากรอกรหัสผ่าน"
                    autocomplete="off"
                    required
                    oninvalid="this.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ')"
                  />
                </div>
                
                <div class="">
                  <span>
                    <router-link to="/forgotpassword">
                      <a class="float-right mt-2 mr-3 cw"
                      >ลืมรหัสผ่าน ?</a
                      ></router-link
                      >
                    </span>
                  </div>
                  <hr class="mt-4" />
                  <div class="justify-content-center pt-3">






                    <button
                      type="submit"
                      value="Login"
                      class="btn w-100"
                     
                    >
                     <img class="img-fluid p-0" src="assets/images/custom/login.png" />
                    </button>
                  </div>




                <button
                  @click="routerRegister"
                  class="btn w-100 mt-3"
                 
                >
                <img class="img-fluid p-0" src="assets/images/custom/register.png" />
                </button>






              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { required, minLength } from "vuelidate/lib/validators";
import authService from "@/services/authService.js";
import axios from "axios";
import { baseURL, path } from "../../services/api";
export default {
  data() {
    return {
      tel: "",
      password: "",
      msg: "",
      text: "",
      logo: "",
      path: "",
      emailBlured: false,
      valid: false,
      submitted: false,
    };
  },

  // validations: {
  //   tel: {
  //     required,
  //     minLength: minLength(10),
  //   },108
  //   password: {
  //     required,
  //     minLength: minLength(8),
  //   },
  // },

  mounted() {
    this.path = path + "admin/images/";
    console.log(path);
    //ดึงภาพโลโก้
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

  methods: {
    routerRegister() {
      this.$router.push("/register");
    },
    //เข้าสู่ระบบ
    async login() {
      try {
        const loginForm = {
          tel: this.tel,
          password: this.password,
        };
        const resp = await authService.loginAdmin(loginForm);
        if (resp.success == true) {
          this.$toast.success("เข้าสู่ระบบเรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
          });
          sessionStorage.setItem("access_token", resp.access_token);
          this.$router.push("/home");

          setTimeout(function() {
            location.reload();
          }, 500);
        }
      } catch (error) {
        this.$toast.error(error.response.data.error.message, {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
  },
};
</script>

<style scoped>
.btn-gradient {
  background-image: linear-gradient(270deg, #01b3d7, #017fd7);
  border-width: 0;
  color: #fff !important;
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
.text-fast-auto {

  font-weight: bold;
}
* {
  color: wheat;
  font-weight: 400 !important;
}


.login {
    height:100%;
} 

.login {
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-image: url("../../../public/assets/images/input.jpg") !important;
  background-position: center;
}
a {
  color: #000;
}
li {
  color: #000;
}

.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
}

.rounded-top {
  border-top-left-radius: 1.25rem !important;
  border-top-right-radius: 1.25rem !important;
}
.rounded-bottom {
  border-bottom-right-radius: 1.25rem !important;
  border-bottom-left-radius: 1.25rem !important;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 6px;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.cw{
  color:wheat;
}

</style>
