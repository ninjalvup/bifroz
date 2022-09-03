<template>
  <div id="home">
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <!-- <li class="breadcrumb-item" aria-current="page">
              <router-link to="/deposit">ฝากเงิน</router-link>
            </li>-->
            <li class="breadcrumb-item active" aria-current="page">
              รายละเอียดการถอน
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card shadow border-0 mt-4">
          <div class="card-body">
            รายละเอียดการถอน
            <hr />
            <div class="col-md-12">
              <label for="formGroupExampleInput">เลขที่รายการ</label>
              <div class="row">
                <img
                  class="ml-4"
                  src="assets/images/icons/money.png"
                  width="60"
                  height="60"
                />
                <div class="ml-3">
                  <label for="">เครดิต </label>
                </div>
              </div>
              <div class="row">
                <img
                  class="ml-5"
                  src="assets/images/arrow.png"
                  width="20"
                  height="40"
                />
              </div>
              <div class="row">
                <div class="d-flex justify-content-start mb-4 mt-2 ml-4">
                  <img
                    :src="
                      require(`./../../../../../public/assets/images/banks/${bank_name.toLowerCase()}.png`)
                    "
                    width="55"
                    height="55"
                    class="icon"
                  />
                  <div class="ml-3">
                    <h6>ชื่อบัญชี: {{ first_name }} {{ last_name }}</h6>
                    <h6>
                      <div>
                        <div v-if="bank_name == 'bay'">
                          <h6>ธนาคาร: ธนาคารกรุงศรีอยุธยา</h6>
                        </div>
                         <div v-if="bank_name == 'ttb'">
                          <h6>ธนาคาร: ธนาคารทหารไทยธนชาต (TTB)</h6>
                        </div>
                        <div v-if="bank_name == 'bbla'">
                          <h6>ธนาคาร: ธนาคารกรุงเทพ</h6>
                        </div>
                        <div v-if="bank_name == 'gsb'">
                          <h6>ธนาคาร: ธนาคารออมสิน</h6>
                        </div>
                        <div v-if="bank_name == 'kbnk'">
                          <h6>ธนาคาร: ธนาคารกสิกรไทย</h6>
                        </div>
                        <div v-if="bank_name == 'ktba'">
                          <h6>ธนาคาร: ธนาคารกรุงไทย</h6>
                        </div>
                        <div v-if="bank_name == 'scb'">
                          <h6>ธนาคาร: ธนาคารไทยพาณิชย์</h6>
                        </div>
                        <div v-if="bank_name == 'tmb'">
                          <h6>ธนาคาร: ธนาคารทหารไทย</h6>
                        </div>
                        <div v-if="bank_name == 'promptpay'">
                          <h6>ธนาคาร: promptpay</h6>
                        </div>
                        <div v-if="bank_name == 'baac'">
                          <h6>ธนาคาร: เพื่อการเกษตรและสหกรณ์การเกษตร</h6>
                        </div>
                        <div v-if="bank_name == 'cimb'">
                          <h6>ธนาคาร: ซีไอเอ็มบีไทย</h6>
                        </div>
                        <div v-if="bank_name == 'citi'">
                          <h6>ธนาคาร: ซิตี้แบงค์</h6>
                        </div>
                        <div v-if="bank_name == 'ghb'">
                          <h6>ธนาคาร:อาคารสงเคราะห์</h6>
                        </div>
                        <div v-if="bank_name == 'hsbc'">
                          <h6>ธนาคาร: ฮ่องกงและเซี่ยงไฮ้</h6>
                        </div>
                        <div v-if="bank_name == 'ibank'">
                          <h6>ธนาคาร:อิสลามแห่งประเทศไทย</h6>
                        </div>
                        <div v-if="bank_name == 'icbc'">
                          <h6>ธนาคาร: สินเอเซีย</h6>
                        </div>
                        <div v-if="bank_name == 'kkp'">
                          <h6>ธนาคาร: เกียรตินาคิน</h6>
                        </div>
                        <div v-if="bank_name == 'lhbank'">
                          <h6>ธนาคาร: แลนด์ แอนด์ เฮ้าส์</h6>
                        </div>
                        <div v-if="bank_name == 'mizuho'">
                          <h6>ธนาคาร: มิซูโฮ</h6>
                        </div>
                        <div v-if="bank_name == 'scbt'">
                          <h6>ธนาคาร: สแตนดาร์ดชาร์เตอร์ด ประเทศไทย</h6>
                        </div>
                        <div v-if="bank_name == 'TBANK'">
                          <h6>ธนาคาร: ธนชาต</h6>
                        </div>
                        <div v-if="bank_name == 'tcd'">
                          <h6>ธนาคาร: ไทยเครดิตเพื่อรายย่อย</h6>
                        </div>
                        <div v-if="bank_name == 'tisco'">
                          <h6>ธนาคาร: ธนาคารทิสโก้</h6>
                        </div>
                        <div v-if="bank_name == 'uob'">
                          <h6>ธนาคาร: ธนาคารยูโอบี</h6>
                        </div>
                      </div>
                    </h6>
                    <h6>เลขบัญชี: {{ bank_number }}</h6>
                  </div>
                </div>
              </div>
              <hr class="mt-3" />
              <label for="formGroupExampleInput">ยอดถอน</label
              ><label class="float-right" for="">{{ amountWithdraw }}</label
              ><br />
              <hr />
              <span>กรุณารอรอดำเนินการภายใน 30 นาที</span>
            </div>
            <div class="row mt-3">
              <div class="col-md-12 text-center">
                <router-link
                  to="/home"
                  value="withdraw"
                  class="btn btn-blue btn-lg rounded-pill text-center text-white"
                >
                  <i class="fas fa-check-circle"></i> กลับสู่หน้าหลัก
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { baseURL } from "./../../../../services/api";
export default {
  name: "home",
  data() {
    return {
      tel: "",
      first_name: "",
      last_name: "",
      bank_name: "",
      bank_number: "",
      bonus: "",
      credit: "",
      amountWithdraw: "",
    };
  },
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
        this.bonus = response.data.data.bonus;
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
        this.credit2 = response.data.data.credit;
        this.credit3 = this.credit2 | this.formatNumber;
        this.amountWithdraw = sessionStorage.getItem("amount");
        console.log(this.amountWithdraw);
        if (this.credit3 == 0) {
          this.credit = 0;
        } else {
          this.credit = this.credit2;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data == "Unauthorized") {
          sessionStorage.removeItem("access_token");
        }
      });
  },
};
</script>