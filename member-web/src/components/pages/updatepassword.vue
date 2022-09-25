<template>
  <div class="login"
  style="height: 100vh;"
  >
    <div class="row pt-5 mx-3">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="text-center mb-4">
          <img v-bind:src="logo" class="rounded" alt="..." width="80%" />
        </div>
        <!-- <div class="text-center">
          <div class="logo">
            <img v-bind:src="logo" width="80%" />
          </div>
        </div> -->
        <div class="card-signin my-5">
          <div class="card-body mb-3 mt-3 p-5"
          style="background-color: rgba(0, 0, 0, 0.3) !important;"
          >
              <h4 class="text-center">ตั้งรหัสผ่านใหม่ของคุณ</h4>
            <!-- <h5 class="card-title text-center">Payment Auto </h5> -->
            <form v-on:submit.prevent="cfupdatepassword">
              <div class="form-label-group">
                <label for="inputTel">รหัสผ่าน</label>
                <span class="mb-3" style="color: red"> {{ text }}</span>
              <input
                  v-model="password"
                  type="password"
                  id="inputPassword"
                  class="form-control rounded-pill"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  autocomplete="off"
                  required
                  oninvalid="this.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ')"
                />
              </div>
              <div class="form-label-group mt-2">
                <label for="inputPassword">ยืนยันรหัสผ่าน</label>
                <input
                  v-model="cfpassword"
                  type="password"
                  id="inputPassword"
                  class="form-control rounded-pill"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  autocomplete="off"
                  required
                  oninvalid="this.setCustomValidity('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ')"
                />
              </div>
              <button
                type="submit"
                value="Login"
                class="btn btn-blue btn-block mt-4 rounded-pill text-white"
                :disabled="!cfpassword || !password"
              >
               ยืนยน
              </button>
    
              <hr class="mt-5" />
              <button @click="routerLogin" class="btn btn-blue btn-block rounded-pill text-white">
                  <i class="fas fa-user-plus fa-lg mr-2"></i> เข้าสู่ระบบ
              </button>
            </form>
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
import { baseURL } from "../../services/api";
export default {
  data() {
    return {
      tel: "",
      password: "",
      cfpassword: "",
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
    routerLogin(){
       this.$router.push("/login");
    },

    async cfupdatepassword() {
      try {


          if(this.password !== this.cfpassword){
                this.$toast.error(` รหัสผ่านไม่ตรงกัน `, {
            position: "top-right",
            timeout: 1500,
          });
          }else{
              let pwc = sessionStorage.getItem("pwc");
              const confirmpassword = {
                password: this.password,
                uuid: pwc
    
             };
               await authService.updatepw(confirmpassword);
              
                this.$toast.success("สำเร็จ", {
                    position: "top-right",
                    timeout: 1500,
                });
            
            sessionStorage.removeItem("pwc")
            this.$router.push("/login");
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






.login{
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