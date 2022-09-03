<template>
  <div id="casino">
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <UserData />
      </div>
    </div>

    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card mt-4 shadow">
          <div class="card-header text-white" style="background-color: #00a4e4">
            <i class="fab fa-bitcoin"></i>
            สล็อต
          </div>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">สล็อต</li>
          </ol>
          <div class="card-body">
            <div class="row justify-content-start">
              <div class="col-6 col-md-3">
                <div>
                  <div>
                    <img
                      @click="routerSlotXO"
                      class="casinolist mt-2"
                      src="https://wow668.com/image/xo.gif"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div>
                  <img
                    @click="routerspadeGaming"
                    class="casinolist mt-2"
                    src="https://wow668.com/image/sp.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div>
                  <img
                    @click="routerAskmebet"
                    class="casinolist mt-2"
                    src="https://wow668.com/image/amb.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div>
                  <img
                    @click="routerAmeba"
                    class="casinolist mt-2"
                    src="https://wow668.com/image/ab.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div>
                  <img
                    @click="routerGamatron"
                    class="casinolist mt-2"
                    src="https://wow668.com/image/gmt.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div>
                  <img
                    @click="routerPgSlot"
                    class="casinolist mt-2"
                    src="https://wow668.com/image/pg.gif"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div>
                  <img
                    @click="routerLive22"
                    class="casinolist mt-2"
                    src="https://wow668.com/image/22.gif"
                    alt=""
                  />
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
import UserData from "./../../home/user-data";
import gameService from "./../../../../../services/game";
export default {
  components: {
    UserData,
  },
  data() {
    return {
      ambPoker: "",
    };
  },
  mounted() {
    this.getGameall();
  },
  methods: {
    routerSlotXO() {
      this.$router.push("/slotxo");
    },
    routerspadeGaming() {
      this.$router.push("/spadeGaming");
    },
    routerAskmebet() {
      this.$router.push("/askmebet");
    },
    routerAmeba() {
      this.$router.push("/ameba");
    },
    routerGamatron() {
      this.$router.push("/gamatron");
    },
    routerPgSlot() {
      this.$router.push("/pgSlot");
    },
    routerLive22() {
      this.$router.push("/live22");
    },
    async getGameall() {
      const resp = await gameService.getGameAll();
      this.ambPoker = resp.data;
      console.log(this.ambPoker);
    },
  },
};
</script>
