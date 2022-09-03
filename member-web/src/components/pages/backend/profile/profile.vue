<template>
  <div>
    <div class="row justify-content-center">
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
              โปรไฟล์
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card shadow border-0">
          <div class="card-body rounded">
            <div class="row">
              <div class="col-md-12">
                <div class="d-flex flex-column align-items-center p-3 py-5">
                  <img
                    class="rounded-circle mt-3 pb-2"
                    src="assets/images/icons/profile.png"
                    width="100"
                    height="100"
                  />
                  <h5 class="font-weight-bold">
                    {{ first_name }} {{ last_name }}
                  </h5>
                  <div class="d-flex justify-content-start mb-4 mt-4">
                    <div class="mr-3">
                      <h6>
                        <div>
                          <h6>เบอร์โทร: {{ tel }}</h6>
                          <div v-if="bank_name == 'bay'">
                            <h6>ธนาคาร: ธนาคารกรุงศรีอยุธยา</h6>
                          </div>
                            <div v-if="bank_name == 'ttb'">
                            <h6>ธนาคาร: ธนาคารทหารไทยธนชาต</h6>
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
                      <h6>เลขที่บัญชี: {{ bank_number }}</h6>
                    </div>
                    <div>
                      <div v-if="bank_name == 'bay'">
                        <img src="assets/images/banks/bay.png" />
                      </div>
                      <div v-if="bank_name == 'bbla'">
                        <img src="assets/images/banks/bbl.png" />
                      </div>
                      <div v-if="bank_name == 'gsb'">
                        <img src="assets/images/banks/gsb.png" />
                      </div>
                      <div v-if="bank_name == 'kbnk'">
                        <img src="assets/images/banks/kbank.png" />
                      </div>
                      <div v-if="bank_name == 'ktba'">
                        <img src="assets/images/banks/ktb.png" />
                      </div>
                      <div v-if="bank_name == 'scb'">
                        <img src="assets/images/banks/scb.png" />
                      </div>
                      <div v-if="bank_name == 'tmb'">
                        <img src="assets/images/banks/tmb.png" />
                      </div>
                      <div v-if="bank_name == 'baac'">
                        <img src="assets/images/banks/baac.png" />
                      </div>
                      <div v-if="bank_name == 'cimb'">
                        <img src="assets/images/banks/cimb.png" />
                      </div>
                      <div v-if="bank_name == 'citi'">
                        <img src="assets/images/banks/citi.png" />
                      </div>
                      <div v-if="bank_name == 'ghb'">
                        <img src="assets/images/banks/ghb.png" />
                      </div>
                      <div v-if="bank_name == 'hsbc'">
                        <img src="assets/images/banks/hsbc.png" />
                      </div>
                      <div v-if="bank_name == 'ibank'">
                        <img src="assets/images/banks/ibank.png" />
                      </div>
                      <div v-if="bank_name == 'icbc'">
                        <img src="assets/images/banks/icbc.png" />
                      </div>
                      <div v-if="bank_name == 'kkp'">
                        <img src="assets/images/banks/kkp.png" />
                      </div>
                      <div v-if="bank_name == 'lhbank'">
                        <img src="assets/images/banks/lhbank.png" />
                      </div>
                      <div v-if="bank_name == 'mizuho'">
                        <img src="assets/images/banks/mizuho.png" />
                      </div>
                      <div v-if="bank_name == 'scbt'">
                        <img src="assets/images/banks/scbt.png" />
                      </div>
                      <div v-if="bank_name == 'tbank'">
                        <img src="assets/images/banks/tbank.png" />
                      </div>
                      <div v-if="bank_name == 'tcd'">
                        <img src="assets/images/banks/tcd.png" />
                      </div>
                      <div v-if="bank_name == 'tisco'">
                        <img src="assets/images/banks/tisco.png" />
                      </div>
                      <div v-if="bank_name == 'ubo'">
                        <img src="assets/images/banks/ubo.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="row">
            <div class="col-md-12">
              <hr />
              <router-link to="/editProfile" class="text-dark">
                จัดการโปรไฟล์
                <i class="fas fa-angle-right float-right"></i>
              </router-link>
            </div>
          </div> -->
            <div class="row">
              <div class="col-md-12">
                <hr />
                <router-link to="/changPassword" class="text-dark">
                  เปลี่ยนรหัสผ่าน
                  <i class="fas fa-angle-right float-right"></i>
                </router-link>
                <!-- <hr />รับโบนัส
              <div class="float-right">
                <div class="custom-control custom-switch" >
                  <input  type="checkbox" v-model="bonus" class="custom-control-input" id="customSwitches" value="1" />
                  <label @click.prevent="bonusUpdate" class="custom-control-label" for="customSwitches"></label>
                </div>
              </div> -->

                <hr />
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
import profileService from "./../../../../services/profile";
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
  },
  methods: {
    //bonus toggle switch
    async bonusUpdate() {
      try {
        if (this.bonus == 0) {
          this.bonus = 1;
        } else {
          this.bonus = 0;
        }
        const bonusForm = {
          bonus: this.bonus,
        };
        console.log(bonusForm);
        await profileService.bonusUpdate(bonusForm);
        if (this.bonus == 1) {
          this.$toast.success("รับโบนัส", {
            position: "top-right",
            timeout: 1500,
          });
        }
        if (this.bonus == 0) {
          this.$toast.error("ไม่รับโบนัส", {
            position: "top-right",
            timeout: 1500,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>