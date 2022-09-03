<template>
  <div id="withdrawranking">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-trophy    "></i> 5 อันดับ ฝากเงินมากที่สุด
        </h4>
      </div>
      <div class="row">
        <div class="col-md-12 container">
          <div class="card">
            <div class=" table-responsive">
              <table
                class="display table table-striped table-hover table-bordered"
              >
                <thead>
                  <tr class=" border text-center">
                    <th>#</th>
                    <th class="text-left">ลูกค้า</th>
                    <th class="text-right">ยอดเงินฝาก</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-left"
                    v-for="(data, index) in deposittable"
                    v-bind:key="data.uuid"
                  >
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>
                      <div>
                        {{ data.member_account_banks[0].bank_account_name }}
                      </div>
                      <div>
                          {{data.username}}
                      </div>
                      <div>

                      </div>
                    </td>
                    <td  class="text-right">{{data.amount | formatCredit}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
            <div class="page-header">
        <h4 class="page-title">
          <i class="fas fa-trophy    "></i> 5 อันดับ ถอนเงินมากที่สุด
        </h4>
      </div>
          <div class="card">
            <div class=" table-responsive">
              <table
                class="display table table-striped table-hover table-bordered"
              >
                <thead>
                  <tr class=" border text-center">
                    <th>#</th>
                    <th class="text-left">ลูกค้า</th>
                    <th class="text-right">ยอดเงินถอน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-center"
                    v-for="(data, index) in withdrawtable"
                    v-bind:key="data.uuid"
                  >
                    <td>{{ index + 1 }}</td>
                     <td class="text-left">
                      <div>
                        {{ data.member_account_banks[0].bank_account_name }}
                      </div>
                      <div>
                          {{data.username}}
                      </div>
                      <div>

                      </div>
                    </td>
                    <td class="text-right">{{data.amount.toFixed() | formatCredit}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reportService from "@/services/reportService";

export default {
  data() {
    return {
      withdrawtable: "",
      deposittable: "",
    };
  },
  methods: {
    async getWithdrawRanking() {
      const res = await reportService.getWithdrawRanking();
      console.log(res.data);
      this.withdrawtable = res.data;
    },
    async getDepositRanking() {
      const res = await reportService.getDepositRanking();
      console.log(res);
      this.deposittable = res.data;
    },
  },
  mounted() {
    this.getDepositRanking();
    this.getWithdrawRanking();
  },
};
</script>

<style></style>
