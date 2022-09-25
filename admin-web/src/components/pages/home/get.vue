<template>
  <div id="Under-right">
    <div class="card">
      <div class="card-header">
        <h3>รายการรออนุมัติ</h3>
      </div>
      <div
        class="card-body"
        v-for="data in allsmstable"
        v-bind:key="data.data"
      >
        <div class="card-body" v-show="!ishasData">
          <div class="alert alert-danger" role="alert">
            ไม่มีข้อมูลรายการอนุมัติ
          </div>
        </div>
        <div class="card-body">
          <div class="col-md-12">
            <div class="row">
              <div
                class="card col-md-6"
                v-for="data in allsmstable"
                v-bind:key="data.uuid"
              >
                <div>
                  <div class="justify-content-start">
                    <img
                      :src="
                        require(`../../../assets/bank_icon/${data.title.toLowerCase()}.png`)
                      "
                      alt
                      class="icon ml-3"
                      width="40"
                      height="40"
                    />
                    <div class="ml-3">
                      <h6>
                        ชื่อบัญชี: {{ data.first_name || data.firstname }}
                        {{ data.last_name || data.lastname }}
                      </h6>
                      <h6>
                        เลขที่บัญชี:
                        {{ data.bank_account_number || data.title }}
                      </h6>
                      <h6>วันที่:{{ data.createdAt | formatDate }}</h6>
                      <h6 class="text-warning">
                        จำนวน : {{ data.amount | formatCredit }}
                      </h6>
                      <h6
                        class="badge badge-success text-white"
                        v-if="data.status === '1'"
                      >
                        สำเร็จ
                      </h6>
                    </div>
                     <div>
          <div> 
            <button disabled
                    class="btn btn-danger btn-sm mr-1 text-white float-right"
                    data-toggle="modal"
                    data-target="#postCurl"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ซ่อน
                  </button></div>
                
                <!-- v-on:click.prevent="getSmsByUuid(data.uuid)" -->
                <div v-if="data.title === 'curl'">
                  <button
                    class="btn btn-info btn-sm mr-1 text-white float-right"
                    data-toggle="modal"
                    data-target="#postCurl"
                    v-on:click.prevent="getCurlByID(data.id)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยืนยันรายการCURL
                  </button>
                </div>
                <div v-if="data.title === 'SCB'">
                  <button
                    class="btn btn-secondary btn-sm mr-1 text-white float-right"
                    data-toggle="modal"
                    data-target="#postSMS"
                    v-on:click.prevent="getSMSByUUID(data.uuid)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยืนยันรายการSMS
                  </button>
                </div>
                <div v-if="data.title === 'SCBA'">
                  <button
                    class="btn btn-secondary btn-sm mr-1 text-white float-right"
                    data-toggle="modal"
                    data-target="#postSMSA"
                    v-on:click.prevent="getSMSByUUID(data.uuid)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยืนยันรายการSMSA
                  </button>
                </div>
                <div v-if="data.title.toLowerCase() === 'truemoney'">
                  <button
                    class="btn btn-warning btn-sm mr-1 text-white float-right"
                    data-toggle="modal"
                    data-target="#postTrue"
                    v-on:click.prevent="getTruemoneyID(data.id)"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยืนยันรายการTrueMoney
                  </button>
                </div>
                <div v-if="data.title === 'curl_kbank'">
                  <button
                    v-on:click.prevent="getCurlByID(data.id)"
                    class="btn btn-success btn-sm mr-1 text-white float-right"
                    data-toggle="modal"
                    data-target="#postCurl"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยืนยันรายการCURL KBANK
                  </button>
                </div>
              </div>
                  </div>
                  <div v-if="allsmstable.lenght === 0">
                    <div class="alert alert-danger" role="alert">
                      ไม่มีรายการเดินบัญชี
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="postSMS"
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
                        require(`../../../assets/bank_icon/${titlecurl.toLowerCase()}.png`)
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
                    v-model="form.username"
                  />
                </div>

                <button
                  class="btn btn-info mr-1 text-white float-right"
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

      <div
        class="modal fade"
        id="postSMSA"
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
                    v-model="form.username"
                  />
                </div>

                <button
                  class="btn btn-info mr-1 text-white float-right"
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
                <h5 class="modal-title" id="exampleModalLabel">
                  ข้อมูลSMS_CURL
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
                        require(`../../../assets/bank_icon/${titlecurl.toLowerCase()}.png`)
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
                        {{ amountcurl }}
                      </h2>
                    </span>
                  </div>
                  <div class>
                    <p class="text-muted">
                      {{ bank_datecurl }} {{ bank_timecurl }}
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
                  v-on:click.prevent="postCURL(id)"
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
                  v-on:click.prevent="postTrue(id)"
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
  </div>
</template>

