 <template>
  <div id="app">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-plus-circle" aria-hidden="true"></i> เพิ่มโปรโมชัน
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="col-md-12">
        <div class="col-md-12 row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body container">
                <form v-on:submit.prevent="addpromotion">
                  <div class="row">
                    <div class="card-body col-md-6 mr-1">
                      <h4>ชื่อโปรโมชัน</h4>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="ชื่อโปรโมชัน"
                        v-model="promotion_name"
                        required
                      />
                    </div>
                    <div class="card-body">
                      <h4>ประเภทโปรโมชัน</h4>
                      <select
                        class="form-control text-"
                        v-model="promotion_type_id"
                        required
                      >
                        <option selected disabled value>
                          -เลือก ประเภทโปรโมชัน-
                        </option>
                        <option value="1">สมัครสมาชิกใหม่</option>
                        <option value="2">ฝากครั้งเเรกของวัน</option>
                        <option value="3">ฝากทั้งวัน</option>
                      </select>
                    </div>
                    <!-- <div class="card-body">
                      <div class="row">
                        <h4>รูปโปรโมชัน</h4>
                      </div>
                      <input
                        type="file"
                        id="myfile"
                        name="myfile"
                        @change="uploadImg"
                        required
                      />
                    </div> -->
                  </div>
                  <div class="row">
                    
                    <div class="card-body">
                      <h4>ประเภทโบนัส  </h4>
                      <select
                        class="form-control text-"
                        v-model="bonus_type_id"
                        required
                      >
                        <option selected disabled value>เลือกประเภทโบนัส</option>
                        <option value="1">ค่าคงที่</option>
                        <option value="2">เปอร์เซ็นต์</option>
                      </select>
                    </div>
                      <div class="card-body col-md-6">
                      <h4>Turn Over เกมทั้งหมด</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Turn Over"
                        v-model="turn_over"
                        required
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="card-body col-md-6">
                      <h4>ฝากต่ำสุด</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="ฝากต่ำสุด"
                        v-model="min_deposit"
                        required
                      />
                    </div>
                    <div class="card-body">
                      <h4>ฝากสูงสุด</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="ฝากสูงสุด"
                        v-model="max_deposit"
                        required
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="card-body col-md-6 mr-1">
                      <h4>โบนัสสูงสุด</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="โบนัสสูงสุด"
                        v-model="max_bonus"
                        required
                      />
                    </div>
                     <div class="card-body">
                      <h4>ถอนสูงสุด <span class="text-danger">*(เท่า)</span> </h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="ถอนสูงสุด"
                        v-model="max_withdraw"
                        required
                      />
                      <small class="text-danger">คิดจากยอดฝากเช่น ถอนสูงสุด 5 เท่า ยอดฝาก 100 ถอนได้สูงสุด 500</small>
                    </div>
                    <!-- <div class="card-body" hidden>
                      <h4>turn_over_slot</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="turn_over_slot"
                        v-model="turn_over_slot"
                        
                      />
                    </div> -->
                  </div>
                  <div class="row">
                   
                    <!-- <div class="card-body">
                      <h4>turn_over_hdp</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="turn_over_hdp"
                        v-model="turn_over_hdp"
                        required
                      />
                    </div> -->
                  </div>
                  <!-- <div class="row">
                    <div class="card-body">
                      <h4>turn_over_mix_replay</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="turn_over_mix_replay"
                        v-model="turn_over_mix_replay"
                        required
                      />
                    </div>
                    <div class="card-body">
                      <h4>turn_over_mix_step</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="turn_over_mix_step"
                        v-model="turn_over_mix_step"
                        required
                      />
                    </div>
                  </div> -->
                  <!-- <div class="row">
                    <div class="card-body">
                      <h4>turn_over_bacara</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="turn_over_bacara"
                        v-model="turn_over_bacara"
                        required
                      />
                    </div>
                    <div class="card-body">
                      <h4>turn_over_thai_lotterry</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="turn_over_thai_lotterry"
                        v-model="turn_over_thai_lotterry"
                        required
                      />
                    </div>
                  </div> -->
                  <!-- <div class="row">
                    <div class="card-body ml-4">
                      <h4>turn_over_thai_m2</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="turn_over_thai_m2"
                        v-model="turn_over_thai_m2"
                        required
                      />
                    </div>
                    <div class="card-body">
                      <h4>turn_over_thai_multiplayer</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="turn_over_thai_multiplayer"
                        v-model="turn_over_thai_multiplayer"
                        required
                      />
                    </div>
                  </div> -->
                  <div class="row">
                    <!-- <div class="card-body">
                      <h4>Turn Win</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Turn Win"
                        v-model="turn_win"
                        required
                      />
                    </div> -->
                  
                  </div>
                  <div class="row">
                    <div class="card-body col-md-6 mr-1">
                      <h4>สถานะ</h4>
                      <select class="form-control" v-model="status" required>
                        <option selected disabled value>เลือกสถานะ</option>
                        <option value="1">เปิดใช้งาน</option>
                        <option value="0">ปิดใช้งาน</option>
                      </select>
                      <!-- <small class="text-danger">เช่น "เปิดใช้งาน"</small> -->

                    </div>
                   
                  </div>
                  <h4 class="card-title">เพิ่มเงื่อนไข Promotion</h4>
                  <hr />
                  <div class="row">
                    <div class="card-body">
                      <h4>ฝากต่ำสุด</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="เช่น 10"
                        v-model="promotion_condition.min"
                        required
                      />
                      <!-- <small >เช่น "100"</small> -->
                    </div>
                    <div class="card-body">
                      <h4>ฝากสูงสุด</h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="เช่น 100"
                        v-model="promotion_condition.max"
                        required
                      />
                      <!-- <small>เช่น "200"</small> -->

                    </div>
                  </div>
                  <div class="row ">
                    <div class="card-body">
                      <h4>โบนัส <span></span></h4>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="เช่น 20"
                        v-model="promotion_condition.bonus"
                        required
                      />

                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-info mr-1 text-white float-right"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i>
                    ยืนยัน
                  </button>
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
import promotionService from "@/services/promotionService.js";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      promotion_name: "",
      promotion_image: "",
      promotion_type_id: "",
      bonus_type_id: "",
      min_deposit: "",
      max_deposit: "",
      max_bonus: "",
      turn_over_slot: "",
      max_withdraw: "",
      turn_over_hdp: "",
      turn_over_mix_replay: "",
      turn_over_mix_step: "",
      turn_over_bacara: "",
      turn_over_thai_lotterry: "",
      turn_over_thai_m2: "",
      turn_over_thai_multiplayer: "",
      turn_type: "2",
      turn_over: "",
      turn_win: "",

      status: "",
      promotion_condition: {
        min: " ",
        max: " ",
        bonus: " ",
      },
    };
  },
  mounted(){
this.checkAuth();

  },
  methods: {
    async checkAuth() {
      const res = await UserService.getProfile().catch(function (error) {
        if (error.response.status === 401 || error.response.status === 500) {
          const removeToken = localStorage.removeItem("access_token");
          if (removeToken == null) {
            this.$router.push("/login");
          }
        }
      });
      res.logout;
    },
    uploadImg(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        this.promotion_image = "reader.result";
      };
      reader.readAsDataURL(file);
    },
    async addpromotion() {
      try {
        const promotionForm = {
          promotion_name: this.promotion_name,
 promotion_image:
          "data:image/jpeg;base64,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",
                 promotion_type_id: this.promotion_type_id,
          bonus_type_id: this.bonus_type_id,
          min_deposit: this.min_deposit,
          max_deposit: this.max_deposit,
          max_bonus: this.max_bonus,
          max_withdraw: this.max_withdraw,
          turn_over_slot: "1",
          turn_over_hdp: "1",
          turn_over_mix_replay: "1",
          turn_over_mix_step: "1",
          turn_over_bacara: "1",
          turn_over_thai_lotterry: "1",
          turn_over_thai_m2: "1",
          turn_over_thai_multiplayer: "1",
          // turn_win: this.turn_win,
          turn_over: this.turn_over,
          turn_type: this.turn_type,

          status: this.status,
          promotion_condition: {
            min: this.promotion_condition.min,
            max: this.promotion_condition.max,
            bonus: this.promotion_condition.bonus,
          },
        };
        const resp = await promotionService.createPromotion(promotionForm);
        console.log(resp.data.k9);
        this.$toast.success("เพิ่มโปรโมชันสำเร็จ!", {
          position: "top-right",
          timeout: 1500,
          icon: true,
          rtl: false,
        });
        this.$router.push("/promotion");
      } catch (error) {
        this.$toast.error("เกิดข้อผิดพลาด", {
          position: "top-right",
          timeout: 1500,
          icon: true,
          rtl: false,
        });
        // this.msg = error.resp.data.msg;
      }
    },
  },
};
</script>

<style>
</style>