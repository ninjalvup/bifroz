<template>
  <div>
    <!-- -เปลี่ยนรหัส -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/profile">โปรไฟล์</router-link>
            </li>
            <li class="breadcrumb-item " aria-current="page">เปลี่ยนรหัสผ่าน</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row mt-2 justify-content-center mb-5">
      <div class="col-md-9">
        <div class="card border-0">
          <div class="card-body border-0" style="background-color: #2a2a2a">
            <div class="card border-0 mt-4" style="background-color: #2a2a2a">
              <div class="pr-5 pl-5">
                <h5 class="text-center">เปลี่ยนรหัสผ่าน</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>รหัสผ่านเดิม</label>
                    <input
                      v-model="passwordold"
                      type="password"
                      class="form-control"
                      placeholder="กรุณากรอกรหัสผ่านเดิม"
                      autocomplete="off"
                      style="background-color: rgb(27, 27, 27);"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>รหัสผ่านใหม่</label>
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      placeholder="กรุณากรอกรหัสผ่านใหม่"
                      autocomplete="off"
                      style="background-color: rgb(27, 27, 27);"
                    />
                    <br>

                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-center mt-1">
                <span 
                      @click.prevent="passwordchang"
                      value="passwordchang"
                      type="password"
                      class="
                        rounded-pill
                        text-center
                      "
                      style="
                        background: linear-gradient(
                          0deg,
                          #007bff 0%,
                          rgb(0 121 255 / 62%) 100%
                        );
                      "
                      :disabled="!passwordold"
                    >
                  <img class="img-fluid px-3" src="assets/images/custom/buntuk.png" />
                </span>
              </div>

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
import authService from "@/services/authService.js";
export default {
  data() {
    return {
      password: "",
      passwordold: "",
    };
  },
  methods: {
    //post เปลี่ยนรหัส
    async passwordchang() {
      try {
        const passwordForm = {
          password: this.password,
          passwordold: this.passwordold,
        };
        const resp = await authService.changPassword(passwordForm);
        if (resp.message === "update password success") {
          this.$toast.success("เเก้ไขรหัสผ่านเรียบร้อย", {
            position: "top-right",
            timeout: 1500,
          });
          this.$router.push("/home");
        } else {
          console.log(" ");
        }
      } catch (error) {
        this.$toast.error(error.response.data.error.message, {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
  },
};
</script>

<style scoped>


* {
  color: wheat !important;
  font-weight: 300 !important;
}
</style>