<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">ถอนเงิน</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-12">
        <userData />
      </div>
    </div>

    <div class="card mt-3 shadow p-3 text-center border-0">
      <table style="width: 100%">
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
      </table>

      <hr />
      <form>
        <div>
          <div class="form-group col-12 mx-auto">
            <label for="formGroupExampleInput">จำนวนเงินที่ต้องการถอน</label>
            <h4>จำนวนเงินที่มี: {{ credit2 | formatNumber }} บาท</h4>
            <!-- <input
              type="number"
              name="amount"
              id="formGroupExampleInput"
              v-model="credit"
              class="form-control text-center col-6 mx-auto"
              placeholder="กรุณากรอกจำนวนเงิน"
            /> -->
            <br />
            <span v-if="minimum_withdraw > 0" class="border-bottom ">
              หมายเหตุ: จำนวนเงินขั้นต่ำต้องมากกกว่า หรือ เท่ากับ
              <p class="text-danger">{{ minimum_withdraw }}</p>
              บาท จึงจะสามารถถอนได้</span
            >
            <!-- <b v-else class="border-bottom text-danger" style=""> หมายเหตุ: ใช้บัญชีที่สมัครเข้ามาเท่านั้น</b> -->
            <!-- <label class="mt-2 text-danger"
              >** เพื่อสิทธิประโยชน์ของผู้ใช้ ระบบมีความจำเป็นต้องให้ผู้ใช้
              ถอนเงินออกจากเครดิตที่เลือกทั้งหมด แล้วระบบจะโอน
              เข้าบัญชีของคุณภายใน 30 วินาที </label
            > -->
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12 text-center">
            <!-- @click.prevent="withdraw" -->

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
              class="btn btn-blue btn-lg text-center text-white"
              style="border-radius: 25px"
              :disabled="this.credit > this.credit2"
            >
              <i class="fas fa-check-circle"></i> ยืนยันการถอน
            </button>

            <!-- <button
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
              class="btn btn-blue btn-lg text-center text-white"
              style="border-radius: 25px"
              :disabled="this.credit2 > this.credit"
            >
              <i class="fas fa-check-circle"></i> ยืนยันการถอน
            </button> -->

            <span
              class="text-danger"
              v-if="
                (transaction_status == 'Create') | (transaction_status == 0)
              "
              >{{ text }}</span
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import UserData from "./../home/user-data";
import { baseURL } from "./../../../../services/api";
import bankService from "./../../../../services/bankService";
import withdrawService from "@/services/withdrawIncome";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "home",
  components: {
    UserData,
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
    console.log("okdee");
    axios({
      method: "get",
      url: baseURL + "/credit/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.credit2 = response.data.data.credit;
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
      sessionStorage.setItem("amount", parseInt(this.credit));
      try {
        const withdrawForm = {
          amount: parseInt(this.credit),
        };
        let timerInterval;
        Swal.fire({
          title: "กรุณาสักครู่",
          // text: "ประมาณ 1 - 2 นาที",
          imageUrl: "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
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
        this.$toast.error(error.response.data.error.message, {
          position: "top-right",
          timeout: 1500,
        });
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
</style>
