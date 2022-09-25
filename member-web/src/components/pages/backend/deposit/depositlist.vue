<template>
  <div id="">
    <!-- หน้ารายการฝากเงิน -->
    <!-- <div class="row justify-content-center">
      <div class="col-md-9 mt-3">
        <nav aria-label="breadcrumb">
          <ol
            class="breadcrumb shadow"
            style="
              background-color: #1b1b1b;
            "
          >
            <li class="breadcrumb-item">
              <router-link to="/home" style="color: black; font-weight: bold"
                >หนัาหลัก</router-link
              >
            </li>
            <li
              class="breadcrumb-item active"
              aria-current="page"
              style="color: black; font-weight: bold"
            >
              เลือกการฝาก
            </li>
          </ol>
        </nav>
      </div>
    </div> -->

    <div class="row">
      <div class="col-4 p-2">
        <router-link to="/depositlist">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-1.webp"
            alt=""
          />
        </router-link>
      </div>

      <div class="col-4 p-2">
        <router-link to="/withdraw">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-2.webp"
            alt=""
          />
        </router-link>
      </div>

      <div class="col-4 p-2">
        <router-link to="/report">
          <img
            class="img-fluid w-100"
            src="assets/images/custom/aff-menu-3.webp"
            alt=""
          />
        </router-link>
      </div>
    </div>

    <div class="row justify-content-center"
    style="
    margin-top: 100px;
    margin-bottom: 100px
    
      "
    >
      <div class="col-md-9">
        <!-- <UserData /> -->
        <div class="card mt-3 border-0"
        style="
    background-color: #2a2a2a;
"
        >
          <div
            class="card-body border-0 rounded"
            style="
            background-color: #1b1b1b;
            "
          >
            <i class="fab fa-bitcoin text-danger"></i> <span class="text-white">ฝาก</span> 
            <div class="float-right">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  v-model="bonus"
                  class="custom-control-input"
                  id="customSwitches"
                  value="1"
                />
                <!-- <label
                  @click.prevent="bonusUpdate"
                  class="custom-control-label"
                  for="customSwitches"
                  >โบนัส</label
                > -->
              </div>
            </div>

            <div class="row mlstyle">
              <router-link to="/bankInfo" v-if="status_auto == '1'">
                <div class="">
                  <div class="mrimg">
                    <img
                      class="zoom"
                      src="assets/images/icons/depositauto.png"
                      alt
                      height="100"
                    />
                  </div>
                </div>
              </router-link>

              <router-link to="/decimal" v-if="status_decimal == '1'">
                <div class="">
                  <div class="mrimg">
                    <img
                      class="zoom"
                      src="assets/images/icons/b2.png"
                      alt
                      height="100"
                    />
                  </div>
                </div>
              </router-link>

              <router-link to="/trueinfo" v-if="status_truewallet">
                <div class="">
                  <div class="mrimg">
                    <img
                      class="zoom"
                      src="assets/images/icons/trueicon.png"
                      alt
                      height="100"
                    />
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- รายการฝาก -->
    <!-- <div class="p-0 mt-1">
      <table class="table table-striped"
            style="
        background-image: url(assets/images/custom/bg-menu.png);
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        background-position: center;
      "
      >
        <thead>
          <tr>
            <th scope="col">ฝาก ฿</th>
            <th scope="col">ยอดก่อนฝาก</th>
                        <th scope="col">ยอดหลังฝาก</th>
            <th scope="col">วันที่ฝาก</th>
            <th scope="col">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in reportdeposit" v-bind:key="data.status">
            <td
              v-if="
                data.transaction_status == 'Success' ||
                data.transaction_status == 'manual'
              "
            >
              {{ data.amount | formatNumber }}
            </td>
            <td>{{data.credit_before| formatNumber}}</td>
                        <td>{{data.credit_after| formatNumber}}</td>
            <td
              v-if="
                data.transaction_status == 'Success' ||
                data.transaction_status == 'manual'
              "
            >
              {{ data.bank_time }}
            </td>
            <td
              v-if="
                data.transaction_status == 'Success' ||
                data.transaction_status == 'manual'
              "
            >
              <div
                v-if="
                  data.transaction_status == 'Success' ||
                  data.transaction_status == 'manual'
                "
              >
                <p>สำเร็จ</p>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr v-if="reportdeposit.length == '0'">
            <td colspan="8" class="text-center text-danger">
              <i class="fas fa-times"></i>
              ไม่มีข้อมูล !
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Promptpay</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            ยังไม่เปิดให้ใช้งานในขณะนี้
            <i class="fas fa-exclamation-triangle text-danger"></i>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary rounded-pill"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">เเลกเงิน</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            ยังไม่เปิดให้ใช้งานในขณะนี้
            <i class="fas fa-exclamation-triangle text-danger"></i>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary rounded-pill"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import UserData from "./../home/user-data";
