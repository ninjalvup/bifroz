<template>
  <div id="top-dashboard">
    <div class="card">
      <div class="card-body">
        <div class="row anyClass">
          <div
            class="col-md-4"
            v-for="data in accountbank"
            v-bind:key="data.id"
          >
            <div class="card text-white" style="background-color: #808080">
              <div class="card-body skew-shadow">
                <div class="row">
                  <div class="col-8">
                    <h4 class="fw-bold">{{ data.bank_account_name }}</h4>

                    <h4 class="fw-bold">{{ data.bank_number }}</h4>
                    <div v-if="data.bank_status === '1'">
                      สถานะ:
                      <div>
                      <h1 class="badge badge-success mt-2" >เปิดใช้งาน</h1>

                      </div>
                    </div>
                    <div v-if="data.bank_status === '0'">
                      สถานะ:
                      <div>
                      <h1 class="badge badge-dark mt-2" >ปิดใช้งาน</h1>

                      </div>
                    </div>
                  </div>
                  <div class="col-4 text-center">
                    <img
                      :src="
                        require(`../../../assets/bank_icon/${data.bank_name.toLowerCase()}.png`)
                      "
                      alt
                      class="icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="accountbank.length == 0" class="card-body">
            <div>
              <div class="alert alert-danger" role="alert">
                ไม่มีข้อมูลบัญชีธนาคาร
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bankService from "@/services/bankService";

export default {
  data() {
    return {
      accountbank: [],
      amount: "",
      bank_account_name: "",
      bank_name: "",
      bank_number: "",
    };
  },
  components: {},
  mounted() {
    this.getBank();
  },
  methods: {
    async getBank() {
      this.accountbank=[];
      const res = await bankService.getBankList();
      // this.accountbank = res.data.data;
      console.log(res.data.data.length);

      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].bank_type === '1') {
          this.accountbank.push({
            bank_account_name: res.data.data[i].bank_account_name,
            bank_number: res.data.data[i].bank_number,
            bank_status: res.data.data[i].bank_status,
            bank_name: res.data.data[i].bank_name,
          });
        }
      }
      // console.log(this.accountbank);
    },
  },
};
</script>
<style scoped>
.anyClass {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>