<template>
  <div>
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9 mb-5">
        <div
          class="card border-0 rounded"
          style="margin-top: 100px !important; margin-bottom: 150px"
        >
          <div class="card-body" style="background-color: #2a2a2a">
            <div class="row">
              <div class="col-md-12">
                <div class="d-flex flex-column p-3">
                  <div class="text-center" style="font-size: larger">
                    ข้อมูลบัญชี
                  </div>

                  <div class="text-center mb-4">
                    <img
                      class="rounded-circle mt-3"
                      src="https://app.sagoal.org/assets/adminux/img/home/USER.png"
                      width="50"
                      height="50"
                    />
                  </div>

                  <div
                    class="text-boder rounded2 p-2 my-2"
                    style="background-color: rgb(27, 27, 27)"
                  >
                    เบอร์โทร : {{ tel }}
                  </div>

                  <div
                    class="text-boder rounded2 p-2 my-2"
                    style="background-color: rgb(27, 27, 27)"
                  >
                    ชื่อบัญชี : {{ first_name }} {{ last_name }}
                  </div>

                  <div
                    class="text-boder rounded2 p-2 my-2"
                    style="background-color: rgb(27, 27, 27)"
                  >
                    เลขที่บัญชี : {{ bank_number }}
                  </div>

                  <div
                    class="text-boder rounded2 p-2 my-2"
                    style="background-color: rgb(27, 27, 27)"
                  >
                    <div v-if="bank_name == 'bay'">
                      <h6>ธนาคาร : ธนาคารกรุงศรีอยุธยา</h6>
                    </div>
                    <div v-if="bank_name == 'ttb'">
                      <h6>ธนาคาร : ธนาคารทหารไทยธนชาต</h6>
                    </div>
                    <div v-if="bank_name == 'bbla'">
                      <h6>ธนาคาร : ธนาคารกรุงเทพ</h6>
                    </div>
                    <div v-if="bank_name == 'gsb'">
                      <h6>ธนาคาร : ธนาคารออมสิน</h6>
                    </div>
                    <div v-if="bank_name == 'kbnk'">
                      <h6>ธนาคาร : ธนาคารกสิกรไทย</h6>
                    </div>
                    <div v-if="bank_name == 'ktba'">
                      <h6>ธนาคาร : ธนาคารกรุงไทย</h6>
                    </div>
                    <div v-if="bank_name == 'scb'">
                      <h6>ธนาคาร : ธนาคารไทยพาณิชย์</h6>
                    </div>
                    <div v-if="bank_name == 'tmb'">
                      <h6>ธนาคาร : ธนาคารทหารไทย</h6>
                    </div>
                    <div v-if="bank_name == 'promptpay'">
                      <h6>ธนาคาร : promptpay</h6>
                    </div>
                    <div v-if="bank_name == 'baac'">
                      <h6>ธนาคาร : เพื่อการเกษตรและสหกรณ์การเกษตร</h6>
                    </div>
                    <div v-if="bank_name == 'cimb'">
                      <h6>ธนาคาร : ซีไอเอ็มบีไทย</h6>
                    </div>
                    <div v-if="bank_name == 'citi'">
                      <h6>ธนาคาร : ซิตี้แบงค์</h6>
                    </div>
                    <div v-if="bank_name == 'ghb'">
                      <h6>ธนาคาร :อาคารสงเคราะห์</h6>
                    </div>
                    <div v-if="bank_name == 'hsbc'">
                      <h6>ธนาคาร : ฮ่องกงและเซี่ยงไฮ้</h6>
                    </div>
                    <div v-if="bank_name == 'ibank'">
                      <h6>ธนาคาร :อิสลามแห่งประเทศไทย</h6>
                    </div>
                    <div v-if="bank_name == 'icbc'">
                      <h6>ธนาคาร : สินเอเซีย</h6>
                    </div>
                    <div v-if="bank_name == 'kkp'">
                      <h6>ธนาคาร : เกียรตินาคิน</h6>
                    </div>
                    <div v-if="bank_name == 'lhbank'">
                      <h6>ธนาคาร : แลนด์ แอนด์ เฮ้าส์</h6>
                    </div>
                    <div v-if="bank_name == 'mizuho'">
                      <h6>ธนาคาร : มิซูโฮ</h6>
                    </div>
                    <div v-if="bank_name == 'scbt'">
                      <h6>ธนาคาร : สแตนดาร์ดชาร์เตอร์ด ประเทศไทย</h6>
                    </div>
                    <div v-if="bank_name == 'TBANK'">
                      <h6>ธนาคาร : ธนชาต</h6>
                    </div>
                    <div v-if="bank_name == 'tcd'">
                      <h6>ธนาคาร : ไทยเครดิตเพื่อรายย่อย</h6>
                    </div>
                    <div v-if="bank_name == 'tisco'">
                      <h6>ธนาคาร : ธนาคารทิสโก้</h6>
                    </div>
                    <div v-if="bank_name == 'uob'">
                      <h6>ธนาคาร : ธนาคารยูโอบี</h6>
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
              <router-link to="/changPassword" class="w-100">
                <div class="col-md-12 text-center mt-2">
                  <img
                    class="img-fluid p-3"
                    src="assets/images/custom/cpw.png"
                  />
                </div>
              </router-link>

              <div class="col-md-12 text-center mt-1">
                <li @click="logout" class="nav-link">
                  <img class="img-fluid p-0" src="assets/images/custom/logout.png" />
                </li>
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
    logout() {
      const removeToken = sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      location.reload();
      if (removeToken == null) {
        this.$router.push("/login");
      }
    },
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

<style scoped>
* {
  color: wheat !important;
  font-weight: 300 !important;
}

.rounded {
    border-radius: 1.25rem !important;
}

.rounded2{
  border-radius: 0.25rem !important;
}
.text-boder{
  border: 1.5px solid wheat !important;
}


</style>