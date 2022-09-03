<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-list-alt"></i> ประวัติการสร้างรายการทศนิยม
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="card">
        <!-- <div class="card-header">รายงานด</div> -->
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
                <div class="col-md-2">
                  <label for="datetime">Username</label>
                  <input
                    class="form-control"
                    id="email2"
                    placeholder="Username"
                    v-model="username"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">จำนวนเงิน</label>
                  <input
                    class="form-control"
                    id="email2"
                    placeholder="จำนวนเงิน"
                    v-model="amount"
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
          <h4 class="card-title">ประวัติการฝากทศนิยม</h4>
        </div>
        <div class="table-responsive">
          <table
            id="basic-datatables"
            class="display table table-striped table-hover"
          >
            <thead style="text-align: center" class="thead-custom">
              <tr class="table table-bordered"></tr>
              <tr>
                <th>ลำดับ</th>
                <th>ยูสเซอร์</th>
                <th>จำนวน</th>
                <th>วันเวลาที่สร้าง</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="data in decimal" v-bind:key="data.id"
              >
                <td>{{ data.id }}</td>
                <td v-if="data.members != null">
                  <!-- {{data.members}} -->
                 {{data.members[0].sb_username}}
               
                </td>

                <td>{{ data.price | formatCredit}}</td>
                <td>{{ data.updatedAt | formatDate }}</td>
              </tr>
            </tbody>
            <tbody>
              <tr v-if="decimal.length == '0'">
                <td colspan="4" class="text-center text-danger">
                  <i class="fas fa-times"></i>
                  ไม่มีข้อมูล !
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AdminService from "@/services/AdminService";
import moment from "moment";
import { baseURL } from "../../../services/api";

import axios from "axios";
export default {
  data() {
    return {
      decimal: [],
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
      username: "",
      amount: "",
    };
  },
  async mounted() {
    // this.getDataParam
    this.moment();
    this.yesterdate = moment()
      .locale("th")
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    this.yestertime = moment()
      .locale("th")
      .subtract(1, "days")
      .format("11:00:00");
    this.todate = moment()
      .locale("th")
      .format("YYYY-MM-DD");
    this.totime = moment()
      .locale("th")
      .format("11:00:00");
    this.todaydate = moment()
      .locale("th")
      .format("YYYY-MM-DD");
    this.todaytime = moment()
      .locale("th")
      .format("00:00:00");
    this.todaytime2 = moment()
      .locale("th")
      .format("23:59:59");
    // const t = "T";
    // const z = ".000Z";
    // const start_date = this.todaydate + t + this.todaytime + z;
    // const end_date = this.todaydate + t + this.todaytime2 + z;
    // const userName = this.username
    // const amount = this.amount

    await axios({
      method: "get",
      url: `${baseURL}/report/decimal?start_date=&end_date=&username&amount=`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.decimal = response.data.reportDecimal;
        console.log(this.decimal);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    getClipboard() {
      this.$toast.success("คัดลอกสำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
    getDataParam() {
      const t = "T";
      const z = ".000Z";
      const userName = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      const amount = this.amount;
      axios({
        method: "get",
        url: `${baseURL}/report/decimal?start_date=${start_date}&end_date=${end_date}&username=${userName}&amount=${amount}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.decimal = response.data.reportDecimal;
          if (this.decimal.length <= 0) {
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
      this.todaydate = moment()
        .locale("th")
        .format("YYYY-MM-DD");
      this.todaytime = moment()
        .locale("th")
        .format("00:00:00");
      this.todaytime2 = moment()
        .locale("th")
        .format("23:59:59");
      const t = "T";
      const z = ".000Z";
      const userName = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      const amount = this.amount;
      axios({
        method: "get",
        url: `${baseURL}/report/decimal?start_date=${start_date}&end_date=${end_date}&username=${userName}&amount=${amount}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.decimal = response.data.reportDecimal;
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
      this.todaytime2 = moment()
        .locale("th")
        .format("23:59:59");
      this.todaytime = moment()
        .locale("th")
        .format("00:00:00");
      const t = "T";
      const z = ".000Z";
      const userName = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      const amount = this.amount;
      axios({
        method: "get",
        url: `${baseURL}/report/decimal?start_date=${start_date}&end_date=${end_date}&username=${userName}&amount=${amount}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.decimal = response.data.reportDecimal;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
