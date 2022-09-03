<template>
  <div id="home">
    <!-- ธนาคารฝาก -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/depositlist">ธนาคาร</router-link>
            </li>
            <!-- <li class="breadcrumb-item" aria-current="page">
              <router-link to="/deposit">ฝากเงิน</router-link>
            </li>-->
            <li class="breadcrumb-item active" aria-current="page">
              การฝาก
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row  justify-content-center">
      <div class="col-md-9">
        <UserData />
        <div class="card mt-3 border-0 shadow ">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-6 ">
                <h5>
                  บัญชีธนาคาร <br />
                  <!-- <span style="font-size: 12px" class="alert alert-danger" role="alert">
             ลูกค้าที่ใช้บัญชีธนาคารไทยพานิชย์(SCB) กรุณาแจ้งสลิป เพื่อความรวดเร็ว 
          </span> -->
                </h5>
                <div v-for="data in bank" v-bind:key="data.id">
                  <div
                    class="d-flex justify-content-start mb-4 mt-2"
                    v-if="
                      data.bank_status === '1' &&
                        data.bank_type === '1' &&
                        data.type_deposit === '0' &&
                        data.bank_name !== 'truemoney'
                    "
                  >
                    <img
                      :src="
                        require(`./../../../../../public/assets/images/banks/${data.bank_name.toLowerCase()}.png`)
                      "
                      width="55"
                      height="55"
                      class="icon"
                    />
                    <div class="ml-3">
                      <h6>ชื่อบัญชี:{{ data.bank_account_name }}</h6>
                      <h6>
                        <div>
                          <div v-if="data.bank_name == 'bay'">
                            <h6>ธนาคาร: ธนาคารกรุงศรีอยุธยา</h6>
                          </div>
                          <div v-if="data.bank_name == 'ttb'">
                            <h6>ธนาคาร: ธนาคารทหารไทยธนชาต (TTB)</h6>
                          </div>
                          <div v-if="data.bank_name == 'bbla'">
                            <h6>ธนาคาร: ธนาคารกรุงเทพ</h6>
                          </div>
                          <div v-if="data.bank_name == 'gsb'">
                            <h6>ธนาคาร: ธนาคารออมสิน</h6>
                          </div>
                          <div v-if="data.bank_name == 'kbnk'">
                            <h6>ธนาคาร: ธนาคารกสิกรไทย</h6>
                          </div>
                          <div v-if="data.bank_name == 'ktba'">
                            <h6>ธนาคาร: ธนาคารกรุงไทย</h6>
                          </div>
                          <div v-if="data.bank_name == 'scb'">
                            <h6>ธนาคาร: ธนาคารไทยพาณิชย์</h6>
                          </div>
                          <div v-if="data.bank_name == 'tmb'">
                            <h6>ธนาคาร: ธนาคารทหารไทย</h6>
                          </div>
                          <div v-if="data.bank_name == 'promptpay'">
                            <h6>ธนาคาร: promptpay</h6>
                          </div>
                          <div v-if="data.bank_name == 'baac'">
                            <h6>ธนาคาร: เพื่อการเกษตรและสหกรณ์การเกษตร</h6>
                          </div>
                          <div v-if="data.bank_name == 'cimb'">
                            <h6>ธนาคาร: ซีไอเอ็มบีไทย</h6>
                          </div>
                          <div v-if="data.bank_name == 'citi'">
                            <h6>ธนาคาร: ซิตี้แบงค์</h6>
                          </div>
                          <div v-if="data.bank_name == 'ghb'">
                            <h6>ธนาคาร:อาคารสงเคราะห์</h6>
                          </div>
                          <div v-if="data.bank_name == 'hsbc'">
                            <h6>ธนาคาร: ฮ่องกงและเซี่ยงไฮ้</h6>
                          </div>
                          <div v-if="data.bank_name == 'ibank'">
                            <h6>ธนาคาร:อิสลามแห่งประเทศไทย</h6>
                          </div>
                          <div v-if="data.bank_name == 'icbc'">
                            <h6>ธนาคาร: สินเอเซีย</h6>
                          </div>
                          <div v-if="data.bank_name == 'kkp'">
                            <h6>ธนาคาร: เกียรตินาคิน</h6>
                          </div>
                          <div v-if="data.bank_name == 'lhbank'">
                            <h6>ธนาคาร: แลนด์ แอนด์ เฮ้าส์</h6>
                          </div>
                          <div v-if="data.bank_name == 'mizuho'">
                            <h6>ธนาคาร: มิซูโฮ</h6>
                          </div>
                          <div v-if="data.bank_name == 'scbt'">
                            <h6>ธนาคาร: สแตนดาร์ดชาร์เตอร์ด ประเทศไทย</h6>
                          </div>
                          <div v-if="data.bank_name == 'TBANK'">
                            <h6>ธนาคาร: ธนชาต</h6>
                          </div>
                          <div v-if="data.bank_name == 'tcd'">
                            <h6>ธนาคาร: ไทยเครดิตเพื่อรายย่อย</h6>
                          </div>
                          <div v-if="data.bank_name == 'tisco'">
                            <h6>ธนาคาร: ธนาคารทิสโก้</h6>
                          </div>
                          <div v-if="data.bank_name == 'uob'">
                            <h6>ธนาคาร: ธนาคารยูโอบี</h6>
                          </div>
                        </div>
                      </h6>
                      <h6>เลขบัญชี: {{ data.bank_number }}</h6>
                      <button
                        type="button "
                        class="btn-copy"
                        @click="copy"
                        v-clipboard:copy="data.bank_number"
                      >
                        คัดลอกหมายเลขบัญชี
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6  mt-lg-4 ">
                <div class="text-center ">
                  <h4><u>จำนวนเงินที่ต้องโอน </u></h4>
                  <div>
                    <h4 class="text-danger">
                      หมายเหตุ: ใช้บัญชีที่สมัครเข้ามาเท่านั้น
                    </h4>
                  </div>
                  <div class=" centershow">
                    <h3 class="mt-4">{{ amount }} บาท</h3>
                  </div>

                  <button
                    type="button "
                    class="btn-copy"
                    @click="copyamount"
                    v-clipboard:copy="amount"
                  >
                    คัดลอกจำนวนเงิน
                  </button>
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
import axios from "axios";
import UserData from "./../home/user-data";
import { baseURL } from "../../../../services/api";
// import Swal from "sweetalert2";

export default {
  components: {
    UserData,
  },
  data() {
    return {
      bank: [],
      checkbank: "",
      amount: 0,
    };
  },

  mounted() {
    this.getamount();

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
</style>
