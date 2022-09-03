<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-list-alt"></i> กราฟสมัครสมาชิก
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
     <div class="card">
         <img class="card-img-top" src="holder.js/100x180/" alt="">
         <div class="card-body">
             <h4 class="card-title">Title</h4>
             <p class="card-text">Text</p>
         </div>
     </div>
    </div>
  </div>
</template>

<script>
// import AdminService from "@/services/AdminService";
import moment from "moment";
import { baseURL } from '../../../services/api';

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
          // console.log(this.member);
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
