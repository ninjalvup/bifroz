<template>
 <div id="testonPro">
 <div class="card">
    <div class="owl-carousel">
            <div class="item">
              <h2>Swipe</h2>
            </div>
            <div class="item">
              <h2>Drag</h2>
            </div>
            <div class="item">
              <h2>Responsive</h2>
            </div>
            <div class="item">
              <h2>CSS3</h2>
            </div>
            <div class="item">
              <h2>Fast</h2>
            </div>
            <div class="item">
              <h2>Easy</h2>
            </div>
            <div class="item">
              <h2>Free</h2>
            </div>
            <div class="item">
              <h2>Upgradable</h2>
            </div>
            <div class="item">
              <h2>Tons of options</h2>
            </div>
            <div class="item">
              <h2>Infinity</h2>
            </div>
            <div class="item">
              <h2>Auto Width</h2>
            </div>
          </div>
 </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      memberbet:'',
      agentper:'',
      masterper:'',
      seniorper:'',
      partnerper:'',
      companyper:'',

showBet:'',
agentincome:'',
BalanceAgent:'',
    }
  },
  methods:{
getBet(){
this.showBet = this.memberbet
this.agentincome = this.memberbet* (this.agentper / 100)
this.BalanceAgent = this.memberbet- this.agentincome
console.log(this.agentincome);


// this.masterincome =th
},
calPer(){

}
  },
  mounted() {
    this.getBet();
  },
};
</script>

<style></style>
