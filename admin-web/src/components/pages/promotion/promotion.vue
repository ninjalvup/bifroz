<template>
  <div id="User">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-bullhorn" aria-hidden="true"></i> โปรโมชั่น
        </h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col">
                  <h3 class="card-title">ข้อมูลโปรโมชั่น</h3>
                </div>
                <div class="col">
                  <router-link to="addpromotion">
                    <button type="button" class="btn btn-secondary float-right">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                      เพิ่มโปรโมชัน
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table
                  id="basic-datatables"
                  class="display table table-striped table-hover"
                >
                  <thead style="text-align: center">
                    <tr>
                      <th>#</th>

                      <th>ชื่อโปรโมชัน</th>
                      <!-- <th>รูป</th> -->
                      <th>ประเภท</th>
                      <th>ฝากต่ำสุด</th>
                      <th>ฝากสูงสุด</th>
                      <th>โบนัสสูงสุด</th>
                      <th>อั้นถอน</th>
                      <th>ยอดเทิร์น</th>
                      <th>turn type</th>
                      <th>สถานะ</th>
                      <th>ตัวเลือก</th>
                    </tr>
                  </thead>
                  <div></div>
                  <tbody style="text-align: center">
                    <tr
                      v-for="(data, index) in promotion"
                      v-bind:key="data.uuid"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ data.promotion_name }}</td>
                      <!-- <td>
                        <img
                          class="mt-2 mb-2"
                          v-bind:src="data.promotion_image"
                          height="100"
                          width="120"
                        />
                      </td> -->
                      <td>
                        <div v-if="data.promotion_type_id == '1'">
                          <p>สมัครสมาชิกใหม่</p>
                        </div>
                        <div v-if="data.promotion_type_id == '2'">
                          <p>ฝากครั้งเเรกของวัน</p>
                        </div>
                        <div v-if="data.promotion_type_id == '3'">
                          <p>ฝากทั้งวัน</p>
                        </div>
                      </td>
                      <td>{{ data.min_deposit }}</td>
                      <td>{{ data.max_deposit }}</td>
                      <td>{{ data.max_bonus }}</td>
                      <td>{{ data.max_withdraw }}</td>
                      <td>{{ data.turn_over }}</td>
                      <td>
                        <div v-if="data.turn_type == 1">
                          <span class="badge badge-success">TurnWin</span>
                        </div>
                        <div v-if="data.turn_type == 2">
                          <span class="badge badge-warning">TurnOver</span>
                        </div>
                      </td>

                      <td>
                        <div v-if="data.status == 0">
                          <span class="badge badge-danger">ปิดใช้งาน</span>
                        </div>
                        <div v-if="data.status == 1">
                          <span class="badge badge-success">เปิดใช้งาน</span>
                        </div>
                      </td>
                      <td>
                        <a
                          class="btn btn-info btn-sm mr-1 text-white"
                          data-toggle="modal"
                          data-target="#modelId"
                          @click="getPromotionbyuuid(data.uuid)"
                          v-on:click="
                            getCondition(data.uuid, data.promotion_conditions)
                          "
                        >
                          <i class="fas fa-edit"></i>

                          เเก้ไข
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <!-- <tbody>
                    <tr v-if="!promotion.length == 0 ">
                      <td colspan="13" class="text-center text-danger">
                        <i class="fas fa-times"></i>
                        ไม่มีข้อมูล !
                      </td>
                    </tr>
                  </tbody> -->
                </table>
                <img
                  v-if="!isLoading"
                  class="rounded mx-auto d-block"
                  src="./../../../../public/200.gif"
                  width="150"
                />
              </div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="modelId"
              tabindex="-1"
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">แก้ไขโปรโมชัน</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- <form > -->
                    <form v-on:submit.prevent="submitUpdate">
                      <div class="row">
                        <div class="card-body">
                          <h4>ชื่อโปรโมชัน</h4>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="ชื่อโปรโมชัน"
                            v-model="promotion_name"
                            required
                          />
                        </div>
                        <div class="card-body col-md-6 mr-1">
                          <h4>ประเภทโปรโมชัน</h4>
                          <select
                            class="form-control text-"
                            v-model="promotion_type_id"
                            required
                          >
                            <option selected disabled value>
                              -เลือก ประเภทโปรโมชัน-
                            </option>
                            <option value="0">DEFAULT</option>

                            <option value="1">สมัครสมาชิกใหม่</option>
                            <option value="2">ฝากครั้งเเรกของวัน</option>
                            <option value="3">ฝากทั้งวัน</option>
                          </select>
                        </div>
                        <!-- <div class="card-body">
                          <div class="row">
                            <h4>รูปโปรโมชัน</h4>
                          </div>
                          <input
                            type="file"
                            id="myfile"
                            name="myfile"
                            @change="uploadImg"
                            required
                          />
                        </div> -->
                      </div>
                      <div class="row">
                        <div class="card-body col-md-6 mr-1">
                          <h4>สถานะ</h4>
                          <select
                            class="form-control"
                            v-model="status"
                            required
                          >
                            <option selected disabled value>เลือกสถานะ</option>
                            <option value="1">เปิดใช้งาน</option>
                            <option value="0">ปิดใช้งาน</option>
                          </select>
                        </div>
                        <!-- <div class="card-body col-md-6 mr-1">
                          <h4>ประเภทโปรโมชัน</h4>
                          <select
                            class="form-control text-"
                            v-model="promotion_type_id"
                            required
                          >
                            <option selected disabled value>
                              -เลือก ประเภทโปรโมชัน-
                            </option>
                            <option value="1">สมัครสมาชิกใหม่</option>
                            <option value="2">ฝากครั้งเเรกของวัน</option>
                            <option value="3">ฝากทั้งวัน</option>
                          </select>
                        </div> -->
                        <div class="card-body">
                          <h4>ประเภทโบนัส</h4>
                          <select
                            class="form-control text-"
                            v-model="bonus_type_id"
                            required
                          >
                            <option selected disabled value>
                              เลือกประเภทโบนัส
                            </option>
                            <option value="1">ค่าคงที่</option>
                            <option value="2">เปอร์เซ็นต์</option>
                          </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="card-body">
                          <h4>ฝากต่ำสุด</h4>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="ฝากต่ำสุด"
                            v-model="min_deposit"
                            required
                          />
                        </div>
                        <div class="card-body">
                          <h4>ฝากสูงสุด</h4>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="ฝากสูงสุด"
                            v-model="max_deposit"
                            required
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="card-body col-md-6 mr-1">
                          <h4>โบนัสสูงสุด</h4>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="โบนัสสูงสุด"
                            v-model="max_bonus"
                            required
                          />
                        </div>
                        <div class="card-body">
                          <h4>
                            ถอนสูงสุด <span class="text-danger">*(เท่า)</span>
                          </h4>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="ถอนสูงสุด"
                            v-model="max_withdraw"
                            required
                          />
                          <small class="text-danger"
                            >คิดจากยอดฝากเช่น ถอนสูงสุด 5 เท่า ยอดฝาก 100
                            ถอนได้สูงสุด 500</small
                          >
                        </div>
                      </div>

                      <div class="row">
                        <div class="card-body col-md-6">
                          <h4>ประเภท Turn</h4>
                          <select
                            class="form-control"
                            v-model="turn_type"
                            required
                            disabled
                          >
                            <option selected disabled value>เลือกสถานะ</option>
                            <option value="1">Turn Win</option>
                            <option value="2">Turn Over</option>
                          </select>
                        </div>
                        <div class="card-body">
                          <h4>Turn Over</h4>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Turn Over"
                            v-model="turn_over"
                            required
                          />
                        </div>
                      </div>
                      <div class="row"></div>
                      <hr />
                      <h4 class="card-title">เพิ่มเงื่อนไข Promotion</h4>
                      <!-- v-for="(input, k) in promotionconditions" :key="k"> -->
                      <div class="text-right">
                        <button
                          type="button"
                          class="btn btn-primary mt-2"
                          @click="addCondition"
                        >
                          เพิ่ม
                        </button>
                      </div>
                      <div class="col-md-12">
                        <div
                          class="row"
                          v-for="(input, index) in conditions"
                          :key="index"
                        >
                          <div class="col">
                            <label>ฝากต่ำสุด</label>
                            <input
                              type="number"
                              class="form-control"
                              placeholder="เช่น 10"
                              required
                              v-model="input.min"
                            />
                          </div>
                          <div class="col">
                            <label>ฝากสูงสุด</label>
                            <input
                              type="number"
                              class="form-control"
                              placeholder="เช่น 100"
                              v-model="input.max"
                              required
                            />
                          </div>
                          <div class="col">
                            <label>โบนัส</label>
                            <input
                              type="number"
                              class="form-control"
                              placeholder="เช่น 20"
                              v-model="input.bonus"
                              required
                            />
                          </div>
                          <div>
                            <button
                              type="button"
                              class="btn btn-danger mb-4 mt-3"
                              @click="deleteCondition(input.uuid, index)"
                            >
                              ลบ
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- 
                      <div class="row">
                        <div class="card-body">
                          <h4>Min</h4>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Min"
                            v-model="promotion_conditions.min"
                            required
                          />
                        </div>
                        <div class="card-body">
                          <h4>Max</h4>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Max"
                            v-model="promotion_conditions.max"
                            required
                          />
                        </div>
                        <div class="card-body">
                          <h4>Bonus</h4>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Bonus"
                            v-model="promotion_conditions.bonus"
                            required
                          />
                        </div>
                      </div> -->

                      <button
                        type="submit"
                        class="btn btn-info mr-1 text-white float-right mt-2"
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                        ยืนยัน
                      </button>
                    </form>
                  </div>
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
import { baseURL } from "../../../services/api";
import axios from "axios";
import UserService from "@/services/UserService";

