<template>
  <div id="withdraw-affiliate">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-hand-holding-usd"></i> รายงานการถอนค่าแนะนำเพื่อน
        </h4>
      </div>
      <div class="col-md-12" style="padding: 0px 0px 0px 0px">
        <div class="card">
          <div class="card-body">
            <form v-on:submit.prevent="seachData">
              <div class="row">
                <div class="col-md-2">
                  <label for="datetime"><i class="fa fa-calendar" aria-hidden="true"></i> จากวันที่</label>
                  <VueCtkDateTimePicker
                    :only-date="true"
                    v-model="formSearch.todate"
                    format="YYYY-MM-DD"
                    formatted="DD-MM-YYYY"
                    :no-label="true"
                    Label="yesterday"
                  />
                </div>
                <div class="col-md-1">
                  <label for="datetime"><i class="fa fa-clock-o" aria-hidden="true"></i> เวลา</label>
                  <VueCtkDateTimePicker
                    v-model="formSearch.totime"
                    :only-time="true"
                    format="HH:mm:ss"
                    formatted="HH:mm"
                    :no-label="true"
                    label="Time"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime"><i class="fa fa-calendar" aria-hidden="true"></i> ถึงวันที่</label>
                  <VueCtkDateTimePicker
                    :only-date="true"
                    v-model="formSearch.yesterdate"
                    format="YYYY-MM-DD"
                    formatted="DD-MM-YYYY"
                    :no-label="true"
                    Label="today"
                  />
                </div>
                <div class="col-md-1">
                  <label for="datetime"><i class="fa fa-clock-o" aria-hidden="true"></i> เวลา</label>
                  <VueCtkDateTimePicker
                    v-model="formSearch.yestertime"
                    :only-time="true"
                    format="HH:mm:ss"
                    formatted="HH:mm"
                    :no-label="true"
                    label="Time"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">กรุณากรอกยูสลูกค้าที่ต้องการ</label>
                  <input class="form-control" placeholder="ยูสลูกค้าที่ต้องการค้นหา" v-model="formSearch.username" />
                </div>

                <div class="col-md-1.5" style="margin-top: 2%;">
                  <button class="btn btn-primary btn-sm ml-1" >
                    <i class="fa fa-search" aria-hidden="true"></i> ค้นหา
                  </button>
                  <a class="btn btn-secondary btn-sm ml-1" style="color: white" v-on:click="fnGetDate(0)" >
                    เมื่อวาน
                  </a>
                  <a class="btn btn-warning btn-sm ml-1" v-on:click="fnGetDate(1)" >
                    วันนี้
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="card">
          <div class=" table-responsive">
            <table class="display table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th colspan="3" class="text-right">รายการถอนทั้งหมด (x)</th>
                  <th>ยอดเงินถอน (x)</th>
                  <th colspan="6"></th>
                </tr>
                <tr class=" border text-center">
                  <th>#</th>
                  <th>ชื่อผู้ใช้</th>
                  <th>ยอดรายได้</th>
                  <th>ยอดถอนรายได้</th>
                  <th>วันที่ถอน</th>
                  <th>สถานะ</th>
                  <th>ทำโดย</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center" v-for="(data, index) in listTable" v-bind:key="data.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ data.username }}</td>
                  <td>{{ data.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</td>
                  <td>{{ data.credit_before }}</td>
                  <td>{{ data.bank_time }}</td>
                  <td v-if="data.transaction_status === 'Approve'">
                    <span class="badge badge-warning">รออนุมัติ</span>
                  </td>
                  <td v-else>
                    <span class="badge badge-success">สำเร็จ</span>
                  </td>
                  <td>{{ data.create_by }}</td>
                </tr>
              </tbody>
              <tbody>
                <tr v-if="listTable.length == '0'">
                  <td colspan="7" class="text-center text-danger">
                    <i class="fas fa-times"></i> ไม่มีข้อมูล !
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";
import affiliateService from "@/services/affiliateService";

export default {
  data() {
    return {
      formSearch: {
        yesterdate: "",
        yestertime: "",
        totime: "",
        todate: "",
        username: ""
      },
      listTable: []
    };
  },
  mounted() {
    this.formSearch.yesterdate = moment().locale("th").format("YYYY-MM-DD");
    this.formSearch.totime = moment().locale("th").format("00:00:00");
    this.formSearch.todate = moment().locale("th").format("YYYY-MM-DD");
    this.formSearch.yestertime = moment().locale("th").format("23:59:59");
  },
  methods: {
    async seachData() {
      const res = await affiliateService.getSearchData(this.formSearch);
      this.listTable = res.data
    },
    async fnGetDate(val) { // 1 วันปัจจุบัน, 0 เมื่อวาน
      const res = await affiliateService.getSearchDataFn(val);
      this.listTable = res.data
    }
  }
};
</script>
