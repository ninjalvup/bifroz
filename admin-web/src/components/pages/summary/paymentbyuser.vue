<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-list-alt"></i> รายงานการฝาก/ถอนตามบุคคล
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

                <div class="col-md-1.5">
                  <br />
                  <button
                    class="btn btn-primary btn-sm ml-1"
                    v-on:click.prevent="getDataParam()">
                    <i class="fas fa-search"></i>
                    ค้นหา
                  </button>
                  <button
                    class="btn btn-secondary btn-sm ml-1"
                    v-on:click.prevent="getYesterday()">
                    เมื่อวาน
                  </button>
                  <button
                    class="btn btn-warning btn-sm ml-1"
                    v-on:click.prevent="getToday()">
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
          <h4 class="card-title">รายงานการฝาก/ถอน</h4>
        </div>
        <div class="table-responsive">
          <table
            id="basic-datatables"
            class="display table table-striped table-hover"
          >
            <thead style="text-align: center" class="thead-custom">
              <tr class="table table-bordered"></tr>
              <tr class=" border">
                <th></th>
                <th>จำนวนผู้ใช้ : {{person_total}}</th>
                <th>{{ personDepositcount }}</th>
                <th>{{ personDepositamount | formatNumber}}</th>
                <th>{{ personWithdrawcount }}</th>
                <th>{{ personWithdrawreaamount | formatNumber}}</th>
                <th>
                  <div class="text-danger" v-if="profit_and_loss < 0">
                    {{ profit_and_loss | formatNumber}}
                  </div>
                  <div  class="text-success" v-if="profit_and_loss > 0">
                   + {{ profit_and_loss.toFixed()}}
                  </div>
                  
                </th>
              </tr>
              <tr>
                <th>#</th>
                <th>ชื่อผู้ใช้</th>
                <th>จำนวนครั้งที่เติม</th>
                <th>เติมทั้งหมด</th>
                <th>จำนวนครั้งที่ถอน</th>
                <th>ถอนทั้งหมด</th>
                <th>กำไรขาดทุนไม่รวมโบนัส</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(data, index) in byuser" v-bind:key="data.id">
                <td>{{index+1}}</td>
                <td class="text-primary" @click="getClipboard" v-clipboard:copy=" data.username"><strong><u>{{ data.username }}</u></strong></td>
                <td>{{ data.deposit_count }}</td>
                <td>


                  
                  {{ data.deposit_amount_total | formatNumber }}</td>
                <td>{{ data.Withdraw_count |integerNumber}}</td>
                <td>{{ data.Withdraw_amount_total | formatNumber }}</td>
                <td>
                  <div class="text-success" v-if="data.sum > '0'"> {{ data.sum | formatNumber }}</div>
                  <div class="text-danger" v-if="data.sum < '0'"> {{ data.sum | formatNumber }}</div>
                  <div class="text-info" v-if="data.sum == '0'"> {{ data.sum | formatNumber }}</div>


                 </td>
              </tr>
            </tbody>
            <tbody>
                 <tr v-if="byuser.length == '0'">
                      <td colspan="10" class="text-center text-danger">
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
      byuser: [],
      profit:'',
      person_total:'',
      personDepositcount: "",
      personWithdrawcount:'',
      personDepositamount:'',
      personWithdrawreaamount:'',
      profit_and_loss :'',
    };
  },
  async mounted() {
    
// swal("อยู่ระหว่างการพัฒนา!", "", "warning").then(() => {
//         this.$router.push("/home");

// })
    this.moment();
    this.yesterdate = moment()
      .locale("th")
      .format("YYYY-MM-DD");
    this.yestertime = moment()
      .locale("th")
      .subtract(1, "days")
      .format("00:00:00");
    this.todate = moment()
      .locale("th")
      .format("YYYY-MM-DD");
    this.totime = moment()
      .locale("th")
      .format("23:59:59");
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
    // const z = ".000Z";
    const start_date = this.todaydate + t + this.todaytime ;
    const end_date = this.todaydate + t + this.todaytime2 ;

    await axios({
      method: "get",
      url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.byuser = response.data.reportPersonDe;
        this.person_total = response.data.sumperson.person_total;
        this.personDepositcount = response.data.sumperson.personDepositcount;
        this.personWithdrawcount = response.data.sumperson.personWithdrawcount;
        this.personDepositamount = response.data.sumperson.personDepositamount;
        this.personWithdrawreaamount = response.data.sumperson.personWithdrawreaamount
        this.profit_and_loss = response.data.sumperson.profit_and_loss;
        // console.log(this.byuser);
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "get",
      url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.byuser = response.data.reportPersonDe;
        this.person_total = response.data.sumperson.person_total;
        this.personDepositcount = response.data.sumperson.personDepositcount;
        this.personWithdrawcount = response.data.sumperson.personWithdrawcount;
        this.personDepositamount = response.data.sumperson.personDepositamount;
        this.personWithdrawreaamount = response.data.sumperson.personWithdrawreaamount
        this.profit_and_loss = response.data.sumperson.profit_and_loss;
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
    async getDataParam() {
      const t = "T";
      // const z = ".000Z";
      const start_date = this.yesterdate + t + this.yestertime ;
      const end_date = this.todate + t + this.totime ;
      await axios({
        method: "get",
        url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
        this.byuser = response.data.reportPersonDe;
        this.person_total = response.data.sumperson.person_total;
        this.personDepositcount = response.data.sumperson.personDepositcount;
        this.personWithdrawcount = response.data.sumperson.personWithdrawcount;
        this.personDepositamount = response.data.sumperson.personDepositamount;
        this.personWithdrawreaamount = response.data.sumperson.personWithdrawreaamount
        this.profit_and_loss = response.data.sumperson.profit_and_loss;
          // console.log(this.member);
          this.username = "";
          if (this.byuser.length <= 0) {
            this.$toast.error("ไม่มีข้อมูลในวันนี้", {
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
      // const z = ".000Z";
      const start_date = this.todaydate + t + this.todaytime ;
      const end_date = this.todaydate + t + this.todaytime2 ;
      axios({
        method: "get",
        url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
        this.byuser = response.data.reportPersonDe;
        this.person_total = response.data.sumperson.person_total;
        this.personDepositcount = response.data.sumperson.personDepositcount;
        this.personWithdrawcount = response.data.sumperson.personWithdrawcount;
        this.personDepositamount = response.data.sumperson.personDepositamount;
        this.personWithdrawreaamount = response.data.sumperson.personWithdrawreaamount
        this.profit_and_loss = response.data.sumperson.profit_and_loss;
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
      // const z = ".000Z";
      const start_date = this.todaydate + t + this.todaytime ;
      const end_date = this.todaydate + t + this.todaytime2 ;
      axios({
        method: "get",
        url: `${baseURL}/report/person/?start_date=&end_date=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
        this.byuser = response.data.reportPersonDe;
        this.person_total = response.data.sumperson.person_total;
        this.personDepositcount = response.data.sumperson.personDepositcount;
        this.personWithdrawcount = response.data.sumperson.personWithdrawcount;
        this.personDepositamount = response.data.sumperson.personDepositamount;
        this.personWithdrawreaamount = response.data.sumperson.personWithdrawreaamount
        this.profit_and_loss = response.data.sumperson.profit_and_loss;
        })
        .catch((error) => {
          console.log(error);
        });
      axios({
        method: "get",
        url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
        this.byuser = response.data.reportPersonDe;
        this.person_total = response.data.sumperson.person_total;
        this.personDepositcount = response.data.sumperson.personDepositcount;
        this.personWithdrawcount = response.data.sumperson.personWithdrawcount;
        this.personDepositamount = response.data.sumperson.personDepositamount;
        this.personWithdrawreaamount = response.data.sumperson.personWithdrawreaamount
        this.profit_and_loss = response.data.sumperson.profit_and_loss;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>