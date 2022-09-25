<template>
  <div>


    <div class="row"
    style="
    margin-top: 100px;
"
    >
    <div class="col-4 p-3">
        <router-link v-if="bank_name === 'kbnk'" to="/decimal" class="">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-1.png"
            alt=""
          />
        </router-link>


        <router-link v-if="bank_name !== 'kbnk'" to="/bankInfo" class="">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-1.png"
            alt=""
          />
        </router-link>
      </div>

      <div class="col-4 p-3">
        <router-link to="/withdraw">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-2.png"
            alt=""
          />
        </router-link>
      </div>

      <div class="col-4 p-3">
        <router-link to="/report">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-3.png"
            alt=""
          />
        </router-link>
      </div>
    </div>







    <div class="row justify-content-center">
      <div class="col-md-12">
        <!-- <userData /> -->
      </div>
    </div>

    <div
      class="card mt-3 border-0 container p-0"
      style="
        background-color: #2a2a2a;
        margin-bottom: 150px;
      "
    >
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <p>กรุณากรอกยอดเงินที่ต้องการถอน</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="rounded py-3" style="background-color: #1b1b1b">
              <!-- ยูสเซอร์ -->
              <div class="row p-2">
                <div class="col-6 d-flex align-items-center">
                  <span class=""> ยูสเซอร์ </span>
                </div>
                <div
                  class="col-5 text-center rounded-pill p-1"
                  style="
                    border: 1px solid;
                    border-image: wheat;
                    background-color: rgb(42, 42, 42);
                  "
                >
                  <span class="">
                    {{ tel }}
                  </span>
                </div>
                <div class="col-1"></div>
              </div>

              <!-- ยอดเงินคงเหลือ -->
              <div class="row p-2">
                <div class="col-6 d-flex align-items-center">
                  <span class=""> ยอดเงินคงเหลือ </span>
                </div>
                <div
                  class="col-5 text-center rounded-pill p-1"
                  style="
                    border: 1px solid;
                    border-image: wheat;
                    background-color: rgb(42, 42, 42);
                  "
                >
                  <span class="">
                    {{ credit2 | formatNumber }}
                  </span>
                </div>
                <div class="col-1"></div>
              </div>

              <!-- ยอดที่ต้องการถอน -->

              <div class="row p-2">
                <div class="col-6 d-flex align-items-center">
                  <span class=""> ยอดที่ต้องการถอน </span>
                </div>
                <div
                  class="col-5 text-center rounded-pill p-0"
                  style="
                    border: 1px solid;
                    border-image: wheat;
                    background-color: rgb(42, 42, 42);
                  "
                >
                {{ credit2 | formatNumber }}
                </div>
                <div class="col-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12 text-center mt-3">
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
              class="btn btn-lg text-center text-white px-5 py-0"
              style="background-color: wheat;border-radius: 25px;color: black !important;"
              :disabled="
              this.credit > this.credit2||
              this.credit < 100"
            >
             ยืนยัน
            </button>
        </div>
      </div>







      <!-- จบท่อนแรก -->
      <div class="card-body mt-4">
        <div class="row">
          <div class="col-12">
            <p>เงินจะโอนเข้าบัญชี</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="rounded py-3" style="background-color: #1b1b1b">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-5 d-flex align-items-center justify-content-center" >
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



      <div class="row mt-5">
        <div class="col-12">
          <h5>
              หมายเหตุ
          </h5>
          
          <p>
            - หลังทำรายการ เงินจะโอนเข้าบัญชี ภายใน 5 นาที
          </p>
          <p>
            - หากเกิน 15 นาที แล้วเงินไม่เข้า กรุณาติดต่อเจ้าหน้าที่
          </p>
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

    <div
      class="tab-content mt-1"
      id="nav-tabContent"
    >

      <div
        class="tab-pane fade"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      ></div>
    </div>
  </div>
