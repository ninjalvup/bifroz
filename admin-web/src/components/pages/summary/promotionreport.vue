<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-list-alt"></i> สรุปโปรโมชัน
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="card">
        <!-- <div class="card-header">สรุปโปรโมชัน</div> -->
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
                    v-on:click.prevent="getSummaryPromotion()"
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
        <div class="card-header bg-primary">
          <h4 class="card-title text-white ">รายการสรุปโปรโมชัน</h4>
        </div>
<!-- <div class="alert alert-danger" role="alert">ยังไม่มีรายการ</div>       -->
<div class="table-responsive">
          <table
            id="basic-datatables"
            class="display table table-striped table-hover table-bordered"
          >
            <thead style="text-align: center" class="thead-custom">
              <tr class=" border">
                <th colspan="2">ยอดรวมทั้งหมด </th>
                <th style="text-align: right">
                  <div > <span class="text-success">{{bonus_total}}</span> บาท </div>
                  <!-- <div v-if="bonus_total.length === 0">0 บาท</div> -->

                  </th>
                
              </tr>
              <tr>
                <th>ชื่อโปรโมชั่น</th>
                <th>จำนวนครั้ง</th>
                <th class="text-right">จำนวนโบนัส</th>

              
              </tr>
            </thead>
            <tbody class="text-center" style="text-align: center">
         <tr v-for="data in promo" :key="data.uuid">
            <td>{{data.promotionName}}</td>
            <td>{{data.count_total}}</td>
            <td style="text-align: right" class="text-success">{{data.bonus_total}}</td>

         </tr>
            </tbody>
 <tbody>
                  <tr v-if="this.promo.length ===0">
                    <td colspan="3" class="text-center text-danger">
                      <i class="fas fa-times"></i>
                      ไม่มีข้อมูล ! เลือกวันที่เพื่อค้นหา
                    </td>
                  </tr>
                </tbody>          </table>
        </div>
</div>
    </div>
  </div>
</template>

<script>
import reportService from "@/services/reportService";
import moment from "moment";
// import { baseURL } from '../../../services/api';
// import swal from 'sweetalert';
// import axios from "axios";
export default {
  data() {
    return {
      bonus_total:'',
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
      promo: [],
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
    };
  },
  mounted() {
    
// swal("อยู่ระหว่างการพัฒนา!", "", "warning").then(() => {
//         this.$router.push("/home");

// })
 this.yesterdate = moment().locale("th").format("YYYY-MM-DD");
    this.yestertime = moment().locale("th").format("00:00:00");
    this.todate = moment().locale("th").format("YYYY-MM-DD");
    this.totime = moment().locale("th").format("23:59:59");
//       let abc = this.yesterdate + "T" + this.yestertime;
//       let bbd = this.todate + "T" + this.totime;
//      const res =  reportService.summaryPromotionAPI(abc, bbd);
//       this.promo = res.data.reportP;
//       console.log(this.promo);
    this.getSummaryPromotion();
  },

  methods: {
async getSummaryPromotion(){
  this.yesterdate = moment().locale("th").format(`${this.yesterdate}`);
      this.yestertime = moment().locale("th").format(`${this.yestertime}`);
      this.todate = moment().locale("th").format(`${this.todate}`);
      this.totime = moment().locale("th").format(`${this.totime}`);
      let a = this.yesterdate + "T" + this.yestertime;
      let b = this.todate + "T" + this.totime;
  const res = await reportService.summaryPromotionAPI(a,b);
  this.promo =res.data;
  this.bonus_total =res.sumbonus;
},

   async getToday() {
     this.todaydate = moment().locale("th").format("YYYY-MM-DDT");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const start_date = this.todaydate+   this.todaytime ;
      const end_date = this.todaydate + this.todaytime2 ;
      const res = await reportService.summaryPromotionAPI(start_date, end_date);
  this.promo =res.data;
  this.bonus_total =res.sumbonus;
  // console.log(this.promo);

    },
  async  getYesterday() {
       this.todaydate = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const start_date = this.todaydate + t + this.todaytime;
      const end_date = this.todaydate + t + this.todaytime2;
          const res = await reportService.summaryPromotionAPI(start_date, end_date);
  this.promo =res.data;
  this.bonus_total =res.sumbonus;

    },
  },
};
</script>
