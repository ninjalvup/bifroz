<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-user-astronaut    "></i>  ข้อมูลแอดมิน
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">ข้อมูล</h4>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="profileEdite">
                <div class="form-group row">
                  <label class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                   ชื่อ:
                    <span class="required-label">*(Info)</span>
                  </label>
                 
                    <div>
                      <small id="emailHelp" class="form-text text-muted"></small>
                    </div>
                    <input
                      v-model="form.info_name"
                      required
                      type="text"
                      class="form-control col-lg-4 col-md-9 col-sm-8"
                      aria-describedby="helpId"
                      value="info_name"
                    />
                  
                </div>

                <div class="form-group row">
                  <label for="password" class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right">
                    Password:
                    <span class="required-label">*</span>
                  </label>
                
                    <input
                      type="password"
                      class="form-control col-lg-4 col-md-9 col-sm-8"
                      name="password"
                      id="password"
                      placeholder="PASSWORD"
                      v-model="form.password"
                      required
                    />
                  
                </div>

                <div class="form-group">
                  <button class="btn btn-primary float-right">
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยืนยัน</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AdminService from "@/services/AdminService";
import axios from "axios";
import { baseURL } from '../../../services/api';
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      form: {
        uuid: "",
        // username: "",
        info_name: "",
        password: "",
      },
      uuid: "",
      username: "",
      info_name: '',
      password: "",
      profile: [],
    };
  },
  mounted() {
this.checkAuth();

    axios({
      method: "get",
      url: `${baseURL}/user/profile`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.form.info_name = response.data.data.info_name;
        this.form.uuid = response.data.data.uuid;

      })
      .catch((error) => {
        console.log(error);
      });
  },
 
  methods: {
    async checkAuth(){
       const res = await UserService.getProfile().catch(function (error) {
        if(error.response.status ===  401 || error.response.status === 500){
      const removeToken = localStorage.removeItem("access_token");
        if (removeToken == null) {
        this.$router.push("/login");
      }
      }
      });
      res.logout
    },
    async profileEdite() {
      const uuid = this.form.uuid;
      axios
        .put(baseURL + "/user/" + uuid, this.form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          this.$toast.success("เรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
          //Perform Success Action
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("ไม่ถูกต้อง", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
        // this.$router.push("/profile");

          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
    },
  },
};
</script>
