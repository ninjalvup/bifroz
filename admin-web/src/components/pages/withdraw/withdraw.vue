<template>
  <div id="User">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title"><i class="fas fa-coins"></i> หน้าถอนเงิน</h4>
      </div>
      <div class="row">
        <!-- <div class="col-md-3"></div> -->
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="card-body">
                <form
                  class="form-inline justify-content-center"
                  v-on:submit.prevent="getUserByUsername"
                >
                  <div class="form-group">
                    <label for="email2 ">
                      Username :
                      <span class="required-label">*</span>
                    </label>
                    <input
                      class="form-control ml-4"
                      id="email2"
                      placeholder="Username"
                      v-model="sb_username"
                      required
                    />

                    <button class="btn btn-info ml-2">
                      <i class="fa fa-search" aria-hidden="true"></i>
                      ค้นหา
                    </button>
                  </div>
                </form>
              </div>

              <div class="column">
                <div class="row">
                  <div class="card-body">
                    <h4>ชื่อ - นามสกุล</h4>
                    <input
                      disabled
                      type="text"
                      class="form-control"
                      aria-describedby="helpId"
                      v-model="thisname"
                    />
                  </div>
                  <div class="card-body">
                    <h4>หมายเลขโทรศัพท์</h4>
                    <input
                      disabled
                      type="text"
                      class="form-control"
                      aria-describedby="helpId"
                      v-model="thistel"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="card-body">
                    <h4>ธนาคาร</h4>
                    <input
                      disabled
                      type="text"
                      class="form-control"
                      aria-describedby="helpId"
                      v-model="thisbank"
                    />
                  </div>
                  <div class="card-body">
                    <h4>เลขบัญชี</h4>
                    <input
                      disabled
                      type="text"
                      class="form-control"
                      aria-describedby="helpId"
                      v-model="thisbanknumber"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="card-body">
                    <h4>เครดิตปัจจุบัน</h4>
                    <input
                      disabled
                      type="text"
                      class="form-control"
                      aria-describedby="helpId"
                      v-model="thiscredit"
                    />
                  </div>
                  <div class="card-body">
                    <form v-on:submit.prevent="checkcomfirm">
                      <div class="form-group">
                        <label for="input">
                          จำนวนเงินที่จะถอน :
                          <span class="required-label">*</span>

                          <input
                            type="number"
                            class="form-control"
                            id="input"
                            placeholder="จำนวนเงิน"
                            v-model="inputwithdraw"
                            required
                            disabled
                          />
                        </label>
                        <button class="btn btn-secondary ml-2">
                          <i class="fa fa-check" aria-hidden="true"></i>
                          ยืนยัน
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="table-responsive">
              <table
                id="basic-datatables"
                class="display table table-bordered table-striped"
              >
                <thead style=" table-bordered text-align:center">
                  <tr style="text-align: center">
                    <th>Turn Type</th>
                    <th>ยอดเทิร์น</th>
                    <th>ยอดเครดิตที่ลูกค้าต้องทำ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="text-align: center">
                    <td>
                      <div v-if="this.turnover.turn_type == '1'">
                        <span class="badge badge-primary">Turn WIN</span>
                      </div>
                      <div v-if="this.turnover.turn_type == '2'">
                        <span class="badge badge-warning">Turn OVER</span>
                      </div>
                      <div v-if="this.turn_type === 0">
                        <h5>ไม่มีเทิร์น</h5>
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-info">{{ this.turngoal }}</span>
                    </td>
                    <td>
                      <div v-if="this.creditgoal == 'NaN'">
                        <span class="badge badge-info">-</span>
                      </div>
                      <div v-if="this.creditgoal != 'NaN'">
                        <span class="badge badge-danger">{{
                          this.creditgoal | formatNumber
                        }}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4>รายการฝากล่าสุด 20 รายการ</h4>
        </div>
        <div class="table-responsive">
          <table
            id="basic-datatables"
            class="display table table-striped table-hover table-bordered"
          >
            <thead style="text-align: center">
              <tr>
                <th>เงินฝาก</th>
                <th>โบนัส</th>
                <th>เครดิตก่อนเติม</th>
                <th>เครดิตหลังเติม</th>
                <th>เวลา</th>
                <th>หมายเหตุ</th>
                <th>Ref</th>
              </tr>
            </thead>
            <tbody style="text-align: center table-bordered">
              <tr
                v-for="data in lasttwenty"
                v-bind:key="data.index"
                style="text-align: center"
              >
                <td>{{ data.amount | formatNumber }}</td>
                <td>
                  <span class="badge badge-info">{{ data.bonus_credit }}</span>
                </td>
                <td>
                  <span class="badge badge-warning">
                    {{ data.credit_before | formatNumber }}</span
                  >
                </td>
                <td>
                  <span class="badge badge-success">
                    {{ data.credit_after | formatNumber }}</span
                  >
                </td>
                <td>{{ data.bank_time }}</td>
                <td v-if="data.annotation === ''">-</td>
                <td v-else>{{ data.annotation }}</td>
                <td>{{ data.ref }}</td>
              </tr>
            </tbody>
            <tbody>
              <tr v-if="lasttwenty.length == '0'">
                <td colspan="7" class="text-center text-danger">
                  <i class="fas fa-times"></i>
                  กรอกชื่อผู้ใช้เพื่อค้นหาข้อมูล!
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
import UserService from "@/services/UserService";
import swal from "sweetalert";
import Swal from "sweetalert2";