</template>
<script>
// import UserData from "./../home/user-data";
import { baseURL } from "./../../../../services/api";
import bankService from "./../../../../services/bankService";
import withdrawService from "@/services/withdrawIncome";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "home",
  components: {
    // UserData,
  },
  data() {
    return {
      tel: "",
      first_name: "",
      last_name: "",
      bank_name: "",
      bank_number: "",
      amount: "",
      reportdeposit: [],
      credit: "",
      transaction_status: "",
      text: "",
      status: "",
      reportwithdraw: "",
      name: "",
      bankAccount: "",
      bankName: "",
      minimum_withdraw: "",
    };
  },
  mounted() {
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
        this.first_name = response.data.data.first_name;
        this.last_name = response.data.data.last_name;
        this.tel = response.data.data.tel;
        this.bank_name = response.data.data.bank_name;
        this.bank_number = response.data.data.bank_number;
        this.minimum_withdraw = response.data.data.minimum_withdraw;
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

    //  console.log("dd:",  this.transaction_status);
  },
  methods: {
    //ฟันชันถอนเงิน
    async withdraw() {
      sessionStorage.setItem("amount", parseInt(this.credit)); //unhide
      // sessionStorage.setItem("amount", parseInt(50)); //hide
      try {
        const withdrawForm = {
          amount: parseInt(this.credit), //unhide
          // amount: parseInt(50),//hide
        };
        let timerInterval;
        Swal.fire({
          title: "กรุณาสักครู่",
          // text: "ประมาณ 1 - 2 นาที",
          // imageUrl: "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
          imageWidth: 300,
          imageHeight: 200,

          html: " ประมาน <b></b> นาที.",
          timer: 5678,
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
            this.time = "I was closed by the timer";
          }
        });
        const resp = await bankService.addWithdraw(withdrawForm);
        if (resp.data === "turn_win ยังไม่ถึง") {
          this.$toast.error("ยอดเทิร์นวินยังไม่ถึง", {
            position: "top-right",
            timeout: 3500,
          });
        }
        if (resp.data === "turn_over ยังไม่ถึง") {
          Swal.fire("ไม่สามารถถอนได้", "เนื่องจาก ยอดเทิร์นยังไม่ถึง", "error");
        }
        if (resp.data === "ถอนเกินอั้นไม่ได้") {
          this.$toast.error("ถอนเกินอั้นไม่ได้", {
            position: "top-right",
            timeout: 3500,
          });
        }

        // if (resp.data.error.message == "ถอนเกินจำนวนเงินที่กำหนดไว้") {
        //   this.$toast.error("ถอนเกินจำนวนเงินที่กำหนดไว้", {
        //     position: "top-right",
        //     timeout: 1500,
        //   });
        // }

        if (resp.data === "รออนุมัติ") {
          this.$toast.success("ถอนสำร็จรอการอนุมัติ", {
            position: "top-right",
            timeout: 1500,
          });

          this.$router.push("/withdrawInfo");
        }

        if (resp.data.message === "รออนุมัติ") {
          this.$toast.success("ถอนสำร็จรอการอนุมัติ", {
            position: "top-right",
            timeout: 1500,
          });

          this.$router.push("/withdrawInfo");
        }

        if (resp.data === "ถอนเกินจำนวนเงินที่กำหนดไว้") {
          this.$toast.error("ถอนเกินจำนวนเงินที่กำหนดไว้", {
            position: "top-right",
            timeout: 3500,
          });
        } else {
          this.$toast.warning(resp.data.error.message, {
            position: "top-right",
            timeout: 1500,
          });
        }
      } catch (error) {
        console.log(error);

        this.$toast.error(error.response.data.error.message, {});
      }
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
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgb(60 154 255 / 10%);
  border-bottom: 1px solid rgb(255 255 255 / 13%);
  text-align: center;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0px;
}
* {
  color: wheat;
  font-weight: 700 !important;
}

#formGroupExampleInput {
  color: black;
}
.rounded {
  border-radius: 1.25rem !important;
}
</style>
