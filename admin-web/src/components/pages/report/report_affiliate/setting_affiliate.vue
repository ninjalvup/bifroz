<template>
  <div id="setting-affiliate">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-users-cog"></i> ตั้งค่าระบบ Affiliate
        </h4>
      </div>
      <div class="col-md-12" style="padding: 0px 0px 0px 0px">
        <!--tips: add .text-center,.text-right to the .card to change card text alignment-->
        <div class="card-header bg-primary text-white">
          รายละเอียดการตั้งค่าส่วนแบ่ง
        </div>
        <div class="card card-body">
          <form v-on:submit.prevent="updateData">
            <!-- <div class="form-group">
              <label>ตั้งค่า Affiliate</label>
              <select
                name="promotion_type_id"
                class="form-control"
                v-model="form.promotion_type_id"
                disabled
              >
                <option value="1">ทุกยอดได้เสียของเพื่อน</option>
              </select>
            </div> -->

            <div class="form-group">
              <label for="first_deposit">เปอร์เซ็นต์จากยอด Turn Over(%)</label>
              <input
                type="number"
                class="form-control"
                max="100"
                name="percent"
                v-model="form.percent"
                required
              />
              <small class="text-danger">**เช่น 20 % ให้กรอก 20 </small>
            </div>

            <div class="form-group">
              <label for="second_deposit">จำนวนเงินที่อนุมัติให้ถอน</label>
              <input
                type="number"
                class="form-control"
                name="amount"
                v-model="form.amount"
                required
              />
              <small class="text-danger">**เช่น 1000 ให้กรอก 1000 </small>
            </div>
            <button type="submit" class="btn btn-success">ตกลง</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import affiliateService from "@/services/affiliateService";
import axios from "axios";
import { baseURL } from "../../../../services/api";

export default {
  data() {
    return {
      form: {
        percent: "",
        amount: "",
        promotion_type_id: "",
      },
    };
  },
  mounted() {
    this.getDataSetting();
  },
  methods: {
    async getDataSetting() {
      const setting = await affiliateService.getDataSetting();
      this.form.promotion_type_id = setting.data[0].promotion;
      this.form.percent = setting.data[0].percent_value;
      this.form.amount = setting.data[0].amount_withdraw;
    },
    async updateData() {
      axios
        .post(baseURL + "/affiliate/update-promotion", this.form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          this.$toast.success("ตั้งค่า Affiliate สำเร็จ", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
        })
        .finally(() => {
          //Perform action in always
        });
    },
  },
};
</script>

<style></style>
