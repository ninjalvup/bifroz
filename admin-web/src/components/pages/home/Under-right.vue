<template>
  <div id="Under-right">
    <div class="card">
      <div class="card-header bg-primary">
        <h3 class="card-title text-white">รายการรออนุมัติ</h3>
      </div>
      <div v-if="smstable.length == '0'">
        <div class="alert alert-danger mt-4 mb-3 m-4" role="alert">
          ไม่มีข้อมูลรายการอนุมัติ
        </div>
      </div>
      <div
        class="panel-body page-main-body-transaction mt-2 mr-2 ml-2"
        v-for="data in smstable"
        v-bind:key="data.data"
      >
        <!-- ngRepeat: i in result -->
        <table class="table table-striped" style="">
          <tbody>
            <tr
              style="
                color: black;
                border: solid 0px #c1c1c1;
                height: 70px;
                background-color: #ffffff;
              "
            >
              <!-- <td style="width: 55px">
                <img
                  :src="
                    require(`../../../assets/bank_icon/${data.bank_tranfer.toLowerCase()}.png`)
                  "
                  alt
                  class="icon ml-3"
                  width="40"
                  height="40"
                />
                 </td> -->
              <td></td>
              <td style="width: 55px">
                <img
                  :src=" require(`../../../../public/assets/img/bank_icon/${data.bank_tranfer.toLowerCase()}.png`) "
                  class="icon ml-3"
                  width="40"
                  height="40"
                />
              </td>
              <td style="width: 430px">
                <small
                  >ลูกค้าโอนเข้าแต่ไม่พบข้อมูล
                  กรุณารอลูกค้าติดต่อมาเพื่อทำรายการ</small
                >
                <br />
                <!-- <small ><i class="fa fa-clock-o"></i>{{data.tel}} -->
                <!-- </small> -->
                <br />
                {{ data.sms_content }}
                <br />
                <b></b>
              </td>
              <td>
                <small>ช่องทาง</small>
                <br />
                <b>SMS</b>

                <!-- <b v-if="data.title_tranfer === null">SMS</b> -->
                <!-- <p class="badge badge-secondary" >{{ data.bank_tranfer.toUpperCase() }}</p> -->
              </td>
              <td>
                <small>จำนวนเงิน</small>
                <br />
                <b class="badge badge-secondary"> {{ data.amount }}</b>
              </td>
              <!-- ngIf: user.position !== 'STAFF' -->
              <td class="text-right">
                <!-- <button class="btn btn-default btn-secondary btn-sm mt-1 mb-1" ><i class="fa fa-check"></i> เติม</button>
                                                <div style="padding: 2px;"></div>
                                                <button class="btn btn-primary btn-sm mt-1 mb-1" ><i class="fa fa-times"></i> ซ่อน</button> -->
                <div v-if="data.bank_tranfer.toLowerCase() != 'truemoney'">
                  <button
                    class="
                      btn btn-secondary
                      ml-3
                      mt-2
                      mb-2
                      mr-3
                      btn-sm
                      text-white
                      float-right
                    "
                    data-toggle="modal"
                    data-target="#postCurl"
                    v-on:click.prevent="getSMSByUUID(data.uuid)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </button>
                </div>
                <div v-if="data.bank_tranfer.toLowerCase() === 'truemoney'">
                  <button
                    class="
                      btn btn-secondary
                      ml-3
                      mr-3
                      btn-sm
                      text-white
                      float-right
                    "
                    data-toggle="modal"
                    data-target="#postTrue"
                    v-on:click.prevent="getTruemoneyID(data.uuid)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </button>
                </div>
                <div v-if="data.bank_tranfer === null">
                  <button
                    class="
                      btn btn-secondary
                      ml-3
                      mr-3
                      btn-sm
                      text-white
                      float-right
                    "
                    data-toggle="modal"
                    data-target="#postTrue"
                    v-on:click.prevent="getTruemoneyID(data.uuid)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </button>
                </div>
                <button
                  v-on:click.prevent="postToHideSMS(data.uuid)"
                  class="
                    btn btn-danger btn-sm
                    mr-3
                    mt-1
                    mb-1
                    text-white
                    float-right
                  "
                >
                  <i class="fa fa-times-circle" aria-hidden="true"></i>
                </button>
              </td>
              <!-- end ngIf: user.position !== 'STAFF' -->
            </tr>
            <!-- end ngIf: i.bankName == 'SCB' -->
          </tbody>
        </table>
        <!-- end ngRepeat: i in result -->
        <hr />
      </div>

      <div
        class="modal fade"
        id="postTrue"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <!-- MODAL -->
        <!-- v-on:submit.prevent="checkClickedSMS(uuid)" -->
        <form>
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  ข้อมูลSMS TRUE
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="card-body">
                <div class="d-flex">
                  <div class="avatar">
                    <img
                      :src="
                        require(`../../../assets/bank_icon/${titletrue.toLowerCase()}.png`)
                      "
                      alt
                      class="icon"
                      width="40"
                    />
                  </div>
                  <div class="flex-1 ml-3 pt-1 container">
                    <span class="text-uppercase fw-bold mb-1"
                      >จำนวนเงิน

                      <h2 class="text-warning pl-3">
                        {{ amounttrue }}
                      </h2>
                    </span>
                  </div>
                  <div class>
                    <p class="text-muted">
                      {{ bank_datetrue }} {{ bank_timetrue }}
                    </p>
                  </div>
                </div>
                <div class="form-group">
                  <label for="username">ชื่อผู้ใช้</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="helpId"
                    name="username"
                    id="username"
                    placeholder="กรุณากรอก ชื่อผู้ใช้"
                    required
                    v-model="form.username"
                  />
                </div>

                <button
                  class="btn btn-info mr-1 text-white float-right"
                  v-on:click.prevent="postTrue(uuid)"
                >
                  <i class="fa fa-check" aria-hidden="true"></i>

                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        class="modal fade"
        id="postCurl"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">ข้อมูลSMS</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="card-body">
                <div class="d-flex">
                  <div class="avatar">
                    <img
                      :src="
                        require(`../../../assets/bank_icon/${titlesms.toLowerCase()}.png`)
                      "
                      alt
                      class="icon"
                      width="40"
                    />
                  </div>
                  <div class="flex-1 ml-3 pt-1 container">
                    <span class="text-uppercase fw-bold mb-1"
                      >จำนวนเงิน

                      <h2 class="text-warning pl-3">
                        {{ amountsms }}
                      </h2>
                    </span>
                  </div>
                  <div class>
                    <p class="text-muted">
                      {{ bank_datesms }} {{ bank_timesms }}
                    </p>
                  </div>
                </div>
                <div class="form-group">
                  <label for="username">ชื่อผู้ใช้</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="helpId"
                    name="username"
                    id="username"
                    placeholder="กรุณากรอก ชื่อผู้ใช้"
                    required
                    v-model.trim="form.username"
                  />
                </div>

                <button
                  class="btn btn-info mr-1 text-white float-right"
                  id="postSMS"
                  v-on:click.prevent="postSMS(uuid)"
                >
                  <i class="fa fa-check" aria-hidden="true"></i>

                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-md-4">
      <audio id="myAudio" hidden controls autoplay>
        <source src="../../../assets/audio/sms.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <!-- <button onclick="myFunction()">Try it</button> -->

      <!-- <p id="demo"></p> -->
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
// import bankService from "@/services/bankService";
import swal from "sweetalert";
import UserService from "@/services/UserService";
import smsService from "@/services/smsService";
// import axios from "axios";
export default {
  data() {
    return {
      content: "",
      bank_datesms: "",
      bank_timesms: "",
      amountsms: "",
      // decimalbank: "",
      titlecurl: "curl",
      titlecurl_kbank: "curl_kbank",
      titlesms: "SCBA",
      titletrue: "Truemoney",

      bank_datecurl: "",
      bank_timecurl: "",
      amountcurl: "",

      bank_datetrue: "",
      bank_timetrue: "",
      amounttrue: "",

      //   bank_datesms: "",
      // bank_timesms: "",
      // amountsms: "",

      form: {
        username: "",
      },
      allsmstable: [],
      allcurlnoacc: [],
      smstable: [],
      alltruetable: [],
      status0test: [],
      smsForm: {
        amount: "",
        username: "",
        bank_date: "",
        bank_time: "",
        create_by: "",
      },
      // ishasData: false,
    };
  },
  mounted() {
    // this.getSMS()
    this.getWait();
    this.pauseAudio();
    let audio = new Audio(require("../../../assets/audio/sms.mp3"));
    audio.pause();
  },
  methods: {
    //     async getSMS() {
    //       this.allsmstable = [];
    //       this.smstable = [];
    //       // let k = 0;
    //       const res = await smsService.getScbSmsTransaction();
    //       console.log(res.data.status);
    //       for (var i = 0; i < res.data.length; i++) {

    //         if (res.data[i].status === "0") {

    //           this.smstable.push({
    //             id: res.data[i].id,
    //             uuid: res.data[i].uuid,
    //             title: res.data[i].bank_tranfer, //
    //             amount: res.data[i].amount, //
    //             status: res.data[i].status,
    //             tel: res.data[i].phone_number,
    //             date: res.data[i].bank_date, //
    //             time: res.data[i].bank_time, //
    //             content:
    //               res.data[i].sms_content, //
    //           });
    //         }

    //       }
    // console.log("OLD "+this.smstable.length);
    //       this.smstable.forEach((element) =>  {

    //         this.allsmstable.push(element);

    //       });
    //       // console.log("OLD "+this.allsmstable.length);

    //       let self = this;
    //       setTimeout(async function () {
    //         await self.getSMS();
    //       }, 30000);
    //       if (this.allsmstable.length >= 0) {
    //         // this.ishasData = true;
    //       }
    //       console.log("NEW "+ this.allsmstable.length);
    //     },
    // ----------------------------------------------
    // async getSMS() {
    //   this.firstData = this.smstable.length;
    //   console.log(this.firstData);
    //   this.smstable = "";
    //   const res = await smsService.getScbSmsTransaction();
    //   // console.log(res);
    //   for (var i = 0; i < res.data.length; i++) {
    //     if (res.data[i].status === "0") {

    //     console.log("as");
    //     }
    //   }
    //   console.log(this.firstData);

    //   this.smstable = this.allsmstable;
    //   console.log(this.firstData);

    //   console.log(this.smstable.length);
    //   if (this.firstData < this.smstable.length) {
    //     // let self = this;
    //     // self.playAudio();
    //     console.log("PLAY");
    //   }
    //   // let self = this;
    //   // setTimeout(async function () {
    //   //   await self.getSMS();
    //   // }, 10000);
    // },

    pauseAudio() {
      let audio = new Audio(require("../../../assets/audio/sms.mp3"));
      audio.pause();
    },
    playAudio() {
      let audio = new Audio(require("../../../assets/audio/sms.mp3"));
      audio.play();
    },

    async getWait() {
      this.firstData = this.smstable.length;

      const res = await smsService.getScbSmsTransactionWait();
      // console.log(res.data);
      this.smstable = res.data;
      // console.log(this.smstable.length);

      if (this.firstData < this.smstable.length) {
        let self = this;
        self.playAudio();
      }

      let self = this;
      setTimeout(async function() {
        await self.getWait();
      }, 2000);
    },

    async getSMSByUUID(uuid) {
      this.form.username = [];

      const res = await smsService.getScbSmsTransactionByUuid(uuid);
      this.uuid = res.data.uuid;
      this.titlesms = res.data.bank_tranfer;
      this.amountsms = res.data.amount;
      this.bank_datesms = res.data.bank_date;
      this.bank_timesms = res.data.bank_time;
      // console.log(this.amountsms);
    },

    async postSMS() {
      const res1 = await UserService.getProfile();
      let timerInterval;
      Swal.fire({
        title: "กรุณารอสักครู่",
        // text: "ประมาณ 1 - 2 นาที",
        imageUrl: "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
        imageWidth: 300,
        imageHeight: 200,

        html: " ประมาน <b></b> นาที.",
        timer: 7654,
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
          this.time = "I was closed by the timer";
        }
      });
      document.getElementById("postSMS").disabled = true;
      document.getElementById("postSMS").disabled = true;
      const create_by = res1.data.username;
      this.form.bank_date = this.bank_datesms;
      this.form.bank_time = this.bank_timesms;
      this.form.amount = this.amountsms;
      this.form.create_by = create_by;

      this.res = await smsService
        .postSmsTransaction(this.uuid, this.form)
        .then(() => {
          document.getElementById("postSMS").disabled = true;

          window.$("#postSMS").modal("hide");
          window.$("#postSMSA").modal("hide");
          window.$("#postSMS").modal("hide");
          window.$("#postsmsdecimal").modal("hide");
          window.$("#postCurl").modal("hide");
          window.$("#postTrue").modal("hide");
          window.$("#postSMSA").modal("hide");
          swal({
            position: "top-end",
            icon: "success",
            title: "เรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          swal({
            position: "top-end",
            icon: "error",
            title: error.response.data.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    async postTrue() {
      const res1 = await UserService.getProfile();
      const create_by = res1.data.username;
      this.form.bank_date = "รายการจาก";
      this.form.bank_time = "TrueMoney";
      this.form.amount = this.amounttrue;
      this.form.create_by = create_by;
      this.res = await smsService.postTrueTransaction(this.uuid, this.form);
      // console.log(res);
      window.$("#postSMS").modal("hide");
      window.$("#postSMSA").modal("hide");
      window.$("#postSMS").modal("hide");
      window.$("#postsmsdecimal").modal("hide");
      window.$("#postCurl").modal("hide");
      window.$("#postTrue").modal("hide");
      window.$("#postSMSA").modal("hide");
      window.$("#postTrue").modal("hide");
      // Swal({
      //   position: "top-end",
      //   icon: "success",
      //   title: "เรียบร้อยแล้ว",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    },
    // async getMainBank() {
    //   console.log("AS");
    //   const res = await bankService.getBankAPIAccount();
    //   console.log(res);

    //   // this.decimalbank = res.data.data[0].bank_name;
    // },
    async postToHideSMS(uuid) {
      const res = await smsService.postShowByUUID(uuid);
      console.log(res);
    },
  },
};
</script>
<style scoped></style>
