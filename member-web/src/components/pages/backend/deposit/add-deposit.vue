<template>
  <div id="adDeposite">
    <!-- ฝากกพร้อมเพล -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/depositlist">เลือกการฝาก</router-link>
            </li>
            <!-- <li class="breadcrumb-item" aria-current="page">
              <router-link to="/deposit">ฝากเงิน</router-link>
            </li>-->
            <li class="breadcrumb-item active" aria-current="page">PromotPay</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card">
          <div class="card-body rounded">
            <div class="card">
              <div class="card-header">
                <h5>ฝากเงิน</h5>
              </div>
              <div class="card-body">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-12" >
                      <label>จำนวนเงิน </label><br>
                      <!-- <label >บัญชีที่รับเงิน : 0884092629</label> -->
                      <select
                        class="form-control mb-3"
                        name="bank_name"
                        id="bank_name"
                        v-model="uuid"
                      >
                        <option selected value >เลือกโปรโมชัน</option>
                        <option v-bind:value="{uuid: data.uuid, promotion_name: data.promotion_name}" v-for="data in promotion" v-bind:key="data.uuid">{{data.promotion_name}} | ฝากขั้นต่ำ: {{data.min_deposit}} บาท | ฝากสูงสุด: {{data.max_deposit}} บาท</option>   
                      </select>
                      <select
                        class="form-control mb-3"
                        name="bank_name"
                        id="bank_name"
                        v-model="amount"
                      >
                        <option selected  value>เลือก จำนวนเงิน</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value=" ">กรอกจำนวนเงิน</option>
                      </select>
                      <input
                        v-model="amount"
                        type="number"
                        class="form-control"
                        placeholder="กรุณากรอกจำนวนเงิน"
                        :disabled="amount == 100 ||amount == 200 ||amount == 300 ||amount == 400 ||amount == 500 ||amount == 1000 ||amount == 5000  ||!amount"
                      />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-md-12 text-center">
                      <button
                        @click.prevent="deposit"
                        class="btn btn-blue btn-sm btn-block rounded-pill text-center text-white"
                        :disabled="!amount"
                      >
                        <i class="fas fa-check-circle"></i> ยืนยัน
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
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card">
          <div class="card-body rounded">
            <div class="card">
              <div class="card-header">
                <h5>Qr Code</h5>
              </div>
              <div class="card-body text-center">
                <img class="img-qr" v-bind:src="qrcode" height="200"  />
              </div>
              <h6 class="text-center">{{text}}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bankService from "./../../../../services/bankService";
import { baseURL } from '../../../../services/api';
export default {
  data() {
    return {
      amount: "",
      qrcode: "",
      text: "",
      uuid: '',
      promotion_name: "",
      promotion: [],
      min_deposit:"",
      promotionMin:''
    };
    
  },
   mounted() {
    axios({
      method: "get",
      url: baseURL+"/promotion/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.promotion = response.data.data;
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async deposit() {
      try {
       
      
        const depositForm = {
          amount: this.amount,
          promotion_uuid: this.uuid.uuid,
          annotation: this.uuid.promotion_name,
        };
        const resp = await bankService.addDeposit(depositForm);
        this.text = "โปรดเเสกน Qr Code เพื่อฝากเงินจำนวน : " + this.amount + " บาท";
        this.qrcode = resp.data.qrcode;
        this.$toast.success("ทำรายการสำเร็จกรุณาเเกน Qr Code", {
          position: "top-right",
          timeout: 1500,
        });
      } catch (error) {
        this.$toast.error("กรุณากรอกจำนวนเงินของท่าน", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
  },
};
</script>

<style >
</style>