<template>
  <div id="home">
    <!-- ฝากทรูวอเลท -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/depositlist">เลือกการฝาก</router-link>
            </li>
            <!-- <li class="breadcrumb-item" aria-current="page">
              <router-link to="/deposit">ฝากเงิน</router-link>
            </li>-->
            <li class="breadcrumb-item active" aria-current="page">True Wallet</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <UserData />

        <div class="card shadow border-0">
          <div class="card-header">ฝาก</div>
          <div class="card-body">
            <div>
              <h5>หมายเลขโทรศัพท์ True Wallet</h5>
              <div v-for="data in bank" v-bind:key="data.id"> 
                <div class="d-flex justify-content-start mb-4 mt-2"  v-if="data.status_system === '1'&& data.bank_name === 'truemoney'">
                  <div>
                    <div v-if="data.bank_name =='truemoney'">
                      <img src="assets/images/icons/Truewallet.png" width="40" />
                    </div>
                  </div>
                  <div class="ml-3">
                    <h6>ชื่อบัญชี: {{data.bank_account_name}}</h6>
                    <h6>เลขโทรศัพท์: {{data.bank_number}}  <i
                        @click="copy"
                        v-clipboard:copy="data.bank_number"
                        class="far fa-copy"
                      ></i></h6> 
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserData from "./../home/user-data";
import { baseURL } from '../../../../services/api';
export default {
  components: {
    UserData,
  },
  data() {
    return {
      bank: [],
    };
  },
  mounted() {
    axios({
      method: "get",
      url: baseURL+"/member/bank",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.bank = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods:{
    copy(){
      this.$toast.success("Copy หมายเลขโทรศัพท์สำเร็จ", {
      position: "top-right",
      timeout: 1500,
      });
    }
  }
};
</script>

<style>
</style>