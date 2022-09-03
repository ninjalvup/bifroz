<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-list-alt"></i> กำไรขาดทุน
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="card">
        <div class="card-header">รายงาน</div>
        <div class="row">
          <div class="col-md-12">
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    จากวันที่
                  </label>
                  <VueCtkDateTimePicker
                    :only-date="true"
                    v-model="yesterdate"
                    format="YYYY-MM-DD"
                    formatted="DD-MM-YYYY"
                    :no-label="true"
                    locale="th-TH"
                    label="yesterday"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-clock-o" aria-hidden="true"></i> เวลา
                  </label>
                  <VueCtkDateTimePicker
                    v-model="yestertime"
                    :only-time="true"
                    format="HH:mm:ss"
                    formatted="HH:mm"
                    :no-label="true"
                    label="Time"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    ถึงวันที่
                  </label>
                  <VueCtkDateTimePicker
                    :only-date="true"
                    v-model="todate"
                    format="YYYY-MM-DD"
                    formatted="DD-MM-YYYY"
                    :no-label="true"
                    locale="th-TH"
                    label="today"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    เวลา
                  </label>
                  <VueCtkDateTimePicker
                    v-model="totime"
                    :only-time="true"
                    format="HH:mm:ss"
                    formatted="HH:mm"
                    :no-label="true"
                    label="Time"
                  />
                </div>

                <div class="col-md-1.5">
                  <br />
                  <button
                    class="btn btn-primary btn-sm ml-1"
                    v-on:click.prevent="getDataParam()"
                  >
                    <i class="fas fa-search"></i>
                    ค้นหา
                  </button>
                  <button
                    class="btn btn-secondary btn-sm ml-1"
                    v-on:click.prevent="getYesterday()"
                  >
                    เมื่อวาน
                  </button>
                  <button
                    class="btn btn-warning btn-sm ml-1"
                    v-on:click.prevent="getToday()"
                  >
                    วันนี้
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">รายการ</h4>
        </div>
  <div class="table-responsive">
                <table
                  id="basic-datatables"
                  class="display table table-striped table-hover"
                >
                  <thead style="text-align: center">
                   
                    <tr>
                      <th>ฝาก</th>
                      <th>โบนัส</th>
                      <th>ฝาก + โบนัส</th>
                      <th>ถอน</th>
                      <th>คอมพานี</th>
                      <th>กำไรขาดทุน</th>
                      <th>กำไรขาดทุน + คอมพานี</th>
                     
                
                    </tr>
                  </thead>
                  <tbody></tbody> 
                  
                </table>
              </div>      </div>
    </div>
  </div>
</template>

<script>
// import AdminService from "@/services/AdminService";
import moment from "moment";
import { baseURL } from '../../../services/api';
import UserService from "@/services/UserService";

import axios from "axios";
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
      info_name: "",
      password: "",
      profile: [],
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
    };
  },
  mounted() {
this.checkAuth();

    this.moment();
    this.yesterdate = moment()
      .locale("th")
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    this.yestertime = moment()
      .locale("th")
      .subtract(1, "days")
      .format("11:00:00");
    this.todate = moment().locale("th").format("YYYY-MM-DD");
    this.totime = moment().locale("th").format("11:00:00");
    this.todaydate = moment().locale("th").format("YYYY-MM-DD");
    this.todaytime = moment().locale("th").format("00:00:00");
    this.todaytime2 = moment().locale("th").format("23:59:59");
    const t = "T";
    const z = ".000Z";
    const start_date = this.todaydate + t + this.todaytime + z;
    const end_date = this.todaydate + t + this.todaytime2 + z;

    axios({
      method: "get",
      url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.member = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    async checkAuth(){
       const res = await UserService.getProfile().catch(function (error) {
        if(error.response.status === 401 || error.response.status === 500){
      const removeToken = localStorage.removeItem("access_token");
        if (removeToken == null) {
        this.$router.push("/login");
      }
      }
      });
      res.logout
    },
    getDataParam() {
      const t = "T";
      const z = ".000Z";
      const username = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=${username}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.member = response.data.data;
          this.username = "";
          if (this.member.length <= 0) {
            this.$toast.error("ไม่พบรหัสข้อมูลนี้", {
              position: "top-right",
              timeout: 1500,
              icon: true,
              rtl: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getToday() {
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const z = ".000Z";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.member = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getYesterday() {
      this.todaydate = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const z = ".000Z";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.member = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
