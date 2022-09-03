<template>
  <div id="report_depositcreate_list">
    <div class="page-inner">
      <div class="page-header">
        <br />
        <h4 class="page-title">
          <i class="fa fa-book mr-1 ml-1" aria-hidden="true"></i
          >รายงานการสร้างรายการฝาก
        </h4>
      </div>
      <div class="page-body">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-2">
                    <label for="datetime">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      จากวันที่</label
                    >
                    <VueCtkDateTimePicker
                      :only-date="true"
                      v-model="todate"
                      format="YYYY-MM-DD"
                      formatted="DD-MM-YYYY"
                      :no-label="true"
                      Label="yesterday"
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
                    <label for="datetime">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      ถึงวันที่</label
                    >
                    <VueCtkDateTimePicker
                      :only-date="true"
                      v-model="yesterdate"
                      format="YYYY-MM-DD"
                      formatted="DD-MM-YYYY"
                      :no-label="true"
                      Label="today"
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
                    <label for="datetime">กรุณากรอกข้อมูลที่ต้องการ</label>
                    <input
                      class="form-control"
                      id="email2"
                      placeholder="ข้อมูลที่ต้องการค้นหา"
                      v-model="username"
                    />
                  </div>

                  <div class="col-md-1.5">
                    <label for="datetime"></label>
                    <br />
                    <button
                      class="btn btn-primary btn-sm ml-1"
                      v-on:click.prevent="getReportDepositList()"
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
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table
                id="basic-datatables"
                class="display table table-striped table-hover"
              >
                <thead style="text-align: center">
                  <tr>
                    <th>#</th>
                    <th>ข้อมูลลูกค้า</th>
                    <th>จำนวนเงิน</th>
                    <th>วันเวลาที่สร้าง</th>
                  </tr>
                </thead>
                <div></div>
                <tbody style="text-align: center">
                  <tr
                    v-for="(data, index) in depositlistTable"
                    v-bind:key="data.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <!-- <td class=" mt-1 mb-1">
  <div>{{data.member[0].sb_username}}</div>
  <div> {{data.member[0].member_account_banks[0].bank_account_name}}</div>
  <div> {{data.member[0].member_account_banks[0].bank_number}}</div>
</td> -->
                    <td>
                      <div class="avatar mt-3">
                        <img
                          :src="
                            require(`../../../assets/bank_icon/${data.member[0].member_account_banks[0].bank_name.toLowerCase()}.png`)
                          "
                          class="icon"
                          width="40"
                        />
                      </div>

                      <div>
                        <b>
                          <a
                            href="#/report_depositcreate_list"
                            @click="getClipboardBank"
                            v-clipboard:copy="
                              data.member[0].member_account_banks[0].bank_number
                            "
                            >{{
                              data.member[0].member_account_banks[0].bank_number
                            }}</a
                          ></b
                        >
                      </div>
                      <div class="">
                        {{
                          data.member[0].member_account_banks[0]
                            .bank_account_name
                        }}
                      </div>
                      <div>
                        <b>
                          <a
                            href="#/report_depositcreate_list"
                            @click="getClipboard"
                            v-clipboard:copy="data.member[0].sb_username"
                            >{{ data.member[0].sb_username }}</a
                          ></b
                        >
                      </div>
                    </td>
                    <td>{{ data.amount | formatCredit }}</td>
                    <td>{{ data.createdAt | formatDate }}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr v-if="depositlistTable.length == '0'">
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
    </div>
  </div>
</template>

<script>
import reportService from "@/services/reportService";
import moment from "moment-timezone";

export default {
  data() {
    return {
      depositlistTable: "",
      username: "",
      yesterdate: "",
      totime: "",
      todate: "",
      yestertime: "",
    };
  },
  methods: {
    async getReportDepositList() {
      let s1 = moment()
        .locale("th")
        .format(`${this.yesterdate}`);
      let e1 = moment()
        .locale("th")
        .format(`${this.todate}`);
      let s2 = moment()
        .locale("th")
        .format(`${this.yestertime}`);
      let e2 = moment()
        .locale("th")
        .format(`${this.totime}`);
      let username = this.username;
      const start_date = e1 + "T" + e2 + "";
      const end_date = s1 + "T" + s2 + "";
      const res = await reportService.getCreateDepositList(
        start_date,
        end_date,
        username
      );
      this.depositlistTable = res.data;
    },
    async getToday() {
      this.todaydate = moment()
        .locale("th")
        .format("YYYY-MM-DD");
      this.todaytime = moment()
        .locale("th")
        .format("00:00:00");
      this.todaytime2 = moment()
        .locale("th")
        .format("23:59:59");
      let username = "";
      const t = "T";

      const end_date = this.yesterdate + t + this.yestertime;
      const start_date = this.todate + t + this.totime;
      const res = await reportService.getCreateDepositList(
        start_date,
        end_date,
        username
      );
      this.depositlistTable = res.data;
      console.log(this.depositlistTable);
    },
    async getYesterday() {
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
      let username = "";
      const t = "T";

      const start_date = this.todaydate + t + this.todaytime;
      const end_date = this.todaydate + t + this.todaytime2;
      const res = await reportService.getCreateDepositList(
        start_date,
        end_date,
        username
      );
      this.depositlistTable = res.data;
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
  },
  mounted() {
    this.yesterdate = moment()
      .locale("th")
      .format("YYYY-MM-DD");
    this.totime = moment()
      .locale("th")
      .format("00:00:00");
    this.todate = moment()
      .locale("th")
      .format("YYYY-MM-DD");
    this.yestertime = moment()
      .locale("th")
      .format("23:59:59");
    this.getReportDepositList();
  },
};
</script>

<style></style>
