<template>
  <div>
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/profile">บัญชี</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">เปลี่ยนรหัสผ่าน</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row mt-2 justify-content-center">
      <div class="col-md-9">
        <div class="card">
          <div class="card-body rounded">
            <div class="row">
              <div class="col-md-12">
                <router-link to="/profile" class="btn btn-blue btn-sm rounded-pill">
                  <i class="fas fa-arrow-left"></i> กลับ
                </router-link>
              </div>
            </div>
            <div class="card mt-4">
              <div class="card-header">
                <h5>จัดการโปรไฟล์</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>ชื่อ</label>
                    <input
                      v-model="first_name"
                      type="text"
                      class="form-control"
                      placeholder="กรุณากรอกชื่อ"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>นามสกุล</label>
                    <input
                      v-model="last_name"
                      type="text"
                      class="form-control"
                      placeholder="กรุณากรอกนามสกุล"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>หมายเลขโทรศัพท์</label>
                    <input
                      v-model="tel"
                      type="text"
                      class="form-control"
                      placeholder="กรุณากรอกหมายเลขโทรศัพท์"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12 text-center">
                    <button
                     @click="profileEdite"
                      value="profileEdite"
                      type="password"
                      class="btn btn-blue btn-sm btn-block rounded-pill text-center"
                    >
                      <i class="fas fa-check-circle"></i> ยืนยัน
                    </button>
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
import axios from "axios";
import { baseURL } from "./../../../../services/api";
import profileService from "./../../../../services/profile";
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      tel: "",
    };
  },
  methods: {
    async profileEdite() {
      try {
        const profileForm = {
          first_name: this.first_name,
          last_name: this.last_name,
          tel: this.tel,
        };
        const resp = await profileService.profileEdit(profileForm);
        if (resp.message === "update data success") {
          console.log(" ");
          this.$router.push("/home");
           this.$toast.success("เเก้ไขโปรไฟล์เรียบร้อย", {
            position: "top-right",
            timeout: 1500,
          });
        } else {
          console.log(resp);
        }
      } catch (error) {
         this.$toast.error("เเก้ไขโปรไฟล์ไม่สำเร็จ", {
          position: "top-right",
          timeout: 1500,
        });
      }
    },
    
  },
  mounted() {
    //GetProfile
    axios({
      method: "get",
      url: baseURL+"/member/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.first_name = response.data.data.first_name;
        this.last_name = response.data.data.last_name;
        this.tel = response.data.data.tel;
        this.bonus = response.data.data.bonus;
        if (response.status === 200) {
          console.log(sessionStorage.access_token);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>