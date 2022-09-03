<template>
  <div id="User">
    <div class="page-inner">
      <div class="page-header">
        <label class="page-title">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          แก้ไขข้อผิดพลาด
        </label>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <label class="card-title">กรุณาเลือกทำรายการ</label>
            </div>
            <div class="card-body">
             
              <ul
                class="
                  nav nav-pills nav-info
                  mb-2
                  nav-pills-no-bd nav-pills-icons
                  justify-content-left
                "
                id="pills-tab-with-icon"
                role="tablist"
              >
                <li class="nav-item submenu">
                  <button
                    type="button"
                    class="nav-link active show btn"
                    id="pills-home-tab-icon"
                    data-toggle="pill"
                    href="#pills-home-icon"
                    role="tab"
                    aria-controls="pills-home-icon"
                    aria-selected="false"
                  >
                    ตัดเครดิต
                  </button>
                </li>
                <li class="nav-item submenu">
                  <a
                    class="nav-link"
                    id="pills-profile-tab-icon"
                    data-toggle="pill"
                    href="#pills-profile-icon"
                    role="tab"
                    aria-controls="pills-profile-icon"
                    aria-selected="false"
                  >
                    เพิ่มเครดิตโปรโมชั่น
                  </a>
                </li>
                <li class="nav-item submenu">
                  <a
                    class="nav-link"
                    id="pills-contact-tab-icon"
                    data-toggle="pill"
                    href="#pills-contact-icon"
                    role="tab"
                    aria-controls="pills-contact-icon"
                    aria-selected="true"
                  >
                    เติมเครดิต
                  </a>
                </li>
              </ul>
              <div
                class="tab-content mt-2 mb-3"
                id="pills-without-border-tabContent"
              >
                <div
                  class="tab-pane fade active show row"
                  id="pills-home-icon"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab-nobd"
                >
                  <form v-on:submit.prevent="checkClickedCut">
                    <input
                      type="hidden"
                      name="error_list_name"
                      v-model="formcut.error_list_name"
                    />
                    <div class="form-group row">
                      <label
                        for="username"
                        class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                      >
                        ชื่อผู้ใช้ :
                        <span class="required-label">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control col-lg-4 col-md-9 col-sm-8"
                        name="username"
                        id="username"
                        aria-describedby="helpId"
                        placeholder="กรอก Username"
                        v-model="formcut.username"
                        required
                      />
                    </div>
                    <div class="form-group row">
                      <label
                        for="amount"
                        class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                      >
                        จำนวนเครดิต :
                        <span class="required-label">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control col-lg-4 col-md-9 col-sm-8"
                        name="amount"
                        id="amount"
                        aria-describedby="helpId"
                        placeholder="จำนวนเครดิต"
                        v-model="formcut.amount"
                        required
                      />
                    </div>
                    <div class="form-group row">
                      <label
                        for="annotation"
                        class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                      >
                        หมายเหตุ:
                        <span class="required-label">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control col-lg-4 col-md-9 col-sm-8"
                        name="annotation"
                        id="annotation"
                        aria-describedby="helpId"
                        placeholder="หมายเหตุ"
                        v-model="formcut.annotation"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <button class="btn btn-primary float-right">
                        <i class="fa fa-check" aria-hidden="true"></i>
                        ยืนยัน
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-profile-icon"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab-nobd"
                >
                  <form v-on:submit.prevent="checkClickedAdd">
                    <div class="col-md-12">
                      <input
                        type="hidden"
                        name="error_list_name"
                        v-model="formadd.error_list_name"
                      />

                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="email2 ">
                              ชื่อผู้ใช้ :
                              <span class="required-label">*</span>
                            </label>
                            <input
                              v-model="formadd.username"
                              class="form-control"
                              id="email2"
                              placeholder="Username"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="email2 ">
                              จำนวนเงิน :
                              <span class="required-label">*</span>
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              name="amount"
                              id="amount"
                              aria-describedby="helpId"
                              placeholder="จำนวนเงิน"
                              v-model="formadd.amount"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="email2 ">
                              หมายเหตุ :
                              <span class="required-label">*</span>
                            </label>
                            <input
                              v-model="formadd.annotation"
                              class="form-control"
                              id="email2"
                              placeholder="หมายเหตุ"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="email2 ">
                              อั้นถอน :
                              <span class="required-label">*</span>
                            </label>
                            <input
                              v-model="formadd.turn_over.max_withdraw"
                              class="form-control"
                              id="email2"
                              placeholder="อั้นถอน"
                              required
                            />
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div>
                            <div class="form-group">
                              <label for="email2 ">
                                TURN OVER :
                                <span class="required-label">*</span>
                              </label>
                              <input
                                type="number"
                                class="form-control"
                                name="amount"
                                id="2"
                                aria-describedby="helpId"
                                placeholder="Turn Over"
                                v-model="formadd.turn_over.turn_over"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <!-- <div class="col-md-4"></div> -->
                      </div>
                    </div>

                    <div class="card-body">
                      <div class="form-group">
                        <button class="btn btn-primary float-right">
                          <i class="fa fa-check" aria-hidden="true"></i>
                          ยืนยัน
                        </button>
                      </div>
                    </div>
                  </form>

                  <!-- form -->
                </div>
                <div
                  class="tab-pane fade row"
                  id="pills-contact-icon"
                  role="tabpanel"
                  aria-labelledby="pills-slip-tab-nobd"
                >
                  <form v-on:submit.prevent="checkClickedSlip">
                    <input
                      type="hidden"
                      name="error_list_name"
                      v-model="formslip.error_list_name"
                    />
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="username">
                              ชื่อผู้ใช้ :
                              <span class="required-label">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="username"
                              id="username"
                              aria-describedby="helpId"
                              placeholder="กรอก Username"
                              v-model="formslip.username"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="amount">
                              จำนวนเงิน :
                              <span class="required-label">*</span>
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              name="amount"
                              id="amount"
                              aria-describedby="helpId"
                              placeholder="จำนวนเงิน"
                              v-model="formslip.amount"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="annotation">
                              หมายเหตุ:
                              <span class="required-label">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="annotation"
                              id="annotation"
                              aria-describedby="helpId"
                              placeholder="หมายเหตุ"
                              v-model="formslip.annotation"
                              required
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="timedate ">
                              วัน-เวลาที่โอน :
                              <small class="text-danger"
                                >เวลาต้องตรงกับสลิปของลูกค้า เท่านั้น</small
                              >

                              <span class="required-label">*</span>
                            </label>
                            <VueCtkDateTimePicker
                              v-model="formslip.date"
                              required
                              format="DD/MM HH:mm"
                              formatted="DD/MM HH:mm"
                              :no-label="true"
                              label="Time"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <button class="btn btn-primary float-right">
                        <i class="fa fa-check" aria-hidden="true"></i>

                        ยืนยัน
                      </button>
                    </div>

                    <!-- <img
                
              v-if="!isLoadingGIF"
              class="rounded mx-auto d-block bet3d-loader"
              src="../../../assets/a.gif"
              width="150"
            /> -->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table
                  id="basic-datatables"
                  class="display table table-striped table-hover table-bordered"
                >
                  <thead style="text-align: center">
                    <tr class="bg-primary text-white">
                      <th>เติมเครดิต</th>
                      <th>ตัดเครดิต</th>
                      <th>เพิ่มเครดิตโปรโมชั่น</th>
                    </tr>
                  </thead>
                  <tbody style="text-align: center">
                    <tr>
                      <td>
                        <div v-if="slipCreditTotal === null">0</div>
                        <div v-if="slipCreditTotal != null">
                          {{ slipCreditTotal }}
                        </div>
                      </td>
                      <td>
                        <div v-if="cutCreditTotal === null">0</div>
                        <div v-if="cutCreditTotal != null">
                          {{ cutCreditTotal }}
                        </div>
                      </td>
                      <td>
                        <div v-if="addCreditTotal === null">0</div>
                        <div v-if="addCreditTotal != null">
                          {{ addCreditTotal }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">รายงานการผิดพลาด</div>
            <div class="card-header">
              <div>
                <div class="container" style="text-align: center">
                  <div class="form-check">
                    <div class="row">
                      <div class="mt-4 mb-3"></div>
                      <div>
                        <label class="form-radio-label">
                          <input
                            class="form-radio-input ml-2 mr-2"
                            type="radio"
                            name="optionsRadios"
                            :value="errortypeall"
                            v-model="getselect"
                            @change="onChange($event), getErrorTypeAll()"
                          />
                          <span class="form-radio-sign badge badge-info"
                            >ทั้งหมด</span
                          >
                        </label>
                      </div>
                      <div>
                        <label class="form-radio-label ml-3">
                          <input
                            class="form-radio-input ml-2 mr-2"
                            type="radio"
                            name="optionsRadios"
                            :value="errortypecut"
                            v-model="getselect"
                            @change="onChange($event), getErrorTypeCut()"
                          />
                          <span class="form-radio-sign badge badge-warning"
                            >ตัดเครดิต</span
                          >
                        </label>
                      </div>
                      <div>
                        <label class="form-radio-label ml-3">
                          <input
                            class="form-radio-input ml-2 mr-2"
                            type="radio"
                            name="optionsRadios"
                            :value="errortypeadd"
                            v-model="getselect"
                            @change="onChange($event, getErrorTypeAdd())"
                          />
                          <span class="form-radio-sign badge badge-primary"
                            >เพิ่มเครดิตโปรโมชั่น</span
                          >
                        </label>
                      </div>
                      <div>
                        <label class="form-radio-label ml-3">
                          <input
                            class="form-radio-input ml-2 mr-2"
                            type="radio"
                            name="optionsRadios"
                            :value="errortypeslip"
                            v-model="getselect"
                            @change="onChange($event), getErrorTypeSlip()"
                          />
                          <span class="form-radio-sign badge badge-success"
                            >เติมเครดิต</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    จากวันที่</label
                  >
                  <VueCtkDateTimePicker
                    :only-date="true"
                    v-model="yesterdate"
                    format="YYYY-MM-DD"
                    formatted="DD-MM-YYYY"
                    :no-label="true"
                    locale="th-TH"
                    Label="yesterday"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    เวลา</label
                  >
                  <VueCtkDateTimePicker
                    v-model="yestertime"
                    :only-time="true"
                    format="HH:mm:ss"
                    formatted="HH:mm"
                    :no-label="true"
                    label="Time"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    ถึงวันที่</label
                  >
                  <VueCtkDateTimePicker
                    :only-date="true"
                    v-model="todate"
                    format="YYYY-MM-DD"
                    formatted="DD-MM-YYYY"
                    :no-label="true"
                    locale="th-TH"
                    Label="today"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-clock-o" aria-hidden="true"></i> เวลา</label
                  >
                  <VueCtkDateTimePicker
                    v-model="totime"
                    :only-time="true"
                    format="HH:mm:ss"
                    formatted="HH:mm"
                    :no-label="true"
                    label="Time"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">กรุณากรอกข้อมูลที่ต้องการ</label>
                  <input
                    class="form-control"
                    id="email2"
                    placeholder="ข้อมูลที่ต้องการค้นหา"
                    v-model="username"
                  />
                </div>
                <div class="col-md-1.5">
                  <label for="datetime"></label>
                  <br />
                  <button
                    class="btn btn-primary btn-sm ml-1"
                    v-on:click.prevent="getDataParam()"
                  >
                    <i class="fa fa-search" aria-hidden="true"></i>
                    ค้นหา
                  </button>
                  <button
                    class="btn btn-secondary btn-sm ml-1"
                    v-on:click.prevent="getYesterday()"
                  >
                    เมื่อวาน
                  </button>
                  <button
                    class="btn btn-warning btn-sm ml-1"
                    v-on:click.prevent="getToday()"
                  >
                    วันนี้
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="table-responsive">
          <table
            id="basic-datatables"
            class="display table table-striped table-hover table-bordered"
          >
            <thead style="text-align: center">
              <tr>
                <th>#</th>
                <th>รายการ</th>
                <th>Username</th>
                <th>ยอดเงิน</th>
                <th>โบนัส</th>
                <th>เครดิตก่อนเติม</th>
                <th>เครดิตหลังเติม</th>
                <th>วันที่</th>
                <th>Create By</th>
                <th>หมายเหตุ</th>
                <th>Ref.</th>
              </tr>
            </thead>
            <tbody style="text-align: center">
              <tr v-for="(data, index) in errlist" v-bind:key="data.uuid">
                <td>{{ index + 1 }}</td>
                <td v-if="data.error_list_name === 'เพิ่มเครดิต'">
                  <p class="badge badge-primary">{{ data.error_list_name }}</p>
                </td>
                <td v-if="data.error_list_name === 'ตัดเครดิต'">
                  <p class="badge badge-warning">{{ data.error_list_name }}</p>
                </td>
                <td v-if="data.error_list_name === 'สลิปไม่แสดง'">
                  <p class="badge badge-success">เติมเครดิต</p>
                </td>
                <td>
                  <b>
                    <a
                      href="#/errorlist"
                      @click="getClipboard"
                      v-clipboard:copy="data.username"
                      >{{ data.username }}</a
                    ></b
                  >
                </td>
                <td>{{ data.amount }}</td>
                <td>{{ data.bonus_credit }}</td>
                <td>
                  <span>{{ data.credit_before.toFixed() }}</span>
                </td>
                <td>
                  <span>{{ data.credit_after | formatNumber }}</span>
                </td>
                <td>{{ data.createdAt | formatDate }}</td>
                <td>{{ data.create_by }}</td>
                <td>{{ data.annotation }}</td>
                <td>{{ data.ref }}</td>
              </tr>
            </tbody>

            <tbody>
              <tr v-if="errlist.length == '0'">
                <td colspan="11" class="text-center text-danger">
                  <i class="fas fa-times"></i>
                  ไม่มีข้อมูล !
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL } from "../../../services/api";
import axios from "axios";
// import router from "@/router";
import UserService from "@/services/UserService";
// import Swal from "sweetalert";
import Swal from "sweetalert2";

