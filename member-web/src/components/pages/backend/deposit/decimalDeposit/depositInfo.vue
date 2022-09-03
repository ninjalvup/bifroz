<template>
  <div id="home ">
    <!-- ข้อมูลการฝากทศนิยม -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <UserData />
        <div class="mb-4"></div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <!-- <li class="breadcrumb-item" aria-current="page">
              <router-link to="/deposit">ฝากเงิน</router-link>
            </li>-->
            <li class="breadcrumb-item active" aria-current="page">
              ข้อมูลการโอน
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- <div class="row  justify-content-center">
      <div class="col-md-9">
        <div class="card border-0 shadow mt-4">
          <div class="card-body">
            รายละเอียดการโอน
            <hr />
            <div class="amountInfo">
              ยอดโอน : {{ balance
              }}<i
               @click="copyMoney"
                v-clipboard:copy="balance"
                class="far fa-copy pl-3"
              ></i>
              <p v-if="countDown != 0">
                <span>โปรดโอนเงินภายใน {{ countDown }} วินาที</span>
              </p>
              <p v-if="countDown == 0" class="text-danger">
                <span>หมดเวลาดำเนินการ</span>
              </p>
            </div>
            <div class="card border-0 mt-3">
             
              <div class="card-body">
                <div>
                  <h5>บัญชีรับเงินโอน</h5>
                  <div class="card-deposit">
                    <div class="card-body">

                      <div v-for="data in bank" v-bind:key="data.id">
                        <div
                          class="d-flex justify-content-start mb-4 mt-2"
                          v-if="
                            data.bank_status == '1' &&
                              data.bank_name !== 'truemoney' && data.bank_type == '1' && data.type_deposit == '1'
                          "
                        >
                          <img
                            :src="
                              require(`./../../../../../../public/assets/images/banks/${data.bank_name.toLowerCase()}.png`)
                            "
                            width="60"
                            height="60"
                            class="icon"
                          />
                          <div></div>
                          <div class="ml-3 " style="word-wrap: break-word;   width: 9em;  ">
                            <h6>ชื่อบัญชี:{{ data.bank_account_name }}</h6>
                            <h6>
                              <div>
                                <div v-if="data.bank_name == 'bay'">
                                  <h6>ธนาคาร: ธนาคารกรุงศรีอยุธยา</h6>
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
                                  <h6>
                                    ธนาคาร: เพื่อการเกษตรและสหกรณ์การเกษตร
                                  </h6>
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
                              style="height: 50px; min-width: 110px; "
                            >
                              คัดลอกหมาย
                              <br>
                              เลขบัญชี
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <h5 class="text-danger pl-2 mt-2">
                  **หากไม่ได้รับเครดิต หลังโอนเกิน 3 นาที
                  ส่งสลิปแจ้งแอดมินได้เลยค่ะ คลิ๊กที่
                   <a  :href="line" type="button" class="btn btn-outline-success" target="blank">Line</a>
                </h5>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12 text-center">
                <router-link
                  to="/home"
                  value="withdraw"
                  class="btn btn-blue btn-lg  rounded-pill text-center text-white" style="background: linear-gradient(0deg, #007bff 0%, rgb(0 121 255 / 62%) 100%);"
                >
                  <i class="fas fa-check-circle"></i> กลับสู่หน้าหลัก
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row justify-content-center">
      <div class="col-md-9">
        <div class="card mt-3 border-0 shadow">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-6">
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
                      data.bank_status == '1' &&
                      data.bank_name !== 'truemoney' &&
                      data.bank_type == '1' &&
                      data.type_deposit == '1'
                    "
                  >
                    <img
                      :src="
                        require(`./../../../../../../public/assets/images/banks/${data.bank_name.toLowerCase()}.png`)
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

              <div class="col-12 col-md-6 mt-lg-4">
                <div class="text-center">
                  <h4><u>จำนวนเงินที่ต้องโอน </u></h4>
                  <div class="centershow">
                    <h3 class="mt-4">{{ balance }} บาท</h3>
                  </div>

                  <button
                    type="button "
                    class="btn-copy"
                    @click="copyMoney"
                    v-clipboard:copy="balance"
                  >
                    คัดลอกจำนวนเงิน
                  </button>
                  <div class="" v-if="countDown != 0">
                    เวลาทำรายการ
                    <span class="text-danger"> {{ countDown }} </span>วินาที
                  </div>
                  <p v-if="countDown == 0" class="text-danger">
                    <span>หมดเวลาดำเนินการ</span>
                  </p>
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
import { baseURL } from "./../../../../../services/api";
import UserData from "./../../home/user-data";

export default {
  components: {
    UserData,
  },
  data() {
    return {
      bank: [],
      countDown: 180,
      amount: "",
      balance: "",
      line: "",
    };
  },
  mounted() {
    this.balance = sessionStorage.getItem("balance");
    axios({
      method: "get",
      url: baseURL + "/photo/prefix",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.line = response.data.data.prefix[0].line;
      })
      .catch((error) => {
        console.log(error);
      });
    this.countDownTimer();
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
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    copy() {
      this.$toast.success("Copy เลขบัญชีสำเร็จ", {
        position: "top-right",
        timeout: 1500,
      });
    },
    copyMoney() {
      this.$toast.success("Copy ยอดโอนสำเร็จ", {
        position: "top-right",
        timeout: 1500,
      });
    },
  },
};
</script>
