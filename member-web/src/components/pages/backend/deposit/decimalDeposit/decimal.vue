<template>
  <div id="adDeposite">
    <!-- ฝากทศนิยม -->
    <br />


    <div class="row"
    style="
    margin-top: 70px;
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
                        @click.prevent="depositDecimal"
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
import bankService from "./../../../../../services/bankService";
import { baseURL } from "./../../../../../services/api";
import axios from "axios";
export default {
  data() {
    return {
      amount: "",
      balancet: "",
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
    async depositDecimal() {
      try {
        let checkamount = parseInt(this.amount);

        if (checkamount > 0) {
          const depositForm = {
            amount: checkamount,
          };
          const resp = await bankService.decimalDeposit(depositForm);
          this.$router.push("/depositInfo");

          sessionStorage.setItem("balance", resp.amount);
          this.balance = resp.amount;
          this.$store.state.money = this.balance = resp.amount;
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
};
</script>

<style  scoped>
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgb(255 255 255);
  border-bottom: 1px solid rgb(197 197 197 / 13%);
}
* {
  color: #000;
  font-weight: 700 !important;
}

button{
  color: #000;
}
</style>