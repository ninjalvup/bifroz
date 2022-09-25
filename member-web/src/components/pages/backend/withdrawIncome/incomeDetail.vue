<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <nav aria-label="breadcrumb">
          <ol
            class="breadcrumb "
          >
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item" aria-current="page">ถอนรายได้</li>
          </ol>
        </nav>
      </div>
    </div>
    <sharetap />
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!-- <userData /> -->
      </div>
    </div>

    <div
      class="card mt-3 p-3 text-center border-0 rounded"
      style="background-color: rgb(27, 27, 27);"
      
    >
      <table style="width: 100%">
        <tr>
          <td colspan="6" style="text-align: center; padding-bottom: 16px">
            <h5>ถอนรายได้</h5>
          </td>
        </tr>
        <tr>
          <td style="text-align: right; padding-right: 20px">
            <img id="imgBank" src="" />
          </td>
          <td colspan="5" style="text-align: left">
            <h6>ชื่อบัญชี: {{ name }}</h6>
          </td>
        </tr>
        <tr>
          <td style="text-align: right; padding-right: 20px"></td>
          <td colspan="5" style="text-align: left">
            <h6>ธนาคาร: {{ bankName }}</h6>
            <h6>เลขที่บัญชี: {{ bankAccount }}</h6>
          </td>
        </tr>
      </table>
      <hr />
      <form v-on:submit.prevent="fnWithdrawIncome">
        <div class="form-group">
          <label>จำนวนเงินที่ต้องการถอน</label>
          <input
          style="
    color: black !important;
"
              type="number"
              name="amount"
              id="formGroupExampleInput"
              v-model="withdrawIncome"
              class="form-control text-center col-6 mx-auto"
              placeholder="กรุณากรอกจำนวนเงิน"
            />
          
          <!-- <h5>จำนวนเงิน: {{ withdrawIncome }} บาท</h5> -->

          <label class="mt-2 text-danger"
            >** เพื่อสิทธิประโยชน์ของผู้ใช้ ระบบมีความจำเป็นต้องให้ผู้ใช้
            ถอนเงินออกจากเครดิตที่เลือกทั้งหมด แล้วระบบจะโอน
            เข้าบัญชีของคุณภายใน 10 นาที</label
          >
          <div>
            <button
              class="btn btn-blue btn-lg text-center text-white"
              style="border-radius: 25px"
              id="btnStatus"
            >
              <i class="fas fa-check-circle"></i> ยืนยันการถอนรายได้
            </button>
          </div>
          <br />
          <label class="mt-2 text-danger"
            >** ต้องมีรายได้ขั้นต่ำ {{ cal }} บาท**</label
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import UserData from "./../home/user-data";
import withdrawService from "@/services/withdrawIncome";
import sharetap from "../sharedLink/sharetap";
export default {
  components: {
    sharetap,
    // UserData,
  },
  data() {
    return {
      withdrawIncome: "",
      btnStatus: "",
      cal: "",
      form: {
        inputForm: "",
      },
      name: "",
      bankAccount: "",
      bankName: "",
    };
  },
  mounted() {
    this.getDataWithdrawIncome();
    this.getDataUser();
  },
  methods: {
    async getDataWithdrawIncome() {
      // select data
      const rs = await withdrawService.getDataWithdrawIncome();
      this.withdrawIncome = rs.income;
      this.cal = rs.setting.amount_withdraw
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.form.inputForm = rs.cal;

      if (rs.cal >= rs.setting.amount_withdraw) {
        document.getElementById("btnStatus").disabled = false;
      } else {
        document.getElementById("btnStatus").disabled = true;
        document
          .getElementById("btnStatus")
          .setAttribute(
            "class",
            "btn btn-danger btn-lg text-center text-white"
          );
      }
    },
    async fnWithdrawIncome() {
      // ถอนรายได้
      const rs = await withdrawService.fnWithdrawIncome(this.form);
      sessionStorage.setItem("amount", this.withdrawIncome);

      if (rs.error == 1) {
        this.$toast.error("ทำรายการผิดพลาด !!!", {
          position: "top-right",
          timeout: 1500,
        });
      } else {
        this.$toast.success("ถอนรายได้สำเร็จ !!!", {
          position: "top-right",
          timeout: 1500,
        });
        this.$router.push("/incomeInfo");
      }
    },
    async getDataUser() {
      // รายละเอียด bank
      const rs = await withdrawService.getDataUser();
      this.name = rs.data.bank_account_name;
      this.bankAccount = rs.data.bank_number;
      this.bankName = rs.nameBank;
      document.getElementById("imgBank").setAttribute("src", rs.imgBank);
    },
  },
};
</script>
<style scoped>
* {
  color: wheat !important;
  font-weight: 700 !important;
}
.rounded {
    border-radius: 1.25rem !important;
}
</style>