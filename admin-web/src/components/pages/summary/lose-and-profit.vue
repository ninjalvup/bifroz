<template>
  <div id="loseprofit">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title"><i class="fas fa-list-alt"></i> กำไรขาดทุน</h4>
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
                    v-on:click.prevent="getLoseProfit()"
                  >
                    <i class="fas fa-search"></i>
                    ค้นหา
                  </button>
                  <button
                    class="btn btn-secondary btn-sm ml-1"
                    v-on:click.prevent="getLoseProfitYesterday()"
                  >
                    เมื่อวาน
                  </button>
                  <button
                    class="btn btn-warning btn-sm ml-1"
                    v-on:click.prevent="getLoseProfitToday()"
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
          <h4 class="card-title text-white">รายการสรุปกำไรขาดทุน</h4>
        </div>
        <!-- <div class="alert alert-danger" role="alert">ยังไม่มีรายการ</div>       -->
        <div class="table-responsive">
          <table
            id="basic-datatables"
            class="display table table-striped table-hover table-bordered"
          >
            <thead style="text-align: center">
              <tr>
                <th>ฝาก</th>
                <th>โบนัส</th>
                <th>ฝาก+โบนัส</th>
                <th>ถอน</th>

                <th>กำไรขาดทุน</th>
              </tr>
            </thead>

            <tbody style="text-align: center">
              <tr>
                <td>
                  <div
                    class="text-info"
                    v-if="
                      reportPersonDeposit === null || reportPersonDeposit === 0
                    "
                  >
                    0
                  </div>
                  <div class="text-success" v-else>
                    <b>{{
                      reportPersonDeposit | formatNumber | formatCredit
                    }}</b>
                  </div>
                </td>
                <td>
                  <div
                    class="text-info"
                    v-if="
                      reportPersonDepositbonus === null ||
                        reportPersonDepositbonus === 0
                    "
                  >
                    0
                  </div>
                  <div class="text-success" v-else>
                    <b>
                      {{
                        reportPersonDepositbonus | formatNumber | formatCredit
                      }}</b
                    >
                  </div>
                </td>
                <!-- reportPersonDepositbonus -->
                <td>
                  <div
                    class="text-info"
                    v-if="sumbonus === null || sumbonus === 0"
                  >
                    0
                  </div>
                  <div class="text-success " v-else>
                    <b>{{ sumbonus | formatNumber | formatCredit }}</b>
                  </div>
                </td>
                <!-- reportPersonWithdrawrea -->
                <td>
                  <div
                    class="text-info"
                    v-if="
                      reportPersonWithdrawrea === null ||
                        reportPersonWithdrawrea === 0
                    "
                  >
                    0
                  </div>
                  <div class="text-danger" v-else>
                    <b>{{
                      reportPersonWithdrawrea | formatNumber | formatCredit
                    }}</b>
                  </div>
                </td>

                <!-- profitandloss -->
                <td>
                  <div
                    class="text-info "
                    v-if="profitandloss === null || profitandloss === 0"
                  >
                    0
                  </div>
                  <!-- <div  class="text-danger" v-else>
                    {{ profitandloss | formatNumber}}
                  </div> -->
                  <div class="text-success " v-if="profitandloss > 0">
                    <b>{{ profitandloss | formatNumber | formatCredit }}</b>
                  </div>
                  <div class="text-danger " v-if="profitandloss < 0">
                    <b>{{ profitandloss | formatNumber | formatCredit }}</b>
                  </div>
                  <div></div>
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
import reportService from "@/services/reportService";
import moment from "moment";
// import { baseURL } from "../../../services/api";
// import axios from "axios";
// import swal from 'sweetalert';

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

      profitandloss: "",
      reportPersonDeposit: "",
      reportPersonDepositbonus: "",
      reportPersonWithdrawrea: "",
      sumbonus: "",

      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
    };
  },
  mounted() {
    this.getLoseProfit();

    // swal("อยู่ระหว่างการพัฒนา!", "", "warning").then(() => {
    //         this.$router.push("/home");

    // })

    this.yesterdate = moment()
      .locale("th")
      .format("YYYY-MM-DD");
    this.yestertime = moment()
      .locale("th")
      .format("00:00:00");
    this.todate = moment()
      .locale("th")
      .format("YYYY-MM-DD");
    this.totime = moment()
      .locale("th")
      .format("23:59:59");
    // let abc = this.yesterdate + "T" + this.yestertime;
    // let bbd = this.todate + "T" + this.totime;
    //  const res =  reportService.getReportByProfitLoss(abc, bbd);
    //   console.log(res.data);
    //   this.loseandprofit = res.data.loseandprofit;
    //   this.profitandloss = res.data.profitandloss;
    //   this.reportPersonDeposit = res.data.reportPersonDeposit;
    //   this.reportPersonDepositbonus = res.data.reportPersonDepositbonus;
    //   this.reportPersonWithdrawrea = res.data.reportPersonWithdrawrea;
    //   this.sumbonus = res.data.sumbonus;
  },

  methods: {
    async getLoseProfit() {
      // this.moment();
      this.yesterdate = moment()
        .locale("th")
        .format(`${this.yesterdate}`);
      this.yestertime = moment()
        .locale("th")
        .format(`${this.yestertime}`);
      this.todate = moment()
        .locale("th")
        .format(`${this.todate}`);
      this.totime = moment()
        .locale("th")
        .format(`${this.totime}`);
      let a = this.yesterdate + "T" + this.yestertime;
      let b = this.todate + "T" + this.totime;
      const res = await reportService.getReportByProfitLoss(a, b);
      // console.log(res.data);
      this.loseandprofit = res.data.loseandprofit;
      this.profitandloss = res.data.profitandloss;
      this.reportPersonDeposit = res.data.reportPersonDeposit;
      this.reportPersonDepositbonus = res.data.reportPersonDepositbonus;
      this.reportPersonWithdrawrea = res.data.reportPersonWithdrawrea;
      this.sumbonus = res.data.sumbonus;
    },
    async getLoseProfitYesterday() {
      this.moment();
      this.aa = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.ee = moment()
        .locale("th")
        .format("23:59:59");
      this.rr = moment()
        .locale("th")
        .format("00:00:00");
      let a = this.aa + "T" + this.ee;
      let b = this.aa + "T" + this.rr;
      const res = await reportService.getReportByProfitLoss(a, b);
      // console.log(res.data);
      this.loseandprofit = res.data.loseandprofit;
      this.profitandloss = res.data.profitandloss;
      this.reportPersonDeposit = res.data.reportPersonDeposit;
      this.reportPersonDepositbonus = res.data.reportPersonDepositbonus;
      this.reportPersonWithdrawrea = res.data.reportPersonWithdrawrea;
      this.sumbonus = res.data.sumbonus;
    },
    async getLoseProfitToday() {
      this.moment();
      this.ss = moment()
        .locale("th")
        .format("YYYY-MM-DD");
      this.yy = moment()
        .locale("th")
        .format("23:59:59");
      this.dd = moment()
        .locale("th")
        .format("YYYY-MM-DD");
      this.uu = moment()
        .locale("th")
        .format("00:00:00");
      let a = this.ss + "T" + this.uu;
      let b = this.dd + "T" + this.yy;
      const res = await reportService.getReportByProfitLoss(a, b);
      // console.log(res.data);
      this.loseandprofit = res.data.loseandprofit;
      this.profitandloss = res.data.profitandloss;
      this.reportPersonDeposit = res.data.reportPersonDeposit;
      this.reportPersonDepositbonus = res.data.reportPersonDepositbonus;
      this.reportPersonWithdrawrea = res.data.reportPersonWithdrawrea;
      this.sumbonus = res.data.sumbonus;
    },
  },
};
</script>

<style></style>