var numeral = require("numeral");
import { baseURL } from "../../../services/api";

import withdrawService from "@/services/withdrawService";
import axios from "axios";
const moment = require("moment");

export default {
  data() {
    return {
      user: "",
      val: 0.0,
      turn_type: "",
      userdata: [],
      sb_username: "",
      thisname: "",
      thistel: "",
      thisbank: "",
      thisbanknumber: "",
      thiscredit: "",
      inputwithdraw: 0.0,
      withdraw: {},
      rusult: "",
      input: "",
      uuid: "",
      memberTable: [],
      lasttwenty: [],
      thisusername: "",
      thislastref: "",
      winlost: [],
      turnover: [],
      last_deposit: [],
      creditgoal: "",
      turngoal: "",
    };
  },

  mounted() {
    this.checkAuth();
  },
  methods: {
    async checkAuth() {
       await UserService.getProfile()
        .then((res) => {
          this.user = res.data.username;
        })
        .catch(function (error) {
          if (error.response.status === 401 || error.response.status === 500) {
            const removeToken = localStorage.removeItem("access_token");
            if (removeToken == null) {
              this.$router.push("/login");
            }
          }
        });

    },
    async getUserByUsername() {
      let timerInterval;
      Swal.fire({
        title: "กรุณารอสักครู่",
        // text: "ประมาณ 1 - 2 นาที",
        icon: "warning",

        html: " ประมาน <b></b> นาที.",
        timer: 2345,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,

        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector("b");
              let ms = Swal.getTimerLeft();
              let minutes = Math.floor(ms / 60000);
              let seconds = ((ms % 60000) / 1000).toFixed(0);
              if (b) {
                b.textContent = `${minutes}:${
                  seconds < 10 ? "0" : ""
                }${seconds}`;
              }
            }
          }, 1000);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then(async (result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          //
        }
      });
      const username = this.sb_username;
      const res = await withdrawService.getCheckByUsername(username)
        .catch((error) => {
          this.sb_username = "";
          error.res;
          swal("ไม่พบข้อมูลการฝาก!", "", "warning");
          this.sb_username = "";
          this.thisname = "";
          this.thistel = "";
          this.thiscredit = "";
          this.thisbank = "";
          this.thisbanknumber = "";
          this.lasttwenty = "";
          this.winlost = "";
          this.list_play = "";
          this.inputwithdraw = "";
        });
      console.log(res);


      this.bankforwithdraw = res.info.uuid;
      this.thisname = res.info.bank_account_name;
      this.thisbank = res.info.bank_name;
      this.thistel = res.info.tel;
      this.thisbanknumber = res.info.bank_number;
      // this.thiscredit = "";
      // this.lasttwenty = "";

      this.lasttwenty = res.deposit_latest;
      this.affiliateaember = res.affiliateMember;
      this.countmemberaffiliate = res.countMemberAffiliate;
      this.last_deposit = res.deposit_latest_one_with_promotion.deposit_last;
      this.thisusername = res.user[0].username;
      this.thiscredit = numeral(res.user[0].credit).format("0.00");
      this.credit2 = this.thiscredit | this.formatNumber;
      if (this.credit2 == 0) {
        this.thiscredit = "0";
      }
      this.inputwithdraw = numeral(res.user[0].credit).format("0.00");
      this.credit3 = this.inputwithdraw | this.formatNumber;
      if (this.credit3 == 0) {
        this.inputwithdraw = "0";
      }
      this.thislastref = res.user[0].ref;
      // this.winlost = res.win_lost.result.data
      if (res.deposit_latest_one_with_promotion.promotion !== null) {
        this.turnover = res.deposit_latest_one_with_promotion.promotion;
        // console.log(this.turnover);
      } else if (
        res.deposit_latest_one_with_promotion.promotion === null &&
        res.deposit_latest_one_with_promotion.ref_turn_over
          .error_list_turnover === null
      ) {
        this.turnover = 0;
        this.turngoal = 0;
        this.turn_type = 0;
      } else {
        this.turnover =
          res.deposit_latest_one_with_promotion.ref_turn_over.error_list_turnover;
      }
      if (this.turnover.turn_type === 2) {
        this.turngoal = this.turnover.turn_over;
      }
      if (this.turnover.turn_type === 1) {
        this.turngoal = this.turnover.turn_win;
      }
      this.creditgoal =this.turngoal * Math.trunc(res.deposit_latest_one_with_promotion.deposit_last.credit_after);
      // console.log(this.creditgoal);
    },

    async getinput() {
      const url = `${baseURL}/member_transaction/make-withdraw`;
      this.thiscredit;
      if (this.inputwithdraw > this.thiscredit) {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถทำรายการได้",
          text: "จำนวนเงินที่ต้องการถอน ไม่ถูกต้อง!",
        });
        return 
      }
      const username = this.sb_username;

      const a = moment().format("HH:mm:ssZ");
      const aa = moment().format("YYYY-MM-DDT");
      const aaa = "KOKILL";

      const bank_uuid = this.bankforwithdraw;
      const amount = this.inputwithdraw;
      const bonus_credit = 0;
      const annotation = "-";
      const bank_time = moment().format("DD/MM HH:mm");
      const createdAt = aa + a + aaa;

      const create_by = this.user;
      this.withdraw = {
        bank_uuid: bank_uuid,
        amount: parseInt(amount),
        bonus_credit: bonus_credit,
        username: username,
        annotation: annotation,
        bank_time: bank_time,
        create_by: create_by,
        createdAt: createdAt,
      };
      axios
        .post(url + "/", this.withdraw, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          this.$toast.success("เรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });

        this.sb_username = "";
        this.thisname = "";
        this.thistel = "";
        this.thiscredit = "";
        this.thisbank = "";
        this.thisbanknumber = "";
        this.lasttwenty = "";
        this.winlost = "";
        this.list_play = "";
        this.inputwithdraw = "";

      })
      .catch(() => {
        this.$toast.error("ไม่ถูกต้อง", {
          position: "top-right",
          timeout: 1500,
          icon: true,
          rtl: false,
        });
        this.sb_username = "";
        this.thisname = "";
        this.thistel = "";
        this.thiscredit = "";
        this.thisbank = "";
        this.thisbanknumber = "";
        this.lasttwenty = "";
        this.winlost = "";
        this.list_play = "";
        this.inputwithdraw = "";
      })
      .finally(() => {
        //Perform action in always
      });
    },
    checkcomfirm() {
      this.$confirm("ยืนยันการถอน?").then(() => {
        this.getinput();
      });
    },
  },
};
</script>
