<template>
  <div>
    <div id="checkmember">
      <div class="page-inner">
        <div class="page-header">
          <h4 class="page-title">
            <i class="fas fa-book-reader"></i> ตรวจสอบข้อมูลลูกค้า
          </h4>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="card col-md-6">
              <form v-on:submit.prevent="getCheckMemberByUuid(uuid)">
                <div class="form-group row">
                  <label
                    for="password"
                    class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                  >
                    ชื่อผู้ใช้:
                    <span class="required-label">*</span>
                  </label>

                  <input
                    type="text"
                    class="form-control col-lg-4 col-md-9 col-sm-8"
                    name="username"
                    id="username"
                    v-model="sb_username"
                    placeholder="USERNAME"
                    required
                  />
                  <button type="submit" class="btn btn-info float-right ml-2">
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยืนยัน
                  </button>
                </div>
              </form>
            </div>
            <div class="col-md-3"></div>
          </div>
        </div>
       
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body row">
                <div class="col-md-4">
                  <div class="card card-stats card-round">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-icon">
                          <div
                            class="
                              icon-big
                              text-center
                              icon-primary
                              bubble-shadow-small
                            "
                          >
                            <i class="flaticon-users"></i>
                          </div>
                        </div>
                        <div class="col col-stats ml-3 ml-sm-0">
                          <div class="numbers">
                            <p class="card-category">ยูสเซอร์เนมลูกค้า</p>
                            <h4 class="card-title">{{ thisusername }}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card card-stats card-round">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-icon">
                          <div
                            class="
                              icon-big
                              text-center
                              icon-info
                              bubble-shadow-small
                            "
                          >
                            <i class="flaticon-coins"></i>
                          </div>
                        </div>
                        <div class="col col-stats ml-3 ml-sm-0">
                          <div class="numbers">
                            <p class="card-category">เครดิตปัจจุบันของลูกค้า</p>
                            <h4 class="card-title">
                              {{ thiscredit | formatNumber }}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card card-stats card-round">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-icon">
                          <div
                            class="
                              icon-big
                              text-center
                              icon-secondary
                              bubble-shadow-small
                            "
                          >
                            <i class="flaticon-file"></i>
                          </div>
                        </div>
                        <div class="col col-stats ml-3 ml-sm-0">
                          <div class="numbers">
                            <p class="card-category">REF ล่าสุด</p>
                            <h4 class="card-title">{{ thislastref }}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
     
              <div class="table-responsive">
                <table
                  id="basic-datatables"
                  class="display table table-bordered"
                >
                  <thead style=" table-bordered text-align:center">
                    <tr style="text-align: center">
                      <th style="background-color: #cce6ff">Turn Type</th>
                      <th style="background-color: #ccccff">ยอดเทิร์น</th>
                      <th style="background-color: #ffccff">
                        ยอดเครดิตที่ลูกค้าต้องทำ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="text-align: center">
                      <td>
                        <div v-if="this.turnover.turn_type == 1">
                          <h5>Turn WIN</h5>
                        </div>
                        <div v-if="this.turnover.turn_type == 2">
                          <h5>Turn OVER</h5>
                        </div>
                        <div v-if="this.turn_type === 0">
                          <h5>ไม่มีเทิร์น</h5>
                        </div>

                      </td>
                      <td>
                      
                        <div>
                          <h5>{{ this.turngoal }}</h5>
                        </div>
                      
                      </td>
                      <td>
                        <div v-if="this.creditgoal == 'NaN'">-</div>
                    

                        <div v-if="this.creditgoal != 'NaN'">
                          <h5>{{ this.creditgoal | formatNumber }}</h5>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <div class="row">
                      <div class="col">
                        <h3 class="card-title">20 รายการล่าสุด</h3>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table
                        id="basic-datatables"
                        class="
                          display
                          table table-striped table-hover table-bordered
                        "
                      >
                        <thead style="text-align: center">
                          <tr style="text-align: center">
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
                            class="table-bordered"
                          >
                            <td>{{ data.amount | formatNumber }}</td>
                            <td>
                              <div v-if="data.bonus_credit == null">
                                <span><h5>0</h5></span>
                              </div>
                              <div v-if="data.bonus_credit != null">
                                <span
                                  ><h5>{{ data.bonus_credit }}</h5></span
                                >
                              </div>
                            </td>
                            <td>
                              <span>
                                <h5>{{ data.credit_before | formatNumber }}</h5>
                              </span>
                            </td>
                            <td>
                              <span>
                                <h5>
                                  {{ data.credit_after | formatNumber }}
                                </h5></span
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
                              กรอกชื่อผู้ใช้เพื่อค้นหาข้อมูล !
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-3">
                <div class="card">
                  <div class="table-responsive table-bordered">
                    <table
                      id="basic-datatables"
                      class="display table table-striped table-hover table-bordered"
                    >
                      <thead
                        class="table table-bordered"
                        style="text-align: center"
                      >
                        <tr style="text-align: center">
                          <th>
                            แนะนำเพื่อนทั้งหมด
                            {{ this.countmemberaffiliate }} user
                          </th>
                        </tr>
                        <tr
                          style="text-align: center"
                          class="table table-bordered"
                        >
                          <th>USERNAME</th>
                        </tr>
                      </thead>
                      <tbody
                        style="text-align: center"
                        class="table table-striped table-hover table-bordered"
                      >
                        <tr
                          style="text-align: center"
                          v-for="(index, data) in affiliateaember"
                          v-bind:key="data.id"
                        >
                          <td>{{ index.user[0].sb_username }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkmemberService from "@/services/checkmemberService";
import swal from "sweetalert";
import Swal from "sweetalert2";

// var numeral = require('numeral');
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      countmemberaffiliate: "",
      affiliateaember: [],

      turngoal: "",
      creditgoal: "",
      rusult: "",
      input: "",
      uuid: "",
      sb_username: "",
      memberTable: [],
      lasttwenty: [],
      thisusername: "",
      thiscredit: "",
      thislastref: "",
      winlost: [],
      turnover: [],
      last_deposit: [],
      list_play: [],
      turn_type: "",
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    async checkAuth() {
      const res = await UserService.getProfile().catch(function (error) {
        if (error.response.status === 401 || error.response.status === 500) {
          const removeToken = localStorage.removeItem("access_token");
          if (removeToken == null) {
            this.$router.push("/login");
          }
        }
      });
      res.logout;
    },

    async getCheckMemberByUuid() {
      // console.log();
      let timerInterval;
      Swal.fire({
        title: "กรุณาสักครู่",
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
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      let username = this.sb_username;
      const res = await checkmemberService
        .getCheckByUuid(username)
        .catch((error) => {
          // console.log(error.message);
          console.log(error);
          // console.log(res);

          this.sb_username = "";
          error.res;
          swal("ไม่พบข้อมูลการฝาก!", "", "warning");
        });

      this.lasttwenty = res.deposit_latest;
      this.affiliateaember = res.affiliateMember;
      this.countmemberaffiliate = res.countMemberAffiliate;
      this.last_deposit = res.deposit_latest_one_with_promotion.deposit_last;
      this.thisusername = res.user[0].username;
      this.thiscredit = res.user[0].credit;
      this.thislastref = res.user[0].ref;
      // this.winlost = res.win_lost.result.data;

      // console.log(this.turnover);
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
        // console.log(this.turnover);
      }
      // if (this.turnover === null) {
      //   this.turnover =
      //     res.deposit_latest_one_with_promotion.ref_turn_over.error_list_turnover;
      // } else {
      //   this.turnover = [];
      // }

      // // if (this.turnover === null && this.turnover !== null) {
      // //   console.log();
      // // } else {
      // //   this.turnover = [];
      // // }

      if (this.turnover.turn_type === 2) {
        this.turngoal = this.turnover.turn_over;
      }
      if (this.turnover.turn_type === 1) {
        this.turngoal = this.turnover.turn_win;
      }
      // console.log(res.deposit_latest_one_with_promotion.deposit_last.amount);
      this.creditgoal =this.turngoal * Math.trunc(res.deposit_latest_one_with_promotion.deposit_last.credit_after);
      // console.log( Math.trunc(res.deposit_latest_one_with_promotion.deposit_last.credit_after));
      // console.log(this.turngoal);
      // console.log(this.creditgoal);
      // console.log(Math.trunc(this.creditgoal));
    },
  },
};
</script>

<style>
</style>