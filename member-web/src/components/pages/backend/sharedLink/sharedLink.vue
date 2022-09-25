<template>
  <div id="home">
    
    <!-- Afiliate -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol
            class="breadcrumb"
          >
            <li class="breadcrumb-item">

              <router-link class="" to="/home">หนัาหลัก</router-link>
            </li>
            <!-- <li class="breadcrumb-item" aria-current="page">
              <router-link to="/deposit">ฝากเงิน</router-link>
            </li>-->
            <li class="breadcrumb-item" aria-current="page">เเชร์</li>
          </ol>
        </nav>
      </div>
    </div>
    <sharetap />
    <div class="row justify-content-center"
    >
      <div class="col-11 col-md-9 rounded text-boder"
      style="background-color: rgb(27, 27, 27);"
      >
        <div
          class="row"

        >
          <!-- QR-CODE -->

          <div class="col-4 p-1 py-3 d-flex align-items-center">
            <div class="col-12 text-center">
              <img class="img-fluid" v-bind:src="linkqr" alt="" title="" />
            </div>
          </div>

          <!-- Link -->
          <div class="col-8 p-1 py-3">
            <div class="text-center">
              <div class="p-3 t-w">ลิงค์รับทรัพย์</div>
              <div class="input-group">
                <input
                  type="shared"
                  id="shared"
                  class="form-control"
                  placeholder=""
                  autocomplete="off"
                  v-model="link"
                  disabled
                />

                <!-- <div class="input-group-append">
                  <button
                    class="btn btn-blue"
                    type="button"
                    @click="copy"
                    v-clipboard:copy="link"
                  >
                    คัดลอก
                  </button>
                </div> -->
              </div>
              <div class="py-2 d-flex justify-content-around">
                <div class="d-inline p-1">
                  <a :href="linelink3" target="_blank">
                    <img
                      src="assets/images/custom/shar.png"
                      alt="line_share_button"
                      class="img-fluid"
                    />
                  </a>
                </div>

                <div class="d-inline p-1">
                  <a
                  :href="facebook3"
                    target="_blank"
                    class=""
                  >
                    <img
                      src="assets/images/custom/fa.png"
                      alt="face_share_button"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="d-inline p-1">
                  <a @click="copy" v-clipboard:copy="link">
                    <img
                      src="assets/images/custom/copyp.png"
                      alt="copy_share_button"
                      class="img-fluid"
                    />
                  </a>
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
import sharetap from "./sharetap";

export default {
  components: {
    sharetap,
  },
  name: "home",
  data() {
    return {
      link: "",
      line: "",
      facebook: "",
      linkqr: "",
      unqr: "",
    };
  },
  mounted() {
    const host_url = window.location.origin;
    const qr1 = "https://api.qrserver.com/v1/create-qr-code/?data=";
    const qr2 = "&amp;size=100x100";
    const lineapp = "https://social-plugins.line.me/lineit/share?url=";
    const facebookapp = "https://www.facebook.com/sharer/sharer.php?u=";

    this.linelink1 = 
      host_url +
      "/#/register?prefix=" +
      sessionStorage.getItem("prefixAfiliate");

    this.linelink2 = this.linelink1;

    this.linelink3 = lineapp + this.linelink2;


    this.facebook1 = 
      host_url +
      "/#/register?prefix=" +
      sessionStorage.getItem("prefixAfiliate");

    this.facebook2 = this.facebook1;

    this.facebook3 = facebookapp + this.facebook2;



    this.link = 
      host_url +
      "/#/register?prefix=" +
      sessionStorage.getItem("prefixAfiliate");

    this.unqr = encodeURIComponent(this.link);

    this.linkqr = qr1 + this.unqr + qr2;

    console.log(this.linkqr);
  },
  methods: {
    copy() {
      this.$toast.success("คัดลอกลิ้งค์สำเร็จ", {
        position: "top-right",
        timeout: 1500,
      });
    },
  },
};
</script>
<style scoped>
.x100 {
  width: 150px;
  height: 150px;
}
* {
  color: #000;
  font-weight: 700 !important;
}
.rounded {
    border-radius: 1.25rem !important;
}

.text-boder{
  border: 2.5px solid wheat !important;
}

.t-w{
  color: wheat;
}
</style>