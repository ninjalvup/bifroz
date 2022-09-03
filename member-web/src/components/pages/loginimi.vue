<template>
  <div
    class="fade_bg"
    style="height: 100%; width: 100%; background-color: transparent; background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, #131c29 70%); opacity: 1; position: absolute; top: 0; left: 0; z-index: -9999;"
  >
    <header
      class="masthead text-white text-center"
      style="height: 90%;padding-top: 10rem"
      id="tap_login"
    >
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="text-center">
          <img v-bind:src="logo" class="rounded" alt="..." width="70%" />
          <div class="sc-jKJlTe jDELla">ศูนย์รวมอาณาจักรความบันเทิง</div>
        </div>
<div class="card-body mb-3 mt-3 p-5">
  <form v-on:submit.prevent="login">
        <div style="margin-bottom: -15px;">
          <div
            class="input-group mb-3 sc-chPdSV "
            style="text-align: -webkit-left; width: 100%;"
          >
            <div class="input-group" style="margin: 3px 0;">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="fa fa-user" aria-hidden="true"></i
                ></span>
              </div>
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
          </div>
        </div>

        <div style="margin: 3px 0;">
          <div
            class="input-group mb-3 "
            style="text-align: -webkit-left; width: 100%;margin: 3px 0;"
          >
            <div class="input-group" style="margin: 2px 0">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="fa fa-unlock-alt" aria-hidden="true"></i
                ></span>
              </div>
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
          </div>
          <div class="input-group row " style="margin: 3px 0;">
            <div class="col-md-12 text-center ">
              <span>
                <router-link to="/forgotpassword">
                  <a class="text-white mt-2 mr-3">ลืมรหัสผ่าน ?</a></router-link
                >
              </span>
            </div>
          </div>
        </div>

      
      <div v-on:click.prevent="login">
            <img
           
            class="mt-2 mb-3 button"
            src="../../../public/assets/images/B3.png"
            width="65%"
            
          />
       
      </div>
      <div  @click="routerRegister">
            <img
           
            class="mt-2 mb-3 button"
            src="../../../public/assets/images/B2.png"
            width="65%"
            
          />
       
      </div>
      <a href="https://lin.ee/qpQs8UU" target="_blank">
            <img
           
            class="mt-2 mb-3 button"
            src="../../../public/assets/images/B1.png"
            width="65%"
            
          />
       
      </a>
      
        
</form>
</div>
        
        <!-- <img class="pb-3" src="https://imi62.com//public/tem_frontend/img/login.png" width="50%">
                <img class="pb-3" src="https://imi62.com//public/tem_frontend/img/re62.png"  width="50%">
                <img class="pb-3" src="https://imi62.com//public/tem_frontend/img/con62.png"  width="50%"> -->
      </div>
    </header>

    <Footer />
  </div>
</template>

<script>
import Footer from "./../shared/footerimi";

// import { required, minLength } from "vuelidate/lib/validators";
import authService from "@/services/authService.js";
import axios from "axios";
import { baseURL } from "../../services/api";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      tel: "",
      password: "",
      msg: "",
      text: "",
      logo: "",
      emailBlured: false,
      valid: false,
      submitted: false,
    };
  },

  // validations: {
  //   tel: {
  //     required,
  //     minLength: minLength(10),
  //   },
  //   password: {
  //     required,
  //     minLength: minLength(8),
  //   },
  // },
  mounted() {
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
        this.logo = response.data.data.prefix[0].logo;
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
          }, 1000);
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

<style >
.enYrEp {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 95%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  background-color: #1f0305;
  line-height: 1.25;
  z-index: 10;
  padding-bottom: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0 auto;
}
body {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url("../../../public/assets/images/loginBG.jpeg");
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
button {
  background-color: rgba(76, 175, 79, 0); /* Green */

}
</style>
