<template>
  <div>
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item ">
              <router-link class="" to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item active " aria-current="page">รายการบัญชี</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card border-0 shadow">
          <div class="card-body rounded">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  class="nav-item nav-link active"
                  id="nav-home-tab"
                  data-toggle="tab"
                  href="#nav-home"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >รายการถอน</a>
                <a
                  class="nav-item nav-link"
                  id="nav-profile-tab"
                  data-toggle="tab"
                  href="#nav-profile"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >รายการฝาก</a>
              </div>
            </nav>
             <!-- รายการถอน -->
            <div class="tab-content" id="nav-tabContent"> 
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div class="p-2">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ถอน ฿</th>
                        <!-- <th scope="col">ยอดก่อนถอน</th>
                        <th scope="col">ยอดหลังถอน</th> -->
                        <th scope="col">วันที่ถอน</th>
                        <th scope="col">สถานะ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in reportwithdraw" v-bind:key="data.status">
                        <td>{{data.amount| formatNumber}}</td>
                        <!-- <td>{{data.credit_before| formatNumber}}</td>
                        <td>{{data.credit_after| formatNumber}}</td> -->
                        <td>{{data.bank_time}}</td>
                        <td>
                           <div v-if="data.transaction_status== '1' || data.transaction_status== 'Success'">
                            <p>สำเร็จ</p>
                          </div>
                            <div v-if="data.transaction_status== 'Create'">
                            <p>รอดำเนินการ</p>
                          </div>
                           <div v-if="data.transaction_status== 'Reject'">
                            <p>ยกเลิก</p>
                          </div>
                          <div v-if="data.transaction_status== '0' || data.transaction_status== 'manual' || data.transaction_status== 'Manual'" >
                            <p>สำเร็จ</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                    <tr v-if="reportwithdraw.length == '0'">
                      <td colspan="8" class="text-center text-danger">
                        <i class="fas fa-times"></i>
                        ไม่มีข้อมูล !
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
              <!-- รายการฝาก -->
                <div class="p-2">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ฝาก ฿</th>
                        <!-- <th scope="col">ยอดก่อนฝาก</th>
                        <th scope="col">ยอดหลังฝาก</th> -->
                        <th scope="col">วันที่ฝาก</th>
                        <th scope="col">สถานะ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in reportdeposit" v-bind:key="data.status">
                        <td v-if="data.transaction_status == 'Success'  || data.transaction_status == 'manual' ">{{data.amount| formatNumber}}</td>
                        <!-- <td>{{data.credit_before| formatNumber}}</td>
                        <td>{{data.credit_after| formatNumber}}</td> -->
                        <td v-if="data.transaction_status == 'Success' || data.transaction_status == 'manual' ">{{data.bank_time}}</td>
                        <td v-if="data.transaction_status == 'Success'  || data.transaction_status == 'manual' ">
                          <div v-if="data.transaction_status == 'Success'  || data.transaction_status == 'manual' ">
                            <p>สำเร็จ</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                     <tbody>
                    <tr v-if="reportdeposit.length == '0'">
                      <td colspan="8" class="text-center text-danger">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseURL } from "./../../../../services/api";
export default {
  name: "report",
  data() {
    return {
      reportdeposit: [],
      reportwithdraw: [],
      bank_time:''
    };
  },
  methods: {
        onChangePage(reportwithdraw) {
            // update page of items
            this.reportwithdraw = reportwithdraw;
        }
  },

  mounted() {
    //รายการฝากถอน
    axios({
      method: "get",
      url: baseURL+"/member/reportdeposit",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.reportdeposit = response.data.data.status;
      
      })
      .catch((error) => {
        console.log(error);
           if(error.response.data == 'Unauthorized'){
           sessionStorage.removeItem('access_token')
        }
      });
    axios({
      method: "get",
      url: baseURL+"/member/reportwithdraw",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.reportwithdraw = response.data.data.status;
        if (response.status === 200) {
          console.log("");
        }
      })
      .catch((error) => {
        console.log(error);
           if(error.response.data == 'Unauthorized'){
           sessionStorage.removeItem('access_token')
        }
      });
  },
};
</script>

<style scoped>


.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #bd2130;
    background-color: #f300000f;
    border-color: #d8c1c3 #d8d8d8 #ffffff;
}

</style>>
