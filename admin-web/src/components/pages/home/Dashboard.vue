<template>
  <div id="dashboard">
    <div class="page-inner">
      <div class="page-header">
        <br />
        <h4 class="page-title">
          <i class="fa fa-home" aria-hidden="true"></i> หน้าหลัก
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>

      <div class="col-md-12">
        <div class="col-md-12">
          <topDashboard />
        </div>
        <div>
          <div class="col-md-12 row">
            <div class="col-md-7">
              <underRight />
            </div>
            <div class="col-md-5">
              <div class="card">
                <div class="card-header bg-primary">
                  <h4 class="card-title text-white">รายการเดินบัญชีวันนี้</h4>
                </div>
                <div class="card-body">
                  <div
                    v-if="
                      smstable.length <= 0 ||
                      smstable.length === 0 ||
                      smstable.length === null
                    "
                  >
                    <div class="alert alert-danger" role="alert">
                      ไม่มีรายการเดินบัญชี
                    </div>
                  </div>
                  <div v-for="data in smstable" v-bind:key="data.id">
                    <div
                      class="col-md-12 col-sm-12 col-lg-12 ng-scope"
                      ng-repeat="t in trans"
                      style=""
                    >
                      <div
                        v-if="data.member_account_bank_transaction != null"
                        class="row"
                      >
                        <div class="col-md-2 col-sm-2 col-lg-2">
                          <img
                            :src="
                              require(`../../../assets/bank_icon/${data.bank_tranfer.toLowerCase()}.png`)
                            "
                            alt
                            class="icon ml-3"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div class="col-md-10 col-sm-10 col-lg-10">
                          <div class="row">
                            <div class="col-md-6 col-sm-6 col-lg-6">
                              <span
                                style="font-weight: bold; font-size: 18px"
                                class="pull-left ng-binding"
                                v-if="data.title_tranfer != null"
                                >{{ data.title_tranfer.toUpperCase() }}</span
                              >
                              <span
                                style="font-weight: bold; font-size: 18px"
                                class="pull-left ng-binding"
                                v-if="data.title_tranfer === null"
                                >SMS</span
                              >


                               <!-- <span
                                style="font-weight: bold; font-size: 18px"
                                class="pull-left ng-binding"
                          
                                >SMS</span> -->
                            </div>
                            <div class="col-md-6 col-sm-6 col-lg-6">
                              <span class="pull-right ng-binding"
                                >{{ data.createdAt | formatDate }}
                              </span>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <p>
                                <!-- ({{ data.bank_tranfer.toUpperCase() }}) -->
                                {{ data.sms_content }}
                                <br />
                                <span class="badge badge-secondary">
                                  <a
                                    class="text-white"
                                    href="#/home"
                                    @click="getClipboard"
                                    v-clipboard:copy="
                                      data.member_account_bank_transaction
                                        .username
                                    "
                                  >
                                    {{
                                      data.member_account_bank_transaction
                                        .username
                                    }}
                                  </a>
                                  <!-- <a
                                    href="#/home"
                                    @click="
                                      viewAnnotation(
                                        data.member_account_bank_transaction
                                          .username
                                      )
                                    "
                                    >{{
                                      data.member_account_bank_transaction
                                        .username
                                    }}
                                  </a> -->
                                  ฝาก {{ data.amount }} โบนัส
                                  {{
                                    data.member_account_bank_transaction
                                      .bonus_credit
                                  }}
                                  บาท
                                </span>
                              </p>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <p>
                                เครดิตก่อนเติม :
                                <strong>{{
                                  data.member_account_bank_transaction.credit_before.toFixed()
                                }}</strong>
                                <br />
                                เครดิตหลังเติม :
                                <strong
                                  >{{
                                    data.member_account_bank_transaction.credit_after.toFixed()
                                  }}
                                </strong>
                                <br />
                                เวลาเติมสำเร็จ :
                                <strong
                                  >{{ data.bank_date }} {{ data.bank_time }}
                                </strong>
                              </p>
                              <hr />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="alert alert-danger" role="alert">
                        ไม่มีรายการเดินบัญชี
                      </div> -->
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
import smsService from "@/services/smsService";
import UserService from "@/services/UserService";
import topDashboard from "./Top-dashbord";
import underRight from "./Under-right";