import axios from "axios";
import profileService from "./../../../../services/profile";
import { baseURL } from "../../../../services/api";
export default {
  components: {
    // UserData,
  },
  data() {
    return {
      bonus: "",
      checkbank: "",
      listgame: "",
      bank_status: "",
      status_decimal: "",
      status_auto: "",
      status_truewallet: "",
      option_truewallet: "",
    };
  },
  mounted() {
    // axios({
    //   method: "get",
    //   url: baseURL + "/member/reportdeposit",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + sessionStorage.getItem("access_token"),
    //   },
    // })
    //   .then((response) => {
    //     this.reportdeposit = response.data.data.status;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response.data == "Unauthorized") {
    //       sessionStorage.removeItem("access_token");
    //     }
    //   });

    axios({
      method: "get",
      url: baseURL + "/member/bank",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        var depositType = response.data.data;
        // console.log(depositType);
        // let aaa = 'truewallet';

        // for (let index = 0; index < depositType.length; index++) {
        //   Object.keys(depositType[index].bank_name).forEach((key) => {
        //     // if (aaa == key) {
        //       // this.selected.push(data[index].shareSetting.casino[key]);
        //       console.log(key);
        //       // console.log(aaa);
        //     // }
        //   });
        // }

        for (let index = 0; index < depositType.length; index++) {
          // console.log(depositType[index].bank_name);
          if (
            depositType[index].bank_name === "truemoney" &&
            depositType[index].bank_status == "1"
          ) {
            this.status_truewallet = depositType[index].bank_name;
          } else if (depositType[index].bank_type == "1") {
            if (
              depositType[index].type_deposit == "1" &&
              depositType[index].bank_status == "1"
            ) {
              this.status_decimal = "1";
            }
            if (
              depositType[index].type_deposit == "0" &&
              depositType[index].bank_status == "1"
            ) {
              this.status_auto = "1";
            }
          }
        }

        if (this.status_decimal) {
          this.status_decimal = "1";
        } else {
          this.status_decimal = "0";
        }
        if (this.status_auto) {
          this.status_auto = "1";
        } else {
          this.status_auto = "0";
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
        this.bonus = response.data.data.bonus;
        this.checkbank = response.data.data.checkbank;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    //โบนัส
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
.zoom:hover {
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}
img {
  /* -webkit-filter: drop-shadow(5px 5px 5px rgb(125, 138, 250));
  filter: drop-shadow(5px 5px 5px rgb(151, 122, 255)); */
}

.zoom {
  height: 80px;
  margin: 0px;
  width: 90px;
}

.mlstyle {
  margin-left: 50px !important;
  margin-top: 20px;
  padding-left: 32px !important;
}
.mrimg {
  margin-right: 20px;
}
* {
  color: #000;
  font-weight: 700 !important;
}

@media only screen and (max-width: 768px) {
  .zoom {
    height: 60px;
    margin: 9px;
    width: 70px;
  }
  .mlstyle {
    margin-left: 0px !important;
    padding-left: 3px !important;
  }
  .mrimg {
    margin-right: 5px;
  }
}

.rounded {
    border-radius: 1.25rem !important;
}
</style>
