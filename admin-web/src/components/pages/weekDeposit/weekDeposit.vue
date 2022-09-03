<template>
  <div id="weekDeposit">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title"><i class="fas fa-book"></i>ฝาก 7 วัน</h4>
      </div>
      <div class="row">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <div class="card-body">
                <form
                  class="form-inline justify-content-center"
                  v-on:submit.prevent="weekDeposit"
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
                      v-model="username"
                      required
                    />

                    <button class="btn btn-info ml-2" type="submit">
                      <i class="fa fa-search" aria-hidden="true"></i>
                      ค้นหา
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7">
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
                    disabled
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
                    disabled
                  />
                </div>

                <div class="col-md-1.5">
                  <br />
                  <button
                    class="btn btn-primary btn-sm ml-1"
                    v-on:click.prevent="getDataParam()"
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
            <div class="table-responsive">
              <table
                id="basic-datatables"
                class="display table table-striped table-hover table-bordered"
              >
                <thead style="text-align: center">
                  <tr style="text-align: center">
                    <th>ชื่อผู้ใช้</th>
                    <th>โบนัส</th>
                    <th>เครดิตก่อนเติม</th>
                    <th>เครดิตหลังเติม</th>
                    <th>เวลา</th>
                  </tr>
                </thead>
                <tbody style="text-align: center"  >
                  <tr v-for="data in week" v-bind:key="data.uuid">
                    <td>{{data.username}}</td>
                    <td>
                      <div v-if="data.bonus_credit == null">
                          <span >0</span>
                      </div>
                      <div v-if="data.bonus_credit != null">
                          <span >{{ data.bonus_credit | formatNumber}}</span>
                      </div>
                    </td>
                    <td>{{data.credit_before |formatNumber}}</td>
                    <td>{{data.credit_after |formatNumber}}</td>
                    <td>{{data.updatedAt | formatDate}}</td>
                  </tr>
                </tbody>
                  <tbody>
                    <tr v-if="week.length == '0'">
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
    </div>
  </div>
</template>
<script>
import memberTransaction from '../../../services/memberTransaction'
import moment from "moment";import UserService from "@/services/UserService";

export default {
   data() {
    return {
        yesterdate: "",
        yestertime: "",
        todate: "",
        totime: "",
        username: "",
        week:[]
    };
   },
     mounted() {
this.checkAuth();

        this.moment();
  },
    methods: {
      async checkAuth(){
       const res = await UserService.getProfile().catch(function (error) {
        if(error.response.status === 401 || error.response.status === 500){
      const removeToken = localStorage.removeItem("access_token");
        if (removeToken == null) {
        this.$router.push("/login");
      }
      }
      });
      res.logout
    },

    async weekDeposit() {
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
      try {
        const sevenForm = {
          username: this.username,
        };
        const resp = await memberTransaction.weekDeposit(sevenForm,start_date,end_date);
          console.log(resp);
          this.week = resp.data.data
          console.log(this.week);
      } catch (error) {
         this.$toast.error('ไม่มีผู้ใช้นี้', {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
    async getDataParam(){
      const t = "T";
      const z = ".000Z";
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      try {
        const sevenForm = {
          username: this.username,
        };
        const resp = await memberTransaction.weekDeposit(sevenForm,start_date,end_date);
          console.log(resp);
          this.week = resp.data.data
           if (this.week.length <= 0) {
            this.$toast.error("ไม่มีข้อมูลในวันนี้", {
              position: "top-right",
              timeout: 1500,
              icon: true,
              rtl: false,
            });
          }
      } catch (error) {
         this.$toast.error('ไม่มีผู้ใช้นี้', {
          position: "top-right",
          timeout: 1500,
        });
      }
      
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
      const t = "T";
      const z = ".000Z";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
        try {
        const sevenForm = {
          username: this.username,
        };
        const resp = await memberTransaction.weekDeposit(sevenForm,start_date,end_date);
          console.log(resp);
          this.week = resp.data.data
           if (this.week.length <= 0) {
            this.$toast.error("ไม่มีข้อมูลในวันนี้", {
              position: "top-right",
              timeout: 1500,
              icon: true,
              rtl: false,
            });
          }
      } catch (error) {
         this.$toast.error('ไม่มีผู้ใช้นี้', {
          position: "top-right",
          timeout: 1500,
        });
      }
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
      const t = "T";
      const z = ".000Z";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      try {
        const sevenForm = {
          username: this.username,
        };
        const resp = await memberTransaction.weekDeposit(sevenForm,start_date,end_date);
          console.log(resp);
          this.week = resp.data.data
           if (this.week.length <= 0) {
            this.$toast.error("ไม่มีข้อมูลในวันนี้", {
              position: "top-right",
              timeout: 1500,
              icon: true,
              rtl: false,
            });
          }
      } catch (error) {
         this.$toast.error('ไม่มีผู้ใช้นี้', {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
    
  },
}
</script>
<style scoped>
.table .thead-custom th {
    color: #fff;
    background-color: #4871f7 ;
    border-color: #32383e;
}
</style>