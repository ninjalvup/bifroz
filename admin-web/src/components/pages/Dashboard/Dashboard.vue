<template>
  <div id="smssetting">
    <div class="page-inner">
      <div class="page-header">
        <br />
        <h4 class="page-title">แดชบอร์ด</h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="col-md-12">
        <div class="card">
          <img class="card-img-top" src="holder.js/100x180/" alt="" />
          <div class="card-body">
            <div class="row">
              <div class="col-6 col-lg-3 mt-4">
                <div class="row d-flex align-items-center bg-light rounded p-2">
                  <div
                    class="col-4 py-3 text-center bg-primary rounded text-white"
                  >
                    <i class="fas fa-user-plus icon-dashboard h-100"></i>
                  </div>
                  <div class="col-8 text-center font-dashboard">
                    <p>สมาชิกใหม่</p>
                    <p></p>
                    <p>{{ Number(member.length).toLocaleString() }} คน</p>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3 mt-4">
                <div class="row d-flex align-items-center bg-light rounded p-2">
                  <div
                    class="col-4 py-3 text-center bg-primary rounded text-white"
                  >
                    <i class="fas fa-wallet icon-dashboard h-100"></i>
                  </div>
                  <div class="col-8 text-center font-dashboard">
                    <p>บัญชีถอนคงเหลือ</p>
                    <p>
                      {{
                        Number(
                          withdrawpending[0].credit_bank_after
                        ).toLocaleString()
                      }}
                      ฿
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3 mt-4">
                <div class="row d-flex align-items-center bg-light rounded p-2">
                  <div
                    class="col-4 py-3 text-center bg-info rounded text-white"
                  >
                    <i class="fas fa-university icon-dashboard h-100"></i>
                  </div>
                  <div class="col-8 text-center font-dashboard">
                    <p>ยอดฝากวันนี้</p>
                    <p></p>
                    <p>{{ Number(sumdeposit).toLocaleString() }} ฿</p>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3 mt-4">
                <div class="row d-flex align-items-center bg-light rounded p-2">
                  <div
                    class="col-4 py-3 text-center bg-info rounded text-white"
                  >
                    <i class="fas fa-university icon-dashboard h-100"></i>
                  </div>
                  <div class="col-8 text-center font-dashboard">
                    <p>ยอดถอนวันนี้</p>
                    <p></p>
                    <p>{{ Number(amountwithdraw).toLocaleString() }} ฿</p>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3 mt-4">
                <div class="row d-flex align-items-center bg-light rounded p-2">
                  <div
                    class="col-4 py-3 text-center bg-info rounded text-white"
                  >
                    <i class="fas fa-hand-holding-usd icon-dashboard h-100"></i>
                  </div>
                  <div class="col-8 text-center font-dashboard">
                    <p>เติมมือวันนี้</p>
                    <p></p>
                    <p>{{ Number(slipCreditTotal).toLocaleString() }} ฿</p>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3 mt-4">
                <div class="row d-flex align-items-center bg-light rounded p-2">
                  <div
                    class="col-4 py-3 text-center bg-info rounded text-white"
                  >
                    <i class="fas fa-hand-holding-usd icon-dashboard h-100"></i>
                  </div>
                  <div class="col-8 text-center font-dashboard">
                    <p>ถอนมือวันนี้</p>
                    <p></p>
                    <p>{{ Number(cutCreditTotal).toLocaleString() }} ฿</p>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3 mt-4">
                <div class="row d-flex align-items-center bg-light rounded p-2">
                  <div
                    class="col-4 py-3 text-center bg-success rounded text-white"
                  >
                    <i class="fas fa-piggy-bank icon-dashboard h-100"></i>
                  </div>

                  <div class="col-8 text-center font-dashboard">
                    <p>กำไรวันนี้</p>
                    <p></p>
                    <p>
                      {{
                        Number(
                          slipCreditTotal +
                            sumdeposit -
                            (cutCreditTotal + amountwithdraw)
                        ).toLocaleString()
                      }}
                      ฿
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { baseURL } from "./../../../services/api";
import moment from "moment";

