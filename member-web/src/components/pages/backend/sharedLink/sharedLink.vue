<template>
  <div id="home">
    <!-- Afiliate -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link class="" to="/home">หนัาหลัก</router-link>
            </li>
            <!-- <li class="breadcrumb-item" aria-current="page">
              <router-link to="/deposit">ฝากเงิน</router-link>
            </li>-->
            <li class="breadcrumb-item active " aria-current="page">เเชร์</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row  justify-content-center">
      <div class="col-md-9">
        <div class="card shadow border-0 mt-4">
          <div class="card-body">
            แชร์ลิงก์ให้เพื่อน รับโบนัสพอยต์ฟรี
            <hr />
            <br />
            <div class="col-md-12">
              <label for="formGroupExampleInput">คัดลอกของคุณ</label>
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
                <div class="input-group-append">
                  <button
                    class="btn btn-blue"
                    type="button"
                    @click="copy"
                    v-clipboard:copy="link"
                  >
                    คัดลอก
                  </button>
                </div>
              </div>
              <hr class="mt-3" />
              <br />
              <!-- <label for="formGroupExampleInput">แชร์ลิงก์ของคุณ</label><br /> -->
              <div class="row mt-2">
              <!-- <div class="col-6">
                  <button
                  class="btn btn-success w-100 rounded-pill text-white mt-2"
                >
                  LINE
                </button>
              </div> -->
                <!-- <div class="col-6">
                  <button
                  class="btn btn-primary w-100 rounded-pill text-white mt-2"
                >
                  FACEBOOK
                </button>
              </div> -->
               
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      link: "",
    };
  },
  mounted() {
    const host_url = window.location.origin
    this.link = host_url+'/#/register?prefix=' + sessionStorage.getItem('prefixAfiliate');
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