<script>
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
      smsForm: {
        amount: "",
        username: "",
        bank_date: "",
        bank_time: "",
        create_by: "",
      },
      ishasData: false,
    };
  },
  mounted() {
    this.getSMS();
    this.getCurlNoAPI();
    this.getTruemoneyNoAPI();

    console.log(this.allsmstable);
  },
  methods: {
    async getSMS() {
      this.allsmstable = [];
      const res = await smsService.getScbSmsTransaction();
      for (var i = 0; i < res.data.length; i++) {
        this.smstable.push({
          id: res.data[i].id,
          uuid: res.data[i].uuid,
          title: res.data[i].bank_tranfer,
          amount: res.data[i].amount,
          status: res.data[i].status,
          date: res.data[i].bank_date,
          time: res.data[i].bank_time,
          content: res.data[i].sms_content,
        });
      }
      // console.log(this.smstable);

      this.smstable.forEach((element) => {
        this.allsmstable.push(element);
      });
      console.log(this.allsmstable);
      if (this.allsmstable.length > 0) {
        this.ishasData = true;
      }
    },

    async getCurlNoAPI() {
      this.allsmstable = [];
      this.titlecurl = "curl";

      const res = await smsService.getCurlNoaccount();
      for (var i = 0; i < res.data.length; i++) {
        this.allcurlnoacc.push({
          id: res.data[i].id,

          title: res.data[i].title,
          amount: res.data[i].amount,
          status: res.data[i].status,
          date: res.data[i].date,
          time: res.data[i].time,
          content:
            res.data[i].date +
            "@" +
            res.data[i].time +
            " " +
            res.data[i].amount +
            " " +
            res.data[i].accountnumber,
        });
      }
      // console.log(this.allcurlnoacc);

      this.allcurlnoacc.forEach((element) => {
        this.allsmstable.push(element);
      });
      if (this.allsmstable.length > 0) {
        this.ishasData = true;
      }
    },
    async getTruemoneyNoAPI() {
      this.allsmstable = [];

      const res = await smsService.getTruemoneyNoaccount();
      for (var i = 0; i < res.data.length; i++) {
        this.alltruetable.push({
          id: res.data[i].id,
          uuid: res.data[i].uuid,

          title: res.data[i].title,
          status: res.data[i].status,
          amount: res.data[i].amount,
          date: "รายการจาก",
          time: "TrueMoney",
          content: "รายการจาก TrueMoney",
        });
      }
      // console.log(this.smstable);

      this.alltruetable.forEach((element) => {
        this.allsmstable.push(element);
      });
      if (this.allsmstable.length > 0) {
        this.ishasData = true;
      }
    },
    async getSMSByUUID(uuid) {
      this.form.username = [];

      console.log(uuid);

      const res = await smsService.getScbSmsTransactionByUuid(uuid);
      console.log(res);
      this.uuid = res.data.uuid;
      this.titlesms = res.data.bank_tranfer;

      this.amountsms = res.data.amount;
      this.bank_datesms = res.data.bank_date;
      this.bank_timesms = res.data.bank_time;
      console.log(this.amountsms);
    },
    async getCurlByID(id) {
      this.modalShow = true;

      this.form.username = [];

      console.log(id);
      const res = await smsService.getCurlByIDAPI(id);
      console.log(res);
      this.id = res.data.id;

      this.titlecurl = res.data.title;
      console.log(this.titlecurl);
      this.amountcurl = res.data.amount;
      this.bank_datecurl = res.data.date;
      this.bank_timecurl = res.data.time;
      // this.titlecurl = res.data.title;
    },

    async getTruemoneyID(id) {
      this.form.username = [];

      console.log(id);
      const res = await smsService.getTruemoneyIDAPI(id);
      console.log(res.data);
      this.id = res.data.id;
      this.amounttrue = res.data.amount;
      this.bank_datetrue = "รายการจาก";
      this.bank_timetrue = "TrueMoney";
      this.titletrue = res.data.title;
    },
    async postSMS(uuid) {
      console.log("ASD");
      // const form=[];
      console.log(this.uuid);
      console.log(uuid);

      const res1 = await UserService.getProfile();
      const create_by = res1.data.username;
      this.form.bank_date = this.bank_datesms;
      this.form.bank_time = this.bank_timesms;
      this.form.amount = this.amountsms;
      this.form.create_by = create_by;

      console.log(this.form);
      const res = await smsService.postSmsTransaction(this.uuid, this.form);

      console.log(res);
      window.$("#postSMS").modal("hide");
      window.$("#postSMSA").modal("hide");
      this.$toast.success("เเก้ไขข้อมูลเรียบร้อย", {
        position: "top-right",
        timeout: 1500,
      });
      this.allsmstable = [];

      this.getSMS();
      this.getCurlNoAPI();
      this.getTruemoneyNoAPI();
    },

    async postCURL(id) {
      console.log("ASD");
      console.log(this.id);
      console.log(id);
      const res1 = await UserService.getProfile();
      const create_by = res1.data.username;
      this.form.bank_date = this.bank_datecurl;
      this.form.bank_time = this.bank_timecurl;
      this.form.amount = this.amountcurl;
      this.form.create_by = create_by;

      console.log(this.form);
      const res = await smsService.postCurlTransaction(this.id, this.form);

      console.log(res);
      window.$("#postCurl").modal("hide");
      this.$toast.success("เเก้ไขข้อมูลเรียบร้อย", {
        position: "top-right",
        timeout: 1500,
      });
      this.allsmstable = [];

      this.getSMS();
      this.getCurlNoAPI();
      this.getTruemoneyNoAPI();
    },

    async postTrue(id) {
      console.log("ASD");
      console.log(this.id);
      console.log(id);
      const res1 = await UserService.getProfile();
      const create_by = res1.data.username;
      this.form.bank_date = "รายการจาก";
      this.form.bank_time = "TrueMoney";
      this.form.amount = this.amounttrue;
      this.form.create_by = create_by;

      console.log(this.form);
      const res = await smsService.postTrueTransaction(this.id, this.form);
      console.log(res);
      window.$("#postTrue").modal("hide");
      this.$toast.success("เเก้ไขข้อมูลเรียบร้อย", {
        position: "top-right",
        timeout: 1500,
      });
      this.allsmstable = [];

      this.getSMS();
      this.getCurlNoAPI();
      this.getTruemoneyNoAPI();
    },
  },
};
</script>
<style scoped>
</style>