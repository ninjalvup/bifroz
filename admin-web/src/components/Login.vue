<template>
  <div id="app" class="login">
    <div class="wrapper wrapper-login">
      <div class="container container-login animated fadeIn">
        <div class="text-center">
          <img class="mb-3" src="../assets/SUPERFASTHEADER.png" height="45" />

          <!-- <span>Automatic Deposit - Withdraw System </span> -->
        </div>
        <!-- <h3 class="text-center">ระบบฝาก - ถอนออโต้</h3>/ -->

        <form v-on:submit.prevent="login()">
          <div class="form-group mt-4">
            <label for="username" class="placeholder">
              <b>ชื่อผู้ใช้</b>
            </label>
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group ">
            <label for="password" class="placeholder">
              <b>รหัสผ่าน</b>
            </label>
            <div class="position-relative">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="form-group ">
            <label for="prefix" class="placeholder">
              <b>Prefix</b>
            </label>
            <input
              v-model="prefix"
              id="prefix"
              name="prefix"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary">เข้าสู่ระบบ</button>
          </div>
        </form>

        <!-- <div class="login-form mt-3">
          <div class="form-group">
            <label for="username" class="placeholder">
              <b>ชื่อผู้ใช้</b>
            </label>
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              class="form-control"
              required
            />
            <div class=" invalid-feedback"></div>
          </div>
          <div class="form-group ">
            <label for="password" class="placeholder">
              <b>รหัสผ่าน</b>
            </label>
            <div class="position-relative">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="prefix" class="placeholder">
              <b>prefix</b>
            </label>
            <input
              v-model="prefix"
              id="prefix"
              name="prefix"
              type="text"
              class="form-control"
              required
            />
            <div class="invalid-feedback"></div>
          </div>
          <div class="form-group form-action-d-flex mb-3">
           
            <a
              class="btn btn-primary col-md-5 float-right mt-3 mt-sm-0 fw-bold text-white"
              v-on:click.prevent="login()"
              value="Login"
              sing
            >
              <i class="fas fa-sign-in-alt"></i>
              เข้าสู่ระบบ</a
            >
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import moment from "moment";

export default {
  data() {
    return {
      username: "",
      password: "",
      prefix: "",
    };
  },
  methods: {
    async login() {
      try {
        const loginForm = {
          username: this.username,
          password: this.password,
          prefix: this.prefix,
        };
        const resp = await AuthService.loginAdmin(loginForm);
        localStorage.setItem("access_token", resp.access_token);

        // this.$toast.success("เข้าสู่ระบบเรียบร้อยแล้ว", {
        //   position: "top-right",
        //   timeout: 1500,
        //   closeOnClick: true,
        //   pauseOnFocusLoss: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   draggablePercent: 0.6,
        //   showCloseButtonOnHover: false,
        //   hideProgressBar: true,
        //   closeButton: "button",
        //   icon: true,
        //   rtl: false,
        // });
        this.getNotifi();

        this.$router.push("/home");
        location.reload();


      } catch (error) {
        this.$toast.error("Username หรือ Password ไม่ถูกต้อง", {
          position: "top-right",
          timeout: 1500,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
      }
    },
    getNotifi() {
      let toDay = moment()
        .locale("th")
        .format("DD");
      let fiveDatelast = moment()
        .date(25)
        .locale("th")
        .format("DD");
      let endDate = moment()
        .endOf("month")
        .format("DD");
      // let s = moment()
      //   .date(11)
      //   .locale("th")
      //   .format("DD");
      // let ss = moment()
      //   .date(12)
      //   .locale("th")
      //   .format("DD");

      // moment().date(Number);
      // console.log(toDay);

      // console.log(fiveDatelast);
      // console.log(endDate);
      // console.log(s + " start");
      // console.log(ss + " end");

      if (toDay >= fiveDatelast && toDay <= endDate) {
        // console.log("A");
        alert("กรุณาชำระค่าบริการระบบภายในวันที่ 25 ถึง วันที่ 1 เวลา 12.00 น. ถ้าชำระหลังจากเวลาที่กำหนดไว้ ระบบจะทำการระงับการใช้งานอัตโนมัติ หากชำระแล้วกรุณาแจ้งสลิปมายังฝ่ายบัญขี ขออภัยหากคุณชำระแล้ว");
      }
    },
  },
};
</script>

<style></style>
