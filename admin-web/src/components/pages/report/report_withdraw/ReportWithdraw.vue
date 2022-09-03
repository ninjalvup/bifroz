<template>
  <div id="User">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title"><i class="fas fa-list-alt"></i> รายงานการถอน</h4>
      </div>
      
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
      <div class="row">
                            <div class="col-md-2">
                              <label for="datetime">
                                <i
                                  class="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                                จากวันที่</label
                              >
                              <VueCtkDateTimePicker
                                :only-date="true"
                                v-model="yesterdate"
                                format="YYYY-MM-DD"
                                formatted="DD-MM-YYYY"
                                :no-label="true"
                                locale="th-TH"
                                Label="yesterday"
                              />
                            </div>
                            <div class="col-md-2">
                              <label for="datetime">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                เวลา</label
                              >
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
                                <i
                                  class="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                                ถึงวันที่</label
                              >
                              <VueCtkDateTimePicker
                                :only-date="true"
                                v-model="todate"
                                format="YYYY-MM-DD"
                                formatted="DD-MM-YYYY"
                                :no-label="true"
                                locale="th-TH"
                                Label="today"
                              />
                            </div>
                            <div class="col-md-2">
                              <label for="datetime">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                เวลา</label
                              >
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
                              <label for="datetime"
                                >กรุณากรอกข้อมูลที่ต้องการ</label
                              >
                              <input
                                class="form-control"
                                id="email2"
                                placeholder="ข้อมูลที่ต้องการค้นหา"
                                v-model="username"
                              />
                            </div>
                            <div class="col-md-1.5">
                              <br />
                              <button
                                class="btn btn-primary btn-sm ml-1"
                                v-on:click.prevent="getDataParam()"
                              >
                                <i class="fa fa-search" aria-hidden="true"></i>
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
        <div class="card">
          
          <div class="card-header">
            <div class="row">
              
              <div class="col">
                <h3 class="card-title">ข้อมูลรายงาน: การถอน</h3>
              </div>
            </div>
          </div>

          <div>
            <div class="table-responsive">
              <table
                id="basic-datatables"
                class="display table table-striped table-hover"
              >
                <thead style="text-align: center">
                  <!-- <tr class="table table-bordered">
                    <th colspan="2">รายการถอนทั้งหมด(x)</th>
                    <th>xx,xxx.xx</th>
                    <th colspan="8"></th>
                  </tr> -->

                  <tr class="table table-bordered">
                      <th>#</th>
                    <th>ธนาคาร</th>
                    <th>Username</th>
                    <th>ยอดเงิน</th>
                    <th>เวลาทำรายการ</th>

                    <th>ประเภท</th>

                    <th>เครดิตก่อนถอน</th>
                    <th>เครดิตหลังถอน</th>
                    <th>ทำโดย</th>
                    <th>หมายเหตุ</th>
                    <th>ref.</th>
                  </tr>
                </thead>
                <tbody style="text-align: center">
                  <tr v-for="(data, index) in depositreport" v-bind:key="data.id">
                    <td>{{index+1}}</td>
                    <td>
                      <div class="avatar mt-3">
                        <img
                          :src="
                            require(`../../../../assets/bank_icon/${data.member_account_banks[0].bank_name.toLowerCase()}.png`)
                          "
                          class="icon"
                          width="40"
                        />
                      </div>
                      <div>
                        <b>
                          <a
                            href="#/reportwithdraw"
                            @click="getClipboardBank"
                            v-clipboard:copy="
                              data.member_account_banks[0].bank_number
                            "
                            >{{ data.member_account_banks[0].bank_number }}</a
                          ></b
                        >
                      </div>
                      <div>
                        ({{ data.member_account_banks[0].bank_account_name }})
                      </div>
                    </td>
                    <td>
                      <b>
                        <a
                          href="#/reportwithdraw"
                          @click="getClipboard"
                          v-clipboard:copy="data.username"
                          >{{ data.username}}</a
                        ></b
                      >
                    </td>
                    <td>{{ data.amount.toFixed()  }}</td>
                                       <td >{{data.bank_time}}</td>

                    <td>
                      <div v-if="data.transaction_type == '1'">
                        <span class="badge badge-info">ฝาก</span>
                      </div>
                      <div v-if="data.transaction_type == '2'">
                        <span class="badge badge-warning">ถอน</span>
                      </div>
                    </td>
                    <td>
                      <span> {{ data.credit_before | formatNumber }}</span>
                    </td>
                    <td>
                      <span>{{ data.credit_after.toFixed() |formatNumber}}</span>
                    </td>
                    <td>{{ data.create_by }}</td>
                    <td><a
                        href="#/reportwithdraw"
                        @click="viewAnnotation(data.annotation)"
                        >view
                      </a></td>
                    <td>{{ data.ref }}</td>

                  </tr>
                </tbody>
                <tbody>
                  <tr v-if="depositreport.length == '0'">
                    <td colspan="13" class="text-center text-danger">
                      <i class="fas fa-times"></i>
                      ไม่มีข้อมูล !
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- modal -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const moment = require("moment");
import { baseURL } from '../../../../services/api';
import swal from "sweetalert";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      username: "",
      datetime1: "",
      datetime2: "",
      true: true,
      false: false,
      bank: "",
      amount: "",
      bonus_credit: "",
      transaction_type: "",
      credit_before: "",
      credit_after: "",
      create_by: "",
      annotation: "",
      ref: "",
      transaction_status: "",
      createdAt: "",
      updatedAt: "",
      depositreport: [],
      todaydate: "",
      todaytime: "",
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
      
      .format("YYYY-MM-DD");
    this.yestertime = moment()
      .locale("th")
     
      .format("00:00:00");
    this.todate = moment().locale("th").format("YYYY-MM-DD");
    this.totime = moment().locale("th").format("23:59:59");
    this.todaydate = moment().locale("th") .add(1, "days").format("YYYY-MM-DD");
    this.todaytime = moment().locale("th").format("00:00:00");
    this.todaytime2 = moment().locale("th").format("23:59:59");
    const t = "T";
    const z = "";
    const start_date = this.yesterdate + t + this.todaytime + z;
    const end_date  = this.todaydate + t + this.todaytime2 + z;
    axios({
      method: "get",
      url: `${baseURL}/report/withdraw/?start_date=${start_date}&end_date=${end_date}&username=`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.depositreport = response.data.data;
        setTimeout(async function () {
          await axios();
        }, 120000);
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
    moment() {
      return moment();
    },

    getDataParam() {
 let s1 = moment(`${this.yesterdate}`).format("YYYY-MM-DDT");
      let e1= moment(`${this.todate}`).format("YYYY-MM-DDT");
      let s2 =  moment().format(`${this.yestertime}`);
      let e2=  moment().locale("th").format(`${this.totime}`);
      const username = this.username;
     const start_date =  s1+s2;
      const end_date = e1+e2;
      axios({
        method: "get",
        url: `${baseURL}/report/withdraw/?start_date=${start_date}&end_date=${end_date}&username=${username}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.depositreport = response.data.data;
          if (this.depositreport.length <= 0) {
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
      const z = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/report/withdraw/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.depositreport = response.data.data;
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
      const z = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/report/withdraw/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.depositreport = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getClipboard() {
      this.$toast.success("คัดลอก User สำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
    getClipboardBank() {
      this.$toast.info("คัดลอก เลขบัญชี สำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
     viewAnnotation(annotation) {
      if (annotation === null || annotation === "-") {
        annotation = "ยังไม่มีข้อมูล";
      }
      swal({ title: annotation, button: false, size:"8" });
    },
  },
};
</script>

<style>
</style>