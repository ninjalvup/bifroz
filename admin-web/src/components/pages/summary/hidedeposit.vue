<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-list-alt"></i> รายการฝากที่ถูกซ่อน
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="card">
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
                    v-on:click.prevent="getHideList()"
                  >
                    <i class="fas fa-search"></i>
                    ค้นหา
                  </button>
                  <button
                    class="btn btn-secondary btn-sm ml-1"
                    v-on:click.prevent="getHideListYesterday()"
                  >
                    เมื่อวาน
                  </button>
                  <button
                    class="btn btn-warning btn-sm ml-1"
                    v-on:click.prevent="getHideListToday()"
                  >
                    วันนี้
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <ul
            class="ml-4 mr-4 nav nav-pills nav-secondary nav-pills-no-bd"
            id="pills-tab-without-border"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                id="pills-home-tab-nobd"
                data-toggle="pill"
                href="#pills-home-nobd"
                role="tab"
                aria-controls="pills-home-nobd"
                aria-selected="true"
                >ระบบออโต้</a
              >
            </li>
          </ul>
      <div class=" col-md-6 ">
        <div class="card-header bg-primary ">
          <h4 class="card-title text-white">รายการเดินบัญชี</h4>
        </div>
        <div class="card-body col-md-12">
         
          <div
            class="tab-content mt-2 mb-3"
            id="pills-without-border-tabContent"
          >
            <div
              v-for="data in hiddentable"
              v-bind:key="data.id"
              class="tab-pane fade show active card card-body mb-2 mt-2"
              style="border: #fe0000"
              id="pills-home-nobd"
              role="tabpanel"
              aria-labelledby="pills-home-tab-nobd"
            >
              <div class="panel-body page-main-body-transaction mt-2 mr-2 ml-2">
                <table class="table table-striped" style="">
                  <tbody>
                    <tr
                      style="
                        color: black;
                        border: solid 0px #c1c1c1;
                        height: 70px;
                        background-color: #ffffff;
                      "
                    >
                      <td style="width: 55px">
                        <img
                          :src="
                            require(`../../../assets/bank_icon/${data.bank_tranfer.toLowerCase()}.png`)
                          "
                          alt
                          class="icon ml-3"
                          width="40"
                          height="40"
                        />
                      </td>
                      <td style="width: 430px">
                        {{ data.sms_content }}
                        <br />
                        <!-- <small ><i class="fa fa-clock-o"></i>{{data.tel}} -->
                        <!-- </small> -->
                        <br />
                        {{ data.bank_date }} {{ data.bank_time }}
                        <br />
                        <b></b>
                      </td>
                      <td>
                        <small>ช่องทาง</small>
                        <br />
                        <b>SMS</b>
                      </td>
                      <td>
                        <small>จำนวนเงิน</small>
                        <br />
                        <b class="badge badge-secondary">
                          {{ data.amount }}
                        </b>
                      </td>
                      <!-- ngIf: user.position !== 'STAFF' -->
                      <td class="text-right">
                        <!-- <button class="btn btn-default btn-secondary btn-sm mt-1 mb-1" ><i class="fa fa-check"></i> เติม</button>
                                                <div style="padding: 2px;"></div>
                                                <button class="btn btn-primary btn-sm mt-1 mb-1" ><i class="fa fa-times"></i> ซ่อน</button> -->
                        <!-- <div v-if="data.title.toLowerCase() != 'truemoney'">
                  <button
                    class="btn btn-secondary ml-3 mt-2 mb-2 mr-3 btn-sm text-white float-right"
                    data-toggle="modal"
                    data-target="#postCurl"
                    v-on:click.prevent="getSMSByUUID(data.uuid)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </button>
                </div> -->
                        <!-- <div v-if="data.title.toLowerCase() === 'truemoney'">
                  <button
                    class="btn btn-secondary ml-3 mr-3 btn-sm text-white float-right"
                    data-toggle="modal"
                    data-target="#postTrue"
                    v-on:click.prevent="getTruemoneyID(data.uuid)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </button>
                </div> -->
                        <button
                          v-on:click.prevent="postSMSBack(data.uuid)"
                          class="btn btn-info btn-sm mr-3 mt-1 mb-1 text-white float-right"
                        >
                          นำกลับ
                        </button>
                      </td>
                      <!-- end ngIf: user.position !== 'STAFF' -->
                    </tr>
                    <!-- end ngIf: i.bankName == 'SCB' -->
                  </tbody>
                </table>
                <!-- end ngRepeat: i in result -->
              </div>
            </div>
            <div v-if="hiddentable.length=='0'">
             <div class="alert alert-danger mt-4 mb-3" role="alert">
          ไม่มีข้อมูลรายการเดินบัญชีที่ถูกซ่อน
        </div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reportService from "@/services/reportService";
import smsService from "@/services/smsService";

// import { baseURL } from "../../../services/api";
import moment from "moment";
// import axios from "axios";

export default {
  data() {
    return {
      hiddentable: [],
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
    };
  },
  mounted() {
   
    this.yesterdate = moment().locale("th").format("YYYY-MM-DD");
    this.yestertime = moment().locale("th").format("00:00:00");
    this.todate = moment().locale("th").format("YYYY-MM-DD");
    this.totime = moment().locale("th").format("23:59:59");
      
this.getHideList();

  },

  methods: {
    async getHideList() {
      this.yesterdate = moment().locale("th").format(`${this.yesterdate}`);
      this.yestertime = moment().locale("th").format(`${this.yestertime}`);
      this.todate = moment().locale("th").format(`${this.todate}`);
      this.totime = moment().locale("th").format(`${this.totime}`);
      let a = this.yesterdate + "T" + this.yestertime;
      let b = this.todate + "T" + this.totime;
      const res = await reportService.getReportHideList(a, b);
      this.hiddentable = res.data;
    },
    
      async getHideListYesterday() {
      this.todaydate = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const start_date = this.todaydate + t + this.todaytime;
      const end_date = this.todaydate + t + this.todaytime2;
      const res = await reportService.getReportHideList(start_date, end_date);
      this.hiddentable = res.data;
    },

      async getHideListToday() {
     this.todaydate = moment().locale("th").format("YYYY-MM-DDT");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const start_date = this.todaydate+   this.todaytime ;
      const end_date = this.todaydate + this.todaytime2 ;
      const res = await reportService.getReportHideList(start_date, end_date);
      this.hiddentable = res.data;
    },
    async postSMSBack(uuid) {
      const res = await smsService.postHiddenBack(uuid);
      // console.log(res);
      this.getHideList();
      res.post
    },
  },
};
</script>
