<template>
  <div id="adDeposite">
    <!-- ฝากทศนิยม -->
    <div class="row  justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/depositlist">เลือกการฝาก</router-link>
            </li>
         
            <li class="breadcrumb-item active" aria-current="page">ทำรายการฝาก</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card shadow border-0">
          <div class="card-body border-0 rounded">
            <div class="card border-0">
              <div class="card-header bg-white text-center">
                <h5>กรอกรายละเอียดการโอนเงิน</h5>
              </div>
              <div class="card-body">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-12" >
                      <label>จำนวนเงิน </label><br>
                      <input
                        v-model="amount"
                        type="number"
                        class="form-control"
                        placeholder="กรุณากรอกจำนวนเงิน" required
                      />
                      <h6 class="text-danger mt-2 pl-2">ฝากขั้นต่ำ 1 บาท</h6>
               
                      
                    
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-md-12 text-center">
                      <button
                        @click.prevent="deposit"
                        class="btn btn-blue  btn-lg rounded-pill text-center text-white" style=" background: linear-gradient(0deg,#007bff 0%, rgb(0 121 255 / 62%) 100%);"
                      >
                        <i class="fas fa-check-circle"></i> ทำรายการ
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import  bankService  from './../../../../services/bankService';
export default {
    data() {
    return {
      amount : '',
    };
  },
    props: ['balance'],
    methods:{
    sentvalue(value){
        this.amount = value
    },
     async deposit(){
        try {

        
          let checkamount = parseInt(this.amount);

          if(checkamount > 0){
           
              const depositForm = {
                amount: checkamount
              }
            
                const resp = await bankService.regularDeposit(depositForm);
               

                sessionStorage.setItem("amountregular", resp.amount);
            
                 this.$router.push("/banktrue");
          }else{
              this.$toast.error("กรุณา กรอกจำนวน", {
              position: "top-center",
              timeout: 1500,
           });
          }

        
        
      } catch (error) {
        this.$toast.error("bad", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },

  }
};
</script>

<style >
</style>