<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-user-plus"></i> เพิ่มสมาชิกแอดมิน
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">เพิ่มแอดมิน</h4>
            </div>
            <div>
              <form v-on:submit.prevent="submitForm">
                <div class="form-group row">
                  <label
                    for="info_name"
                    class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                  >
                    ชื่อ:
                    <span class="required-label">*</span>
                  </label>

                  <input
                    class="form-control col-lg-4 col-md-9 col-sm-8"
                    type="text"
                    name="info_name"
                    id="info_name"
                    aria-describedby="helpId"
                    placeholder="INFO_NAME"
                    v-model="form.info_name"
                    required
                  />
                </div>

                <div class="form-group row">
                  <label
                    for="info_name"
                    class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                  >
                    USERNAME:
                    <span class="required-label">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control col-lg-4 col-md-9 col-sm-8"
                    name="username"
                    id="username"
                    aria-describedby="helpId"
                    placeholder="USERNAME"
                    v-model="form.username"
                    required
                  />
                </div>
                <div class="form-group row">
                  <label
                    for="info_name"
                    class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                  >
                    รหัสผ่าน:
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
                <div class="form-group row">
                  <label
                    for="info_name"
                    class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                  >
                    Role:
                    <span class="required-label">*</span>
                  </label>
                  <select
                    class="form-control col-lg-4 col-md-9 col-sm-8"
                    name="role"
                    id="role"
                    v-model="form.role"
                    required
                  >
                    <option selected disabled value>เลือก Role</option>
                    <option value="superAdmin">SUPER ADMIN</option>
                    <option value="Admin">ADMIN</option>
                    <option value="Staff">STAFF</option>
                  </select>
                </div>

                <div class="form-group row">
                  <label
                    for="prefix"
                    class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                  >
                    Prefix:
                    <span class="required-label">*</span>
                  </label>
                  <input
                    type="prefix"
                    class="form-control col-lg-4 col-md-9 col-sm-8"
                    name="prefix"
                    id="prefix"
                    placeholder="Prefix"
                    v-model="form.prefix"
                    required
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-success float-right mb-4 me-4">
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยันยัน
                  </button>
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
import axios from "axios";
import { baseURL } from "../../../../services/api";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      form: {
        prefix: "",
        info_name: "",
        username: "",
        password: "",
        role: "",
      },
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    async checkAuth() {
      const res = await UserService.getProfile().catch(function (error) {
        if (error.response.status === 401 || error.response.status === 500) {
          const removeToken = localStorage.removeItem("access_token");
          if (removeToken == null) {
            this.$router.push("/login");
          }
        }
      });
      res.logout;
    },
    async submitForm() {
      axios
        .post(baseURL + "/user", this.form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          (this.form.prefix = ""),
            (this.form.info_name = ""),
            (this.form.username = ""),
            (this.form.password = ""),
            (this.form.role = ""),
            this.$toast.success("สมัครเรียบร้อยแล้ว", {
              position: "top-right",
              timeout: 1500,
              icon: true,
              rtl: false,
            });
          //Perform Success Action
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Username นี้ มีผู้ใช้แล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
    },
  },
};
</script>