import axios from "axios";
export default {
  data() {
    return {
      username: "",
      role: "",
      search_type: "",
      member: [],
      smstable: [],
      todaydate: "",
      todaytime: "",
      todaytime2: "",
      withdrawpending: [],
      depositreport: [],
      sumdepositreport: "",
      amountwithdraw: [],
      slipCreditTotal: "",
      cutCreditTotal: "",
      addCreditTotal: "",
      errlist: "",
      status: "",
    };
  },

  mounted() {
    this.getWait();

    this.showProfile();
  },

  computed: {
    sumdeposit() {
      return this.depositreport.reduce((sum, amount) => {
        return (sum += amount.amount);
      }, 0);
    },
  },
  methods: {
    async getWait() {
      let status = this.status;
      this.todaydate_lastbank = moment()
        .day(+4)
        .locale("th")
        .format("YYYY-MM-DD");
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const z = "";
      let search_type = this.search_type;
      const username = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;

      const start_date_lastbank =
        this.todaydate_lastbank + t + this.todaytime + z;
      const end_date_lastbank = this.todaydate + t + this.todaytime2 + z;

      const error_type = "";
      // console.log(this.todaydate)

      // หายอดในบัญชีล่าสุด
      await axios({
        method: "get",

        url: `${baseURL}/member_transaction/withdraw-pending-list?start_date=${start_date_lastbank}&end_date=${end_date_lastbank}&status=${status}&username=${username}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.withdrawpending = response.data.data;
          this.withdrawpending = response.data.data;
          // console.log(this.withdrawpending)
        })
        .catch((error) => {
          console.log(error);
        });

      // เติมมือ ถอนมือ
      await axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=${username}&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.addCreditTotal = response.data.addCreditTotal[0].totalAmount;
          this.cutCreditTotal = response.data.cutCreditTotal[0].totalAmount;
          this.slipCreditTotal = response.data.slipCreditTotal[0].totalAmount;
          this.errlist = response.data.data;
          // console.log(this.errlist);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // ยอดเติมเงิน
      axios({
        method: "get",
        url: `${baseURL}/report/deposit/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.depositreport = response.data.data;
          this.sumdepositreport = response.data.data[0].amount;

          // console.log(this.depositreport)
          // console.log(this.sumdepositreport)

          setTimeout(async function () {
            await axios();
          }, 120000);
        })
        .catch((error) => {
          console.log(error);
        });

      // ถอน
      axios({
        method: "get",
        url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.amountwithdraw = response.data.sumperson.personWithdrawreaamount;

          setTimeout(async function () {
            await axios();
          }, 120000);
        })
        .catch((error) => {
          console.log(error);
        });

      // this.amountwithdraw = res.data.sumperson.personWithdrawreaamount;
      // console.log(this.amountwithdraw)

      // หาข้อมูล member
      axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=${username}&search_type=${search_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then(async (response) => {
          this.member = await response.data.data;
          // console.log(this.member)
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // โปรไฟล์
    showProfile() {
      axios({
        method: "get",
        // url: "http://localhost:3000/api/user/profile",
        url: `${baseURL}/user/profile`,

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          // console.log(res);
          this.username = res.data.data.username;
          this.role = res.data.data.role;
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
          if (error.response.status === 401 || error.response.status === 500) {
            const removeToken = localStorage.removeItem("access_token");
            if (removeToken == null) {
              this.$router.push("/login");
            }
          }
        });
    },
    logout() {
      const removeToken = localStorage.removeItem("access_token");
      if (removeToken == null) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.icon-dashboard {
  font-size: 4vw;
}
p {
  font-size: 20px;
  line-height: 1.82 !important;
  margin-bottom: 0rem !important;
  word-break: break-word;
}
</style>