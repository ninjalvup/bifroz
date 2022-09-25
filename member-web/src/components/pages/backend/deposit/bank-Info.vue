<template>
  <div id="adDeposite">


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











    <!-- ฝากทศนิยม -->

    <div
      class="row justify-content-center"
      style="margin-bottom: 100px"
    >
      <div class="col-md-9">
        <div class="card border-0">
          <div class="card-body border-0 p-0" style="background-color: #1b1b1b">
            <div class="card border-0" style="background-color: #2a2a2a">
              <div
                class="card-header text-center rounded-top"
                style="background-color: #1b1b1b !important"
              >
                <h5 class="font-weight-bold" style="color: wheat">
                  กรอกรายละเอียดการโอนเงิน
                </h5>
              </div>
              <div
                class="card-body border border-dark rounded-bottom"
                style="background-color: #1b1b1b"
              >
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label class="font-weight-bold" style="color: wheat"
                        >จำนวนเงิน </label
                      ><br />
                      <input
                        v-model="amount"
                        type="number"
                        class="form-control"
                        placeholder="กรุณากรอกจำนวนเงิน"
                        required
                      />
                      <h6
                        class="mt-2 pl-2 font-weight-bold"
                        style="color: wheat"
                      >
                        ฝากขั้นต่ำ 1 บาท
                      </h6>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-md-12 text-center">
                      <button
                        @click.prevent="deposit"
                        class="btn-lg rounded-pill text-center"
                        style="background-color: wheat; font-weight: bold"
                      >
                        ทำรายการ
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseURL } from "./../../../../services/api";
import axios from "axios";
import bankService from "./../../../../services/bankService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      amount: "",
      bankName: "",
      bank_name: "",
    };
  },
  props: ["balance"],
  mounted() {

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
},
  methods: {
    sentvalue(value) {
      this.amount = value;
    },
    async deposit() {
      try {
        let checkamount = parseInt(this.amount);

        if (checkamount > 0) {
          const depositForm = {
            amount: checkamount,
          };

          const resp = await bankService.regularDeposit(depositForm);

          sessionStorage.setItem("amountregular", resp.amount);

          this.$router.push("/bank");
        } else {
          this.$toast.error("กรุณา กรอกจำนวน", {
            position: "top-center",
            timeout: 1500,
          });
        }
      } catch (error) {
        this.$toast.error("bad", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
  },
  beforeDestroy() {
    if (sessionStorage.getItem("access_token")) {
      console.log("IF-BEFORE_UPDATE");
      let timerInterval;
      Swal.fire({
        title: "กรุณาเช็คเลขบัญชีทุกครั้งก่อนทำการโอน",
        text: "ต้องใช้เลขบัญชีที่สมัครโอนมาเท่านั้น",

        // imageUrl: "https://omgbet888.net/image/popup.png",
        // imageWidth: "100%",
        // imageHeight: "100%",

        // html: " ประมาน <b></b> นาที.",
        timer: 3456,
        timerProgressBar: true,
        background: false,
        showConfirmButton: true,
        allowOutsideClick: true,

        didOpen: () => {
          // Swal.showLoading();
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
    } else {
      // alert("ELSE");
    }
  },
};
</script>

<style scoped>
a {
  color: #000 !important;
}
li {
  color: #000;
}

.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
}

.rounded-top {
  border-top-left-radius: 1.25rem !important;
  border-top-right-radius: 1.25rem !important;
}
.rounded-bottom {
  border-bottom-right-radius: 1.25rem !important;
  border-bottom-left-radius: 1.25rem !important;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 6px;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

button{
  color: #000;
}
</style>