<template>
  <div id="oldMember">
    <div class="page-inner">
      <div class="page-header">
        <br />
        <h4 class="page-title">
          <i class="fa fa-user" aria-hidden="true"></i> ลูกค้าเก่า
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>

      <div class="col-md-12">
        <div class="col-md-12">
          <!-- <topDashboard /> -->
        </div>
        <div class="col-md-12 row">
          <div class="col-md-12"></div>
          <form v-on:submit.prevent="oldMemberUpdate" class="col-md-12">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="column">
                    <div class="row">
                      <div class="card-body col-md-4">
                        <h4>Username ลูกค้าเก่า</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          placeholder="ชื่อผู้ใช้งานเก่า"
                          v-model.trim="form.username"
                          required
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="card-body col-md-4">
                        <h4>สถานะลูกค้า</h4>
                        <select
                          class="form-control"
                          v-model="form.new_member"
                          required
                        >
                          <option selected disabled value>
                            เลือกสถานะลูกค้า
                          </option>
                          <option value="1">ลูกค้าใหม่</option>
                          <option value="0">ลูกค้าเก่า</option>
                        </select>
                      </div>
                      <div class="card-body col-md-4">
                        <h4>วันที่ลงทะเบียน</h4>
                        <VueCtkDateTimePicker
                          v-model="form.register_date"
                          required
                          format="YYYY-MM-DD HH:mm:ss"
                          formatted="DD/MM/YYYY HH:mm"
                          :no-label="true"
                          label="เลือกวันที่"
                        />
                      </div>
                      <div class="card-body col-md-4">
                        <h4>Prefix</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          placeholder="prefix"
                          v-model.trim="form.prefix"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="card-body col-md-3">
                        <h4>หมายเลขโทรศัพท์ของลูกค้า</h4>
                        <input
                          type="number"
                          class="form-control"
                          aria-describedby="helpId"
                          placeholder="หมายเลขโทรศัพท์"
                          v-model.trim="form.tel"
                          required
                        />
                      </div>
                      <div class="card-body col-md-3">
                        <h4>รหัสผ่าน</h4>
                        <input
                          type="password"
                          class="form-control"
                          aria-describedby="helpId"
                          placeholder="รหัสผ่านผู้ใช้งานเก่า"
                          v-model.trim="form.password"
                          required
                        />
                      </div>
                      <div class="card-body col-md-3">
                        <h4>ชื่อ</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          placeholder="ชื่อตามสมุดบัญชี"
                          v-model.trim="form.first_name"
                          required
                        />
                      </div>
                      <div class="card-body col-md-3">
                        <h4>นามสกุล</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          placeholder="นามสกุลตามสมุดบัญชี"
                          v-model.trim="form.last_name"
                          required
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="card-body col-md-6">
                        <h4>ธนาคาร</h4>
                        <select
                          class="form-control"
                          v-model="form.bank_name"
                          required
                        >
                          <option selected disabled value>เลือกธนาคาร</option>
                          <option value="kbnk">ธนาคารกสิกรไทย</option>
                          <option value="ktba">ธนาคารกรุงไทย</option>
                          <option value="scb">ธนาคารไทยพาณิชย์</option>
                          <option value="bay">ธนาคารกรุงศรีอยุธยา</option>
                          <option value="bbla">ธนาคารกรุงเทพ</option>
                          <option value="gsb">ธนาคารออมสิน</option>
                          <option value="promptpay">พร้อมเพย์</option>
                          <option value="tmb">ธนาคารทหารไทย</option>
                          <!-- <option value="truemoney">Truemoney Wallet</option> -->
                          <option value="BAAC">
                            ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร
                          </option>
                          <option value="ICBC">ธนาคารไอซีบีซี (ไทย)</option>
                          <option value="TCD">
                            ธนาคารไทยเครดิตเพื่อรายย่อย
                          </option>
                          <option value="CITI">ธนาคารซิตี้แบงก์</option>
                          <option value="SCBT">
                            ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)
                          </option>
                          <option value="CIMB">ธนาคารซีไอเอ็มบีไทย</option>
                          <option value="UOB">ธนาคารยูโอบี</option>
                          <option value="HSBC">
                            ธนาคารเอชเอสบีซี ประเทศไทย
                          </option>
                          <option value="MIZUHO">ธนาคารมิซูโฮ คอร์ปอเรต</option>
                          <option value="GHB">ธนาคารอาคารสงเคราะห์</option>
                          <option value="LHBANK">
                            ธนาคารแลนด์ แอนด์ เฮ้าส์
                          </option>
                          <option value="TBANK">ธนาคารธนชาต</option>
                          <option value="TISCO">ธนาคารทิสโก้</option>
                          <option value="KKP">ธนาคารเกียรตินาคิน</option>
                          <option value="IBANK">
                            ธนาคารอิสลามแห่งประเทศไทย
                          </option>
                        </select>
                      </div>
                      <div class="card-body col-md-6">
                        <h4>หมายเลขบัญชีธนาคาร</h4>
                        <input
                          type="number"
                          class="form-control"
                          aria-describedby="helpId"
                          placeholder="หมายเลขบัญชี"
                          v-model.trim="form.bank_number"
                          required
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="card-body col-md-4">
                        <h4>การรับโบนัส</h4>
                        <select
                          class="form-control"
                          v-model="form.bonus"
                          required
                        >
                          <option selected disabled value>เลือกโบนัส</option>
                          <option value="1">รับโบนัส</option>
                          <option value="0">ไม่รับโบนัส</option>
                        </select>
                      </div>
                      <div class="card-body col-md-4">
                        <h4>รู้จักผ่าน</h4>
                        <select
                          class="form-control"
                          id="know_us"
                          name="know_us"
                          v-model="form.know_us"
                          required
                        >
                          <option selected disabled value>
                            รู้จักเราผ่านช่องทางใด
                          </option>
                          <option value="facebook">Facebook</option>
                          <option value="line">Line</option>
                          <option value="instagram">Instagram</option>
                        </select>
                      </div>
                      <div class="card-body col-md-4">
                        <h4>Line ID</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          placeholder="ไลน์ไอดี"
                          v-model.trim="form.line_id"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success mr-1 text-white float-right"
                    >
                      <i class="fa fa-check" aria-hidden="true"></i>
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import oldMember from "../../../services/old-member";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      prefixgen: "",

      form: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        tel: "",
        bank_number: "",
        bank_name: "",
        line_id: "",
        know_us: "",
        bonus: "",
        new_member: "",
      },
    };
  },
  mounted() {
    this.randomPrefix();
  },
  methods: {
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

    async oldMemberUpdate() {
      try {
        console.log(this.form);
        // const oldmemberForm = {
        //   username: this.form.username,
        //   password: this.form.password,

        //   first_name: this.form.first_name,
        //   last_name: this.form.last_name,
        //   tel: this.form.tel,

        //   bank_number: this.form.bank_number,
        //   bank_name: this.form.bank_name,
        //   line_id: this.form.line_id,
        //   know_us: this.form.know_us,
        //   bonus: this.form.bonus,
        //   register_date: this.form.register_date,
        //   prefix: this.prefixgen,
        //   new_member: this.form.new_member,
        // };
        const resp = await oldMember.oldUser(this.form);
        this.$toast.success("เพิ่มข้อมูลเรียบร้อยแล้ว", {
          position: "top-right",
          timeout: 1500,
        });
        this.$router.push("/user");

        console.log(resp);
      } catch (error) {
        this.$toast.error(error.response.data.error.message, {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
    randomPrefix() {
      let prefixgen =
        Math.random().toString(36).substring(2, 6) +
        Math.random().toString(36).substring(2, 4);
      this.form.prefix = prefixgen;
      console.log(this.form.prefix);

      return prefixgen;
    },
  },
};
</script>