const moment = require("moment");

export default {
  data() {
    return {
      addCreditTotal: "",
      cutCreditTotal: "",
      slipCreditTotal: "",

      isLoading: false,
      isLoadingGIF: true,

      errortypeall: "",
      errortypecut: "ตัดเครดิต",
      errortypeadd: "เพิ่มเครดิต",
      errortypeslip: "สลิปไม่แสดง",

      options: [{ id: 2, value: 2, type: "Turn OVER" }],

      username: "",
      datetime1: "",
      datetime2: "",
      true: true,
      false: false,
      create_by: "",

      formcut: {
        create_by: "",
        username: "",
        amount: "",
        annotation: "",
        date: moment().locale("th").format("YYYY/MM/DD HH:mm"),
        error_list_name: "ตัดเครดิต",
        bonus_credit: "0",
        turn_over: {
          turn_over_slot: "0",
          turn_over_hdp: "0",
          turn_over_mix_replay: "0",
          turn_over_mix_step: "0",
          turn_over_bacara: "0",
          turn_over_thai_lotterry: "0",
          turn_over_thai_m2: "0",
          turn_over_thai_multiplayer: "0",
          turn_over: "0",
          max_withdraw: "",
          turn_type: "",
          turn_win: "0",
        },
      },

      formadd: {
        create_by: "",
        username: "",
        amount: "",
        annotation: "",
        createdAt: moment().locale("th").format("YYYY/MM/DD HH:mm"),
        error_list_name: "เพิ่มเครดิต",
        date: moment().locale("th").format("DD/MM HH:mm"),
        turn_over: {
          turn_over_slot: "0",
          turn_over_hdp: "0",
          turn_over_mix_replay: "0",
          turn_over_mix_step: "0",
          turn_over_bacara: "0",
          turn_over_thai_lotterry: "0",
          turn_over_thai_m2: "0",
          turn_over_thai_multiplayer: "0",
          turn_over: "",
          max_withdraw: "",
          turn_type: 2,
          turn_win: "0",
        },
        bonus_credit: "0",
      },
      formslip: {
        create_by: "",
        username: "",
        amount: "",
        annotation: "",
        date: moment().locale("th").format("DD/MM HH:mm"),
        error_list_name: "สลิปไม่แสดง",
        bonus_credit: "0",
      },
      errlist: [],
      todaydate: "",
      todaytime: "",
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",

      getselect: "",
    };
  },
  mounted() {
    this.getMount();
  },
  methods: {
    onChange(event) {
      let data = event.target.value;
      console.log(data);
    },
    async getErrorTypeAll() {
      const t = "T";
      const z = "";
      const username = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      const error_type = this.errortypeall;
      // console.log(error_type);
      
      axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=${username}&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.isLoading = true;

          this.errlist = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getErrorTypeAdd() {
      const t = "T";
      const z = "";
      const username = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      const error_type = this.errortypeadd;
      // console.log(error_type);
      axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=${username}&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.isLoading = true;

          this.errlist = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getErrorTypeCut() {
      const t = "T";
      const z = "";
      const username = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      const error_type = this.errortypecut;
      // console.log(error_type);
      axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=${username}&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.isLoading = true;

          this.errlist = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getErrorTypeSlip() {
      const t = "T";
      const z = "";
      const username = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      const error_type = this.errortypeslip;
      // console.log(error_type);
      axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=${username}&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.isLoading = true;

          this.errlist = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getMount() {
      this.yesterdate = moment()
        .locale("th")
        // .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.yestertime = moment()
        .locale("th")
        .subtract(1, "days")
        .format("00:00:00");
      this.todate = moment().locale("th").format("YYYY-MM-DD");
      this.totime = moment().locale("th").format("23:59:59");
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const z = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      const error_type = "";
      const username = this.username;

      await axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=${username}&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.addCreditTotal = response.data.addCreditTotal[0].totalAmount;
          this.cutCreditTotal = response.data.cutCreditTotal[0].totalAmount;
          this.slipCreditTotal = response.data.slipCreditTotal[0].totalAmount;
          this.errlist = response.data.data;
          // console.log(this.errlist);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.getUsername();
    },
    async formaddcheck() {},
    moment() {
      return moment();
    },
    async getUsername() {
      const res = await UserService.getProfile().catch(function (error) {
        if (error.response.status === 401 || error.response.status === 500) {
          const removeToken = localStorage.removeItem("access_token");
          if (removeToken == null) {
            this.$router.push("/login");
          }
        }
      });
      this.formadd.create_by = res.data.username;
      this.formcut.create_by = res.data.username;
      this.formslip.create_by = res.data.username;
    },
    async submitAddCreditForm() {
      
      axios
        .post(baseURL + "/err_list", this.formadd, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          this.isLoading = true;

          this.errlist = [];
          this.getMount();
          this.$toast.success("เรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
          // router.push("/errorlist");
          this.formadd.username = "";
          this.formadd.amount = "";
          this.formadd.annotation = "";
          this.formadd.turn_over.turn_over = "";
          this.formadd.turn_over.turn_win = "";
          this.formadd.turn_over.turn_type = "";
          this.formadd.turn_over.max_withdraw = "";
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("ไม่ถูกต้องadd", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
          this.formadd.username = "";
          this.formadd.amount = "";
          this.formadd.annotation = "";
          this.formadd.turn_over.turn_over = 0;
          this.formadd.turn_over.turn_win = 0;
          this.formadd.turn_over.turn_type = "";
          this.formadd.turn_over.max_withdraw = "";

          // error.response.status Check status code
        })
     
    },
    async submitCutCreditForm() {
      let timerInterval;
        Swal.fire({
          title: "กรุณารอสักครู่",
          // text: "ประมาณ 1 - 2 นาที",
          imageUrl: "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
          imageWidth: 300,
          imageHeight: 200,

          html: " ประมาน <b></b> นาที.",
          timer: 500,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,

          didOpen: () => {
            Swal.showLoading();
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
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
this.time ="I was closed by the timer";          }
        });
      axios
        .post(baseURL + "/err_list", this.formcut, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          this.isLoading = true;

          this.errlist = [];
          this.getMount();
          this.$toast.success("เรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
          // this.$router.push("/errorlist");
          this.formcut.username = "";
          this.formcut.amount = "";
          this.formcut.annotation = "";
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("ไม่ถูกต้อง", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });

          this.formcut.username = "";
          this.formcut.amount = "";
          this.formcut.annotation = "";
        })
        .finally(() => {
          //Perform action in always
        });
    },
    async submitSlipSlipForm() {
      // this.isLoadingGIF = false;
      // let timerInterval
let timerInterval;
        Swal.fire({
          title: "กรุณารอสักครู่",
          // text: "ประมาณ 1 - 2 นาที",
          imageUrl: "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
          imageWidth: 300,
          imageHeight: 200,

          html: " ประมาน <b></b> นาที.",
          timer: 500,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,

          didOpen: () => {
            Swal.showLoading();
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
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
this.time ="I was closed by the timer";          }
        });
      axios
        .post(baseURL + "/err_list", this.formslip, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          this.isLoadingGIF = false;

          this.errlist = [];
          this.getMount();
          this.$toast.success("เรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
          // this.$router.push("/errorlist");
          this.formslip.username = "";
          this.formslip.amount = "";
          this.formslip.annotation = "";
        })

        .catch((error) => {
          this.isLoadingGIF = true;

          console.log(error);
          this.$toast.error("ไม่ถูกต้อง", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });

          this.formslip.username = "";
          this.formslip.amount = "";
          this.formslip.annotation = "";
        })
        .finally(() => {
          //Perform action in always
        });
    },

    checkClickedCut() {
      this.$confirm("ยืนยันการตัดเครดิต?").then(() => {
        this.submitCutCreditForm();
      });
    },
    checkClickedAdd() {
      this.$confirm("ยืนการเพิ่มเครดิต?").then(() => {
        this.submitAddCreditForm();
      });
    },
    checkClickedSlip() {
      this.$confirm("ยืนการเพิ่มเครดิต?").then(() => {
        this.isLoadingGIF = true;

        this.submitSlipSlipForm();
      });
    },
    async getDataParam() {
      const t = "T";
      const z = "";
      const username = this.username;
      const start_date = this.yesterdate + t + this.yestertime + z;
      const end_date = this.todate + t + this.totime + z;
      const error_type = this.getselect;
      await axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=${username}&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.isLoading = true;
          this.addCreditTotal = response.data.addCreditTotal[0].totalAmount;
          this.cutCreditTotal = response.data.cutCreditTotal[0].totalAmount;
          this.slipCreditTotal = response.data.slipCreditTotal[0].totalAmount;
          this.errlist = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getToday() {
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const z = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      const error_type = this.getselect;

      await axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.isLoading = true;
          this.addCreditTotal = response.data.addCreditTotal[0].totalAmount;
          this.cutCreditTotal = response.data.cutCreditTotal[0].totalAmount;
          this.slipCreditTotal = response.data.slipCreditTotal[0].totalAmount;
          this.errlist = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getYesterday() {
      this.todaydate = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const z = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      const error_type = this.getselect;

      axios({
        method: "get",
        url: `${baseURL}/err_list/?start_date=${start_date}&end_date=${end_date}&username=&error_type=${error_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.isLoading = true;

          this.errlist = response.data.data;
          this.addCreditTotal = response.data.addCreditTotal[0].totalAmount;
          this.cutCreditTotal = response.data.cutCreditTotal[0].totalAmount;
          this.slipCreditTotal = response.data.slipCreditTotal[0].totalAmount;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getClipboard() {
      this.$toast.success("คัดลอก User สำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
  },
};
</script>

<style>
#hidden_div {
  display: none;
}
.bet3d-loader {
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  /* background: #070707; */
  /* opacity:10% ; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.bet3d-loader.hidden {
  animation: fadeOut 1s;
  animation-fill-mode: forwards;
}

@keyframes fadeOut {
  20% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
