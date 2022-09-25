<template>
  <div id="home">
    <!-- ธนาคารฝาก -->

    <div
      class="row justify-content-center"
      style="margin-top: 100px; margin-bottom: 150px"
    >
      <div class="col-md-9">
        <!-- <UserData /> -->

        <div
          class="card border-0 container p-0"
          style="background-color: #2a2a2a"
        >
          <div class="card-body mt-4 p-0">
            <div class="row">
              <div class="col-12">
                <p>กรุณาโอนเงินจากบัญชี</p>
              </div>
            </div>
            <div class="row">
              <div class="col-10">
                <div class="rounded py-1" style="background-color: #1b1b1b">
                  <div class="row">
                    <div class="col-12 p-1">
                      <div class="row">
                        <div
                          class="
                            col-5
                            d-flex
                            align-items-center
                            justify-content-center
                          "
                        >
                          <div style="text-align: center">
                            <img id="imgBank" src="" />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="row">
                            <div class="col-12">
                              <div
                                class="col-12 text-center rounded-pill p-1 mb-1"
                                style="
                                  border: 1px solid;
                                  border-image: wheat;
                                  background-color: rgb(42, 42, 42);
                                "
                              >
                                <span class="">
                                  {{ bankAccount }}
                                </span>
                              </div>
                            </div>
                            <div class="col-12">
                              <div
                                class="col-12 text-center rounded-pill p-1"
                                style="
                                  border: 1px solid;
                                  border-image: wheat;
                                  background-color: rgb(42, 42, 42);
                                "
                              >
                                <span class="">
                                  {{ name }}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- จบท่อนแรก -->

          <div class="card-body mt-4 p-0">
            <div class="row">
              <div class="col-12">
                <p>กรุณาโอนเงินเข้าบัญชี</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div v-for="data in bank" v-bind:key="data.id">
                  <div
                    class="d-flex justify-content-start"
                    v-if="
                      data.bank_status == '1' &&
                      data.bank_name !== 'truemoney' &&
                      data.bank_type == '1' &&
                      data.type_deposit == '1'
                    "
                  >
                    <div class="col-10 p-0">
                      <div
                        class="rounded py-1"
                        style="background-color: #1b1b1b"
                      >
                        <div class="row">
                          <div
                            class="
                              col-5
                              d-flex
                              align-items-center
                              justify-content-center
                            "
                          >
                            <div style="text-align: center">
                              <img
                                :src="
                                  require(`./../../../../../../public/assets/images/banks/${data.bank_name.toLowerCase()}.png`)
                                "
                                width="55"
                                height="55"
                                class="icon"
                              />
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="row">
                              <div class="col-12 p-1">
                                <div
                                  class="
                                    col-12
                                    text-center
                                    rounded-pill
                                    p-1
                                    mb-1
                                  "
                                  style="
                                    border: 1px solid;
                                    border-image: wheat;
                                    background-color: rgb(42, 42, 42);
                                  "
                                >
                                  <span class="">
                                    {{ data.bank_number }}
                                  </span>
                                </div>
                              </div>
                              <div class="col-12 p-1">
                                <div
                                  class="col-12 text-center rounded-pill p-1"
                                  style="
                                    border: 1px solid;
                                    border-image: wheat;
                                    background-color: rgb(42, 42, 42);
                                  "
                                >
                                  <span class="">
                                    {{ data.bank_account_name }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-11 text-center p-2">
                            <span class="mt-4">จำนวนเงิน {{ balance }} บาท</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-2 d-flex align-items-center p-0 m-0">
                      <img
                        src="assets/images/custom/copy.png"
                        type="button"
                        class="img-fluid"
                        @click="copy"
                        v-clipboard:copy="data.bank_number"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-12">
              <h5>เพื่อความเร็วในการฝาก</h5>

              <p>- กรุณาใช้เลขบัญชีที่ระบุโอนมาเท่านั้น</p>
              <p>- หลังจากโอนเงินเสร็จ ระบบจะเติมเครดิตเข้าอัตโนมัติ ภายใน 10-30 วินาที</p>
              <p>- หากเกิน5นาทีแล้วเครดิตยังไม่เข้า กรุณาติดต่อเจ้าหน้าที่</p>
            </div>
          </div>

          <!-- <table style="width: 100%">
        <tr>
          <td colspan="6" style="text-align: center; padding-bottom: 16px">
            <h5>ถอนเงิน</h5>
          </td>
        </tr>
        <tr>
          <td style="text-align: right; padding-right: 20px">
            <img id="imgBank" src="" />
          </td>
          <td colspan="5" style="text-align: left">
            <h6>ชื่อบัญชี: {{ name }}</h6>
          </td>
        </tr>
        <tr>
          <td style="text-align: right; padding-right: 20px"></td>
          <td colspan="5" style="text-align: left">
            <h6>ธนาคาร: {{ bankName }}</h6>
            <h6>เลขที่บัญชี: {{ bankAccount }}</h6>
          </td>
        </tr>
      </table> -->

          <!-- <form>
        <div>
          <div class="form-group col-12 mx-auto">
            <h6>จำนวนเงินที่มี: {{ credit2 | formatNumber }} บาท</h6>
            
            <label for="formGroupExampleInput">จำนวนเงินที่ต้องการถอน</label>
            <input
              type="number"
              name="amount"
              id="formGroupExampleInput"
              v-model="credit"
              class="form-control text-center col-6 mx-auto"
              placeholder="กรุณากรอกจำนวนเงิน"
            />
            <br />
            <span v-if="minimum_withdraw > 0" class="border-bottom">
              หมายเหตุ: จำนวนเงินขั้นต่ำต้องมากกกว่า หรือ เท่ากับ
              <p class="text-danger">{{ minimum_withdraw }}</p>
              บาท จึงจะสามารถถอนได้</span
            >
        
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12 text-center">

            <button
              @click.prevent="withdraw"
              v-if="
                transaction_status == [] ||
                transaction_status == 'manual' ||
                transaction_status == 'Success' ||
                transaction_status == 'Reject' ||
                transaction_status == 'Manual' ||
                transaction_status == 1
              "
              value="withdraw"
              class="btn btn-lg text-center text-white px-5"
              style="background-color: wheat;border-radius: 25px;color: black !important;"
              :disabled="
              this.credit > this.credit2||
              this.credit < 50"
            >
             ยืนยัน
            </button>

            <span
              class="text-danger"
              v-if="
                (transaction_status == 'Create') | (transaction_status == 0)
              "
              >{{ text }}</span
            >
          </div>
        </div>
      </form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import UserData from "./../home/user-data";
import { baseURL } from "./../../../../../services/api";
// import Swal from "sweetalert2";
import withdrawService from "@/services/withdrawIncome";

export default {
  components: {
    // UserData,
  },
  data() {
    return {
      bank: [],
      checkbank: "",
      tel: "",
      first_name: "",
      last_name: "",
      bank_name: "",
      bank_number: "",
      amount: "",
      reportdeposit: [],
      credit: "",
      credit2: "",
      transaction_status: "",
      text: "",
      status: "",
      reportwithdraw: "",
      name: "",
      bankAccount: "",
      bankName: "",
      minimum_withdraw: "",
      first_name2: "",
      last_name2: "",
      tel2: "",
      bank_name2: "",
      bank_number2: "",
      minimum_withdraw2: "",
    };
  },

  mounted() {
    this.balance = sessionStorage.getItem("balance");
    this.getamount();

    axios({
      method: "get",
      url: baseURL + "/member/reportwithdraw",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.reportwithdraw = response.data.data.status;
        if (response.status === 200) {
          console.log("");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data == "Unauthorized") {
          sessionStorage.removeItem("access_token");
        }
      });

    console.log("okdee");
    axios({
      method: "get",
      url: baseURL + "/credit/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      // .then(() => { //hide
      .then((response) => {
        //unhide
        // this.credit2 = 1000; //hide
        this.credit2 = response.data.data.credit; //unhide
        this.credit3 = this.credit2 | this.formatNumber;
        if (this.credit3 == 0) {
          this.credit = 0;
        } else {
          this.credit = this.credit2;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "get",
      url: baseURL + "/member/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.first_name2 = response.data.data.first_name;
        this.last_name2 = response.data.data.last_name;
        this.tel2 = response.data.data.tel;
        this.bank_name2 = response.data.data.bank_name;
        this.bank_number2 = response.data.data.bank_number;
        this.minimum_withdraw2 = response.data.data.minimum_withdraw;
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "get",
      url: baseURL + "/member/reportwithdraw",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.reportdeposit = response.data.data.status;
        this.transaction_status =
          response.data.data.status[0].transaction_status;
        this.text =
          "กรุณารอการก่อนหน้านี้อนุมัติก่อนถึงจะสามารถทำการถอนได้อีกครั้ง";
        if (response.status === 200) {
          console.log();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "get",
      url: baseURL + "/credit/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.credit = response.data.data.sb_username.data.result.credit;
      })
      .catch((error) => {
        console.log(error);
      });

    this.getDataUser();

    axios({
      method: "get",
      url: baseURL + "/member/bank",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.bank = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    copy() {
      this.$toast.success("Copy เลขบัญชีสำเร็จ", {
        position: "top-right",
        timeout: 1500,
      });
    },
    copyamount() {
      this.$toast.success("Copy จำนวนเงิน", {
        position: "top-right",
        timeout: 1500,
      });
    },

    getamount() {
      this.amount = sessionStorage.getItem("amountregular");
    },

    async getDataUser() {
      // รายละเอียด bank
      const rs = await withdrawService.getDataUser();
      this.name = rs.data.bank_account_name;
      this.bankAccount = rs.data.bank_number;
      this.bankName = rs.nameBank;
      document.getElementById("imgBank").setAttribute("src", rs.imgBank);
    },
  },
};
</script>

<style scoped>
.alert-danger {
  color: #690a13;
  background-color: #ffd3d7;
  border-color: #fda7b0;
}
.alert {
  position: relative;
  padding: 0.15rem 0.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.1rem;
}
.circleshow {
  border: 2px solid rgb(100, 177, 250);
  background-color: #ffffff;
  height: 100px;
  border-radius: 50%;
  width: 100px;
}
.centershow {
  margin: auto;
}
* {
  color: wheat !important;
  font-weight: 300 !important;
}

.rounded {
  border-radius: 1.25rem !important;
      /* border-width: 3px; */
      border-style: solid;
    border-color: wheat;
    border-width: thin;
    background-color: rgb(27, 27, 27);
}

.img-fluid {
    width: 130%;
    height: auto;
}
</style>
