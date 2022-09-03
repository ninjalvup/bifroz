<template>
  <div class="page-inner">
    <div class="page-header">
      <h4 class="page-title">
        <i class="fas fa-money-check-alt"></i> เช็คข้อมูลแนะนำเพื่อน
      </h4>
    </div>
    <div class="col-md-12" style="padding: 0px 0px 0px 0px">
      <div class="card">
        <div class="card-body">
          <form
            class="form-inline justify-content-center"
            v-on:submit.prevent="submitFormSearch"
          >
            <div class="form-group">
              <label
                ><span class="required-label">*</span>ชื่อผู้ใช้งาน :
              </label>
              <input
                type="text"
                class="form-control mr-2 ml-1"
                v-model="form.inputSearch"
                required
              />
              <button type="submit" class="btn btn-primary btn-sm ml-2">
                ค้นหา
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="card">
        <div class="card-header bg-primary text-white">
          <h4>ข้อมูลลูกค้า</h4>
        </div>
        <div class="card-body row">
          <div class="col-md-6">
            <h3>ชื่อ</h3>
            <h6 style="color: #8c8c8c">
              {{ user }}
              <hr />
            </h6>

            <h3>รายได้จากคอมมิชชั่น</h3>
            <h6 style="color: #8c8c8c">
              {{ totalIncome }}
              <hr />
            </h6>
          </div>
          <div class="col-md-6">
            <h3>จำนวน USER ที่แนะนำ</h3>
            <h6 style="color: #8c8c8c">
              {{ total }}
              <hr />
            </h6>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="table-responsive">
          <table class="display table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th colspan="7" class="text-left">
                  จำนวนรายการทั้งหมด (x) รายการ
                </th>
              </tr>
              <tr class="text-center border">
                <th>#</th>
                <th>ยูสลูกค้า</th>
                <th>LV</th>
                <th>รายรับ</th>
                <th>วันที่</th>
                <th>ประเภท</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="(data, index) in listTable"
                v-bind:key="data.id"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ data.sb_username }}</td>
                <td>{{ data.LV }}</td>
                <td>{{ data.income }}</td>
                <td>{{ data.deposite_date }}</td>
                <td><span class="badge badge-success">ฝากเงิน</span></td>
                <td><span class="badge badge-warning">รอถอน</span></td>
              </tr>
            </tbody>
            <tbody>
              <tr v-if="listTable.length == '0'">
                <td colspan="7" class="text-center text-danger">
                  <i class="fas fa-times"></i> ไม่มีข้อมูล !
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
import affiliateService from "@/services/affiliateService";
export default {
  data() {
    return {
      form: {
        inputSearch: "",
      },
      user: "ซุปเปอร์วิก เค",
      total: "(x)",
      totalIncome: "(x)",
      listTable: [],
    };
  },
  methods: {
    async submitFormSearch() {
      const res = await affiliateService.getSearchUserData(this.form);

      this.user = res.data.userName;
      this.total = res.data.total;
      this.totalIncome = res.data.totalIncome;
      this.listTable = res.data.table;
    },
  },
};
</script>
