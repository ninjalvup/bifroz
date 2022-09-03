<template>
  <div id="User">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-list-alt" aria-hidden="true"></i>
          รายการถอนที่อนุมัติแล้ว
        </h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col">
                  <h3 class="card-title">ข้อมูลการอนุมัติแล้ว: การถอน</h3>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-2">
                        <label for="datetime">จากวันที่</label>
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
                        <label for="datetime">เวลา</label>
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
                        <label for="datetime">ถึงวันที่</label>
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
                        <label for="datetime">เวลา</label>
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
                        <label for="datetime">กรุณากรอกข้อมูลที่ต้องการ</label>
                        <input
                          class="form-control"
                          id="email2"
                          placeholder="ข้อมูลที่ต้องการค้นหา"
                          v-model="username"
                        />
                      </div>
                      <div class="col-md-1.5">
                        <label for="datetime">ตัวเลือก</label>
                        <br />
                        <button
                          class="btn btn-primary btn-sm ml-1"
                          v-on:click.prevent="getDataParam()"
                        >
                          <!-- v-on:click.prevent="getDataParam()" 
                    v-on:click.prevent="getRange()"
                    -->
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
            <div class="card-body">
              <div class="table-responsive">
                <table
                  id="basic-datatables"
                  class="display table table-striped table-hover"
                >
                  <thead style="text-align: center">
                    <tr>
                      <th>ธนาคาร</th>
                      <th>ชื่อผู้ใช้</th>
                      <th>ยอดเงิน</th>
                      <th>โบนัส</th>
                      <th>ประเภท</th>
                      <th>เครดิตก่อนเติม</th>
                      <th>เครดิตหลังเติม</th>
                      <th>ทำรายการโดย</th>
                      <th>หมายเหตุ</th>
                      <th>Ref.</th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody style="text-align: center">
                    <tr v-for="data in withdrawpending" v-bind:key="data.uuid">
                      <td>
                        <div class="avatar mt-3">
                          <img
                            :src="
                              require(`../../../assets/bank_icon/${data.member_account_banks[0].bank_name.toLowerCase()}.png`)
                            "
                            class="icon"
                            width="40"
                          />
                        </div>
                        <div>
                          <b>
                            <a
                              href="#/withdrawapproved"
                              @click="getClipboardBank"
                              v-clipboard:copy="
                                data.member_account_banks[0].bank_number
                              "
                              >{{ data.member_account_banks[0].bank_number }}</a
                            ></b
                          >
                        </div>
                        <div>
                          {{ data.member_account_banks[0].bank_account_name }}
                        </div>
                      </td>
                      <td>
                        <b>
                          <a
                            href="#/withdrawapproved"
                            @click="getClipboard"
                            v-clipboard:copy="data.username"
                            >{{ data.username }}</a
                          ></b
                        >
                      </td>
                      <td>{{ data.amount | formatCredit }}</td>
                      <td>{{ data.bonus_credit }}</td>
                      <td>
                        <div v-if="data.transaction_type == '1'">
                          <span class="badge badge-info">การฝาก</span>
                        </div>
                        <div v-if="data.transaction_type == '2'">
                          <span class="badge badge-warning">การถอน</span>
                        </div>
                      </td>
                      <td>{{ data.credit_before | formatCredit }}</td>
                      <td>{{ data.credit_after | formatCredit }}</td>
                      <td>{{ data.create_by }}</td>
                      <td>{{ data.annotation }}</td>
                      <td>{{ data.ref }}</td>
                      <td>
                        <div v-if="data.transaction_status == '1'">
                          <span class="badge badge-success">อนุมัติแล้ว</span>
                        </div>
                        <div v-if="data.transaction_status == '2'">
                          <span class="badge badge-warning">ไม่ได้อนุมัติ</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr v-if="withdrawpending.length == '0'">
                      <td colspan="14" class="text-center text-danger">
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
  </div>
</template>

<script>
import managewithdrawService from "@/services/managewithdrawService";
import { baseURL } from '../../../services/api';

const url = "${baseURL}/member_transaction";
import axios from "axios";
const moment = require("moment");
export default {
  data() {
    return {
      datetime: "",
      true: true,
      false: false,
      bank: "",
      username: "",
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
      withdrawpending: [],
      withdrawbyuuid: [],
      credit: "",
      amountuuid: "",
      usernameuuid: "",
      form: {},
      todaydate: "",
      todaytime: "",
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
    };
  },
  mounted() {
    this.getWithdrawApproved();
  },
  methods: {
    async getWithdrawApproved() {
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
      await axios({
        method: "get",
        url: `${baseURL}/member_transaction/withdraw-approved-list/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.withdrawpending = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getShowWithdrawByUuid(uuid) {
      const res = await managewithdrawService.getWithdrawByUuid(uuid);
      this.withdrawbyuuid = res.data;
      this.amountuuid = res.data.withdraw.amount;
      this.credit = res.data.current_credit.credit;
      this.usernameuuid = res.data.withdraw.username;
    },
    checkClicked() {
      this.$confirm("ยืนยันการทำรายการ").then(() => {
        this.postAccept();
      });
    },

    async postAccept() {
      await axios
        .post(url + "/approved-withdraw", this.withdrawbyuuid.withdraw, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          this.$toast.success("สมัครเรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
          //Perform Success Action
        });
    },

    getDataParam() {
      const t = "T";
      const z = ".000Z";
      const username = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      axios({
        method: "get",
        url: `${baseURL}/member_transaction/withdraw-approved-list/?start_date=${start_date}&end_date=${end_date}&username=${username}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.withdrawpending = response.data.data;
          if (this.withdrawpending.length <= 0) {
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
        url: `${baseURL}/member_transaction/withdraw-approved-list/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.withdrawpending = response.data.data;
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
        url: `${baseURL}/member_transaction/withdraw-approved-list/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.withdrawpending = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getClipboardBank() {
      this.$toast.info("คัดลอก เลขบัญชี สำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
    getClipboard() {
      this.$toast.success("คัดลอก User สำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
  },
};
</script>
