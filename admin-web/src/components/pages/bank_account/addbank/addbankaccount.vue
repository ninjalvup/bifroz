<template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-plus-square" aria-hidden="true"></i> เพิ่มบัญชีธนาคาร
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">เพิ่มธนาคาร</h4>
            </div>
            <form v-on:submit.prevent="submitForm">
              <div class="card-body container">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label
                          for="bank_account_name"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          เลือกธนาคาร:
                          <span class="required-label">*</span>
                        </label>
                        <select
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          name="bank_name"
                          id="bank_name"
                          v-model="form.bank_name"
                          required
                        >
                          <option selected disabled value>เลือกธนาคาร</option>
                          <option value="scb">ธนาคารไทยพาณิชย์</option>
                          <option value="kbnk">ธนาคารกสิกรไทย</option>
                          <option value="truemoney">Truemoney Wallet</option>

                          <!-- <option value="ktba">ธนาคารกรุงไทย</option>
                          <option value="bay">ธนาคารกรุงศรีอยุธยา</option>
                          <option value="bbla">ธนาคารกรุงเทพ</option>
                          <option value="gsb">ธนาคารออมสิน</option>
                          <option value="promptpay">พร้อมเพย์</option>
                          <option value="tmb">ธนาคารทหารไทย</option>
                        
                          <option value="BAAC">
                            ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร
                          </option>
                          <option value="ICBC">ธนาคารไอซีบีซี (ไทย)</option>
                          <option value="TCD">ธนาคารไทยเครดิตเพื่อรายย่อย</option>
                          <option value="CITI">ธนาคารซิตี้แบงก์</option>
                          <option value="SCBT">
                            ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)
                          </option>
                          <option value="CIMB">ธนาคารซีไอเอ็มบีไทย</option>
                          <option value="UOB">ธนาคารยูโอบี</option>
                          <option value="HSBC">ธนาคารเอชเอสบีซี ประเทศไทย</option>
                          <option value="MIZUHO">ธนาคารมิซูโฮ คอร์ปอเรต</option>
                          <option value="GHB">ธนาคารอาคารสงเคราะห์</option>
                          <option value="LHBANK">ธนาคารแลนด์ แอนด์ เฮ้าส์</option>
                          <option value="TBANK">ธนาคารธนชาต</option>
                          <option value="TISCO">ธนาคารทิสโก้</option>
                          <option value="KKP">ธนาคารเกียรตินาคิน</option>
                          <option value="IBANK">ธนาคารอิสลามแห่งประเทศไทย</option> -->
                        </select>
                      </div>
                      <div class="form-group row">
                        <label
                          for="bank_number"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          เลขที่บัญชี :
                          <span class="required-label">*</span>
                        </label>
                        <input
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          type="text"
                          name="bank_number"
                          id="bank_number"
                          aria-describedby="helpId"
                          placeholder="เลขที่บัญชี"
                          v-model="form.bank_number"
                          required
                        />
                      </div>
                      <div class="form-group row">
                        <label
                          for="bank_account_name"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          ชื่อบัญชี:
                          <span class="required-label">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          name="bank_account_name"
                          id="bank_account_name"
                          aria-describedby="helpId"
                          placeholder="ชื่อบัญชี"
                          v-model="form.bank_account_name"
                          required
                        />
                      </div>
                      <div class="form-group row">
                        <label
                          for="status_system"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          Status System:
                          <span class="required-label">*</span>
                        </label>
                        <select
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          name="status_system"
                          id="status_system"
                          v-model="form.status_system"
                          required
                        >
                          <option selected disabled value>
                            เลือกสถานะระบบ
                          </option>
                          <option value="1">Online</option>
                          <option value="0">Offline</option>
                          >
                        </select>
                      </div>
                      <div class="form-group row">
                        <label
                          for="bank_sms"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          SMS:
                          <span class="required-label">*</span>
                        </label>
                        <select
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          name="bank_sms"
                          id="bank_sms"
                          v-model="form.bank_sms"
                          required
                        >
                          <option selected disabled value>
                            เลือกสถานะ SMS
                          </option>
                          <option value="1">เปิดรับ SMS</option>
                          <option value="0">ปิดรับ SMS</option>
                        </select>
                      </div>
                      <div class="form-group row">
                        <label
                          for="bank_status"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          สถานะ:
                          <span class="required-label">*</span>
                        </label>
                        <select
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          name="bank_status"
                          id="bank_status"
                          v-model="form.bank_status"
                          required
                        >
                          <option selected disabled value>เลือกสถานะ</option>
                          <option value="1">เปิดใช้งาน</option>
                          <option value="0">ปิดใช้งาน</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label
                          for="bank_type"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          ประเภท:
                          <span class="required-label">*</span>
                        </label>
                        <select
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          name="bank_type"
                          id="bank_type"
                          v-model="form.bank_type"
                          required
                        >
                          <option selected disabled value>เลือกประเภท</option>

                          <option
                            v-for="option in options"
                            :value="option.id"
                            v-bind:key="option.value"
                          >
                            {{ option.type }}
                          </option>
                        </select>
                      </div>

                      <div v-if="form.bank_type === 1" class="form-group row">
                        <label
                          for="bank_type"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          การฝาก:
                          <span class="required-label">*</span>
                        </label>
                        <select
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          name="bank_type"
                          id="bank_type"
                          v-model="form.type_deposit"
                          required
                        >
                          <option selected disabled value>
                            เลือกประเภทการฝาก
                          </option>

                          <option value="0">ฝากปกติ</option>
                          <option value="1">ฝากทศนิยม</option>
                        </select>
                      </div>
                      <div class="form-group row">
                        <label
                          for="bank_number"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          USERNAME :
                          <span class="required-label">*</span>
                        </label>
                        <input
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          type="text"
                          name="username"
                          id="username"
                          aria-describedby="helpId"
                          placeholder="USERNAME"
                          v-model="form.username"
                          required
                        />
                      </div>
                      <div class="form-group row">
                        <label
                          for="bank_number"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          PASSWORD :
                          <span class="required-label">*</span>
                        </label>
                        <input
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          type="password"
                          name="password"
                          id="password"
                          aria-describedby="helpId"
                          placeholder="PASSWORD"
                          v-model="form.password"
                          required
                        />
                      </div>
                      <div class="form-group row">
                        <label
                          for="bank_number"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          ลำดับที่ :
                          <span class="required-label">*</span>
                        </label>
                        <input
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          type="number"
                          name="account_sequence"
                          id="account_sequence"
                          aria-describedby="helpId"
                          placeholder="ACCOUNT SEQUENCE"
                          v-model="form.account_sequence"
                          required
                        />
                      </div>
                      <div class="form-group row">
                        <label
                          for="bank_number"
                          class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                        >
                          ชุดที่ :
                          <span class="required-label">*</span>
                        </label>
                        <input
                          class="form-control col-lg-4 col-md-9 col-sm-8"
                          type="number"
                          name="account_set"
                          id="account_set"
                          aria-describedby="helpId"
                          placeholder="ACCOUNT SET"
                          v-model="form.account_set"
                          required
                        />
                      </div>
                      <div class="form-group d-flex justify-content-center">
                        <button class="btn btn-primary btn-lg">
                          <i class="fa fa-check" aria-hidden="true"></i>
                          ยืนยัน
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bankService from "@/services/bankService.js";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      options: [
        { id: 1, value: 1, type: "การฝาก" },
        { id: 2, value: 2, type: "การถอน" },
      ],
      form: {
        username: "",
        password: "",
        type_deposit: "",
        account_sequence: "",
        account_set: "",
        bank_account_name: "",
        bank_name: "",
        bank_number: "",
        bank_status: "",
        bank_type: "",
        bank_sms: "",
        status_system: "",
      },
    };
  },
  methods: {
    async checkAuth(){
       const res = await UserService.getProfile().catch(function (error) {
        if(error.response.status === 401 || error.response.status === 500){
      const removeToken = localStorage.removeItem("access_token");
        if (removeToken == null) {
        this.$router.push("/login");
      }
      }
      });
      res.logout
    },
    async submitForm() {
      // .post(url + "/", this.form, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + localStorage.getItem("access_token"),
      //   },
      // })
      // console.log(this.form);
      this.res = await bankService.postAddbank(this.form)
        .then(() => {
          this.$router.push("/bankaccount");

          this.$toast.success("เพิ่มธนาคารเรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
        })
        
        .catch((error) => {
          console.log(error);
          this.$toast.error("มีข้อมูลหมายเลขบัญชีนี้แล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
        })
        .finally(() => {
        });
    },
  },
  mounted(){
    this.checkAuth();
  }
};
</script>