export default {
  components: {
    topDashboard,
    underRight,
  },
  data() {
    return {
      firstname: "",
      username: "",
      smstable: [],
      role: "",
      curlSmsTransaction: [],
      smsNewdata: [],
    };
  },

  methods: {
    async getSMS() {
      const res = await smsService.getScbSmsTransactionSuccess();
      // console.log(res.data);
      this.smstable = res.data;
      let self = this;
      setTimeout(async function () {
        await self.getSMS();
      }, 5000);
      // let self = this;

      // const res = await smsService.getScbSmsTransaction();
      // for (var i = 0; i < res.data.length; i++) {
      //   // console.log(smsNewdata);
      //   // if(){

      //   // }
      //   if (
      //     res.data[i].status === "1" &&
      //     res.data[i].member_account_bank_transaction != null
      //   ) {
      //     // let smsNewdata = this.smstable.filter((e) => {

      //     //   return e.id = res.data.id
      //     // });
      //     // console.log(smsNewdata);
      //     this.smstable.push({
      //       id: res.data[i].id,
      //       uuid: res.data[i].uuid,
      //       title: res.data[i].member_account_bank_transaction
      //           .member_account_banks[0].bank_name,
      //       amount: res.data[i].amount,
      //       status: res.data[i].status,
      //       createdAt: res.data[i].createdAt,
      //       bank_date: res.data[i].bank_date,
      //       bank_time: res.data[i].bank_time,
      //       content: res.data[i].sms_content,
      //       username: res.data[i].member_account_bank_transaction.username,
      //       bonus: res.data[i].member_account_bank_transaction.bonus_credit,
      //       credit_before:
      //         res.data[i].member_account_bank_transaction.credit_before,
      //       credit_after:
      //         res.data[i].member_account_bank_transaction.credit_after,

      //       bank_number:
      //         res.data[i].member_account_bank_transaction
      //           .member_account_banks[0].bank_number,
      //       bank_name:
      //         res.data[i].member_account_bank_transaction
      //           .member_account_banks[0].bank_name,
      //     });
      //   }
      // }
      // this.smstable.forEach((element) => {
      //   // this.curlSmsTransaction.splice(element);
      //   this.curlSmsTransaction.push(element);
      // });

      // setTimeout(async function () {
      //   await self.getSMS();
      //   // console.log("3");
      // }, 20000);

      // if (this.curlSmsTransaction.length > 0) {
      //   this.ishasData = true;
      // }
    },

    //     mod
    //     async getSMS() {
    //       const res = await smsService.getScbSmsTransaction();
    //       for (var i = 0; i < res.data.length; i++) {
    //         if (
    //           res.data[i].status === "1" &&
    //           res.data[i].member_account_bank_transaction != null
    //         ) {
    //           this.smstable = res.data;
    //       //      this.smstable.aaa =res.data[i].member_account_bank_transaction.member_account_banks[0].bank_number;
    //       //  console.log(this.smstable.aaa);
    //        }
    //       }
    //       // this.smsNewdata ="";

    // console.log(this.smstable);
    //       console.log(this.smstable);
    //       // this.smsNewdata.splice(0 , this.smsNewdata.length, this.smstable )
    //       // console.log(this.smsNewdata);
    //       // const arr1 = this.smstable;
    //       // const arr2 = this.smsNewdata;
    //       // const filterArray = (arr1, arr2) => {
    //       //    const filtered = arr1.filter(el => {
    //       //       return arr2.indexOf(el) === -1;
    //       //    });
    //       //    return filtered;
    //       // };
    //       // console.log(filterArray(arr1, arr2));
    //       // this.curlSmsTransaction = filterArray(arr1, arr2);
    //       // var arr = this.smstable;
    //       // var anotherArr = this.smsNewdata;

    //       // Array.prototype.splice.apply(arr, [0, anotherArr.length].concat(anotherArr));

    //       // console.log(arr);
    //       // console.log(this.curlSmsTransaction);
    //     },

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
    getClipboard() {
      this.$toast.success("คัดลอก User สำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
  },
  mounted() {
    this.checkAuth();
    // this.newCall();
    //  let self = this;
    //  setTimeout( function () {
    //       console.log("3");
    //     }, 300);

    // console.log(this.curlSmsTransaction);
  },
  beforeMount() {
    this.getSMS();
  },
  // prop:
};
</script>
<style scoped>
.anyClass {
  display: flex;
  flex-wrap: nowrap;
  overflow-y: auto;
}
</style>