import promotionService from "../../../services/promotionService";
export default {
  data() {
    return {
      form: {
        promotion_name: "",
        promotion_image: "",
        promotion_type_id: "",
        bonus_type_id: "",
        min_deposit: "",
        max_deposit: "",
        max_bonus: "",
        turn_over_slot: "",
        max_withdraw: "",
        turn_over_hdp: "",
        turn_over_mix_replay: "",
        turn_over_mix_step: "",
        turn_over_bacara: "",
        turn_over_thai_lotterry: "",
        turn_over_thai_m2: "",
        turn_over_thai_multiplayer: "",
        status: "",
        turn_win: "",
        turn_over: "",
        turn_status: "",
        // promotion_condition_min: "",
        // promotion_condition_max: "",
        // promotion_condition_bonus: "",
        promotion_conditions: [
          {
            min: "",
            max: "",
            bonus: "",
          },
        ],
      },
      min: "",
      max: "",
      bonus: "",
      turn_win: "",
      promotion_name: "",
      promotion_image: "",
      promotion_type_id: "",
      bonus_type_id: "",
      min_deposit: "",
      max_deposit: "",
      max_bonus: "",
      turn_over_slot: "",
      max_withdraw: "",
      turn_over_hdp: "",
      turn_over_mix_replay: "",
      turn_over_mix_step: "",
      turn_over_bacara: "",
      turn_over_thai_lotterry: "",
      turn_over_thai_m2: "",
      turn_over_thai_multiplayer: "",
      status: "",
      turn_over: "",
      turn_type: "",
      inputs: [],
      conditions: [],
      promotionconditions: [],

      promotion: [],
      aaa: [],
      isLoading: false,
    };
  },
  mounted() {
    this.checkAuth();
    this.getAllPromotion();
  },
  methods: {
    async getAllPromotion() {
      await axios({
        method: "get",
        url: `${baseURL}/promotion`,
        // url: "http://localhost:3000/api/promotion",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.isLoading = true;
      this.promotion = [];

          // this.promotion = response.data.data;
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].promotion_type_id != "0") {
              this.promotion.push({
                uuid: response.data.data[i].uuid,
                promotion_name: response.data.data[i].promotion_name,
                min_deposit: response.data.data[i].min_deposit,
                max_deposit: response.data.data[i].max_deposit,
                max_bonus: response.data.data[i].max_bonus,
                max_withdraw: response.data.data[i].max_withdraw,
                turn_over: response.data.data[i].turn_over,
                status: response.data.data[i].status,
                promotion_type_id: response.data.data[i].promotion_type_id,
                turn_type: response.data.data[i].turn_type,
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async checkAuth() {
      const res = await UserService.getProfile().catch(function (error) {
        if (error.response.status === 401 || error.response.status === 500) {
          const removeToken = localStorage.removeItem("access_token");
          if (removeToken == null) {
            this.$router.push("/login");
          }
        }
      });
      res.logout;
    },

    async getCondition(uuid) {
      this.conditions = [];
      // console.log(uuid);
      const res = await promotionService.editPromotion(uuid);
      for (
        var i = 0;
        i < res.data.data.promotion.promotion_conditions.length;
        i++
      ) {
        // if (res.data.data.promotion.promotion_conditions[i] === "0") {
        this.conditions.push({
          min: res.data.data.promotion.promotion_conditions[i].min_deposit, //
          max: res.data.data.promotion.promotion_conditions[i].max_deposit, //
          bonus: res.data.data.promotion.promotion_conditions[i].max_bonus,
          uuid: res.data.data.promotion.promotion_conditions[i].uuid, //
          //
        });

        // }
        // console.log(res.data.data.promotion.promotion_conditions);
        //  this.promotion_conditions=this.promotionconditions
        //  this.promotionconditions= res.data.data.promotion.promotion_conditions
        // console.log(this.conditions);
      }
      this.aaa = this.conditions;
      //  this.conditions= this.conditions
    },
    addCondition() {
      this.conditions.push({
        min: "",
        max: "",
        bonus: "",
      });
      // console.log(this.conditions);
    },
    deleteCondition(uuid, index) {
      // console.log(uuid);
      // console.log(index);
      const ress = promotionService.deletePromotion(uuid);
      this.conditions.splice(index, 1);

      console.log(ress.k9);
      // this.getCondition(uuid);
    },
    uploadImg(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        this.promotion_image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async getPromotionbyuuid(uuid) {
      const res = await promotionService.editPromotion(uuid);
      // console.log(res);
      //  for (var i = 0; i < res.data.data.promotion.promotion_conditions.length; i++) {
      //         // if (res.data.data.promotion.promotion_conditions[i] === "0") {
      //           this.promotion_conditions.push({
      //             min: res.data.data.promotion.promotion_conditions[i].min_deposit,//
      //             max: res.data.data.promotion.promotion_conditions[i].max_deposit,//
      //             bonus: res.data.data.promotion.promotion_conditions[i].max_bonus,//
      //           });
      // }
      // console.log(res.data.data.promotion.promotion_conditions);
      //  this.promotion_conditions=this.promotionconditions
      //  this.promotionconditions= res.data.data.promotion.promotion_conditions
      //  console.log(this.promotionconditions);
      // }
      // (this.conditions = this.promotion_conditions),
      // (this.promotionconditions = this.promotion_conditions),
      this.uuid = res.data.data.promotion.uuid;
      (this.promotion_name = res.data.data.promotion.promotion_name),
        (this.promotion_image = res.data.data.promotion.promotion_image),
        (this.promotion_type_id = res.data.data.promotion.promotion_type_id),
        (this.bonus_type_id = res.data.data.promotion.bonus_type_id),
        (this.min_deposit = res.data.data.promotion.min_deposit),
        (this.max_deposit = res.data.data.promotion.max_deposit),
        (this.max_bonus = res.data.data.promotion.max_bonus),
        (this.turn_over_slot = res.data.data.promotion.turn_over_slot),
        (this.max_withdraw = res.data.data.promotion.max_withdraw),
        (this.turn_over_hdp = res.data.data.promotion.turn_over_hdp),
        (this.turn_over_mix_replay =
          res.data.data.promotion.turn_over_mix_replay),
        (this.turn_over_mix_step = res.data.data.promotion.turn_over_mix_step),
        (this.turn_over_bacara = res.data.data.promotion.turn_over_bacara),
        (this.turn_over_thai_lotterry =
          res.data.data.promotion.turn_over_thai_lotterry),
        (this.turn_over_thai_m2 = res.data.data.promotion.turn_over_thai_m2),
        (this.turn_win = res.data.data.promotion.turn_win),
        (this.turn_over_thai_multiplayer =
          res.data.data.promotion.turn_over_thai_multiplayer),
        (this.turn_over = res.data.data.promotion.turn_over),
        (this.turn_type = res.data.data.promotion.turn_type),
        (this.status = res.data.data.promotion.status);
    },

    async submitUpdate() {
      const uuid = this.uuid;

      const res = await promotionService.editPromotion(uuid);
      // console.log(res);
      let countOldCondition =
        res.data.data.promotion.promotion_conditions.length;
      // console.log(countOldCondition);

      this.form = {
        uuid: this.uuid,
        promotion_name: this.promotion_name,
        promotion_image:
          "data:image/jpeg;base64,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",
        bonus_type_id: this.bonus_type_id,
        promotion_type_id: this.promotion_type_id,
        min_deposit: this.min_deposit,
        max_deposit: this.max_deposit,
        max_bonus: this.max_bonus,
        turn_over_slot: this.turn_over_slot,
        max_withdraw: this.max_withdraw,
        turn_over_hdp: this.turn_over_hdp,
        turn_over_mix_replay: this.turn_over_mix_replay,
        turn_over_mix_step: this.turn_over_mix_step,
        turn_over_bacara: this.turn_over_bacara,
        turn_over_thai_lotterry: this.turn_over_thai_lotterry,
        turn_over_thai_m2: this.turn_over_thai_m2,
        turn_over_thai_multiplayer: this.turn_over_thai_multiplayer,
        status: this.status,
        turn_win: this.turn_win,
        turn_over: this.turn_over,
        turn_type: this.turn_type,
        promotion_conditions: this.conditions,
      };
      this.conditions.splice(0, countOldCondition);

      // console.log(this.conditions);
      // console.log(this.form);
      axios
        .put(baseURL + "/promotion/" + uuid, this.form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          // console.log(this.form);
          this.getAllPromotion();
          this.getAllPromotion();

          this.$toast.success("เรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
          window.$("#modelId").modal("hide");
          //Perform Success Action
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("ไม่ถูกต้อง", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
        })
        .finally(() => {
          // this.getAllPromotion();
          //Perform action in always
        });
    },
  },
};
</script>
