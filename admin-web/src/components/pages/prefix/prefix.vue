<template>
  <div id="prefix">
    <div class="page-inner">
      <div class="page-header">
        <br />
        <h4 class="page-title">
          <i class="fa fa-book" aria-hidden="true"></i> Prefix
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>

      <div class="col-md-12">
        <div class="col-md-12 row">
          <div class="col-md-8">
            <form>
              <div class="card">
                <div class="card-body">
                  <div class="column">
                    <div class="row">
                      <div class="card-body">
                        <h4>ชื่อคอมพานี</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          v-model="form.company"
                        />
                      </div>
                      <div class="card-body">
                        <h4>Product</h4>
                        <select
                          class="form-control text-"
                          v-model="form.product"
                        >
                          <option selected disabled value>
                            -เลือก Product-
                          </option>
                          <option value="1">Fastbet98</option>
                          <option value="2">AMBbet</option>
                          <option value="3">OMGbet888</option>
                          <option value="4">UKingbet</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="card-body">
                        <h4>เอเย่น ไอดี</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          v-model="form.agent_id"
                        />
                      </div>
                      <div class="card-body">
                        <h4>เว็บไซต์</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          v-model="form.url"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="card-body col-md-6 mr-3">
                        <h4>Line@</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          v-model="form.line"
                        />
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <h4>โลโก้</h4>
                          <h5 class="text-danger ml-2">
                            (PNG,JPEG 100x100 px)
                          </h5>
                        </div>
                        <input
                          type="file"
                          id="myfileImg"
                          name="myfileImg"
                          @change="uploadImg"
                        />
                        <img v-bind:src="form.logo" width="100" />
                      </div>
                      <!-- <div class="card-body">
                        <div class="row">
                          <h4>Bandner</h4>
                          <h5 class="text-danger ml-2">
                            (PNG,JPEG 783x120 px)
                          </h5>
                        </div>
                        <input
                          type="file"
                          id="myfilebanner"
                          name="myfilebanner"
                          @change="uploadImgbandner"
                        />
                      </div> -->
                    </div>
                    <div class="row">
                      <!-- <div class="card-body mr-5">
                        <div class="row">
                          <h4>ภาพพื้นหลัง</h4>
                          <h5 class="text-danger ml-2">
                            (PNG,JPEG 1920x1080 px)
                          </h5>
                        </div>
                        <input
                          type="file"
                          id="myfileImgbg"
                          name="myfileImgbg"
                          @change="uploadImgbg"
                        />
                      </div> -->
                    </div>
                    <div class="row">
                      <div class="card-body">
                        <h4>Token Line</h4>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="helpId"
                          v-model="form.token_line"
                        />
                      </div>
                      <div class="card-body">
                        <h4>Prefix Key</h4>
                        <input
                          type="text"
                          disabled
                          class="form-control"
                          aria-describedby="helpId"
                          v-model="form.prefix_key"
                        />
                      </div>
                    </div>
                    <button
                      @click.prevent="prefixupdate"
                      type="button"
                      class="btn btn-info mr-1 text-white float-right"
                    >
                      <i class="fa fa-check" aria-hidden="true"></i>
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="col-md-4">
            <div class="card">
              <!-- v-if="web_on_off ===0" -->
              <div class="card-body">
                <h4>
                  ปิด/เปิดเว็บไซต์
                  <div @click.prevent="getStatus">
                    <div>
                      <label class="switch">
                        <input
                          v-model="formCombine.web_on_off"
                          type="checkbox"
                        />

                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                </h4>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="formCombine.message_on_of_web"
                  ></textarea>
                </div>
              </div>
              <!-- <div class="card-body">
                <h4>ข้อความสมัครสมาชิก</h4>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    v-model="formCombine.message_member"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div> -->
              <!-- <div class="card-body">
                <h4>อนุญาติให้ถอนกรณีมีการเเทงคงค้าง</h4>
                <div @click.prevent="getOutstand">
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="formCombine.status_outstanding"
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div> -->
              <!-- <div class="card-body">
                <h4>
                  จำนวนเครดิตขั้นต่ำที่สามารถให้ลูกค้าทำการถอนได้
                  <span class="text-danger" style="font-size: 12px"
                    >* ถ้าตั้งเป็น 0 จะไม่มีขั้นต่ำ *</span
                  >
                </h4>
                <div>
                  <input
                    type="number"
                    v-model="formCombine.minimum_withdraw"
                    class="form-control"
                    aria-describedby="helpId"
                  />
                </div>
              </div> -->

              <!-- <div class="card-body">
                <h4>จำนวนเงินมากที่สุดที่จะไม่ทำการอณุมัติออโต้</h4>
                <input
                  type="number"
                  v-model="formCombine.credit_max"
                  class="form-control"
                  aria-describedby="helpId"
                />
              </div> -->
              <!-- <div class="card-body">
                <h4>อนุมัติรายการถอนเเบบออโต้</h4>
                <div @click.prevent="getAutoWithdraw">
                  <label class="switch">
                    <input type="checkbox" v-model="formCombine.status_auto" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div> -->

              <!-- <div class="card-body">
                <h4>จำกัดจำนวนครั้งต่อวัน</h4>
                <div @click.prevent="getAutoAmount">
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="formCombine.status_amount"
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div> -->
              <!-- <div class="card-body">
                <h4>ถอนได้กี่ครั้งต่อวัน</h4>
                <input
                  type="number"
                  v-model="formCombine.amount"
                  class="form-control"
                  aria-describedby="helpId"
                />
              </div> -->
              <div
                class="text-right mb-2 mt-2 mr-4"
                v-on:click.prevent="putCombine"
              >
                <button type="button" class="btn btn-info">
                  <i class="fa fa-check" aria-hidden="true"></i> ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import prefix from "../../../services/prefix";
import { baseURL } from "../../../services/api";
import axios from "axios";
const url = `${baseURL}/prefix`;
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      web_on: "1",
      web_off: "0",

      uuid: "",
      form: {
        company: "",
        product: "",
        agent_id: "",
        url: "",
        line: "",
        logo: "",
        bg: "",
        token_line: "",
        prefix_key: "",
        uuid: "",
        bandner:
          "data:image/jpeg;base64,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",
      },
      web_on_off: "",
      message_on_of_web: "",
      message_member: "",
      status_outstanding: "",
      status_auto: "",
      credit_min: "",
      credit_max: "",
      status_amount: "",
      amount: "",
      formCombine: [],
    };
  },
  mounted() {
    this.getAllData();
    this.getCombineData();
  },
  methods: {
    async checkAuth() {
      const res = await UserService.getProfile().catch(function(error) {
        if (error.response.status === 401 || error.response.status === 500) {
          const removeToken = localStorage.removeItem("access_token");
          if (removeToken == null) {
            this.$router.push("/login");
          }
        }
      });
      res.logout;
    },
    getAllData() {
      axios({
        method: "get",
        url: `${baseURL}/prefix`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          //  this.form=[];

          (this.form.uuid = response.data.data.prefix[0].uuid),
            (this.form.company = response.data.data.prefix[0].company),
            (this.form.product = response.data.data.prefix[0].product),
            (this.form.agent_id = response.data.data.prefix[0].agent_id);
          this.form.url = response.data.data.prefix[0].url;
          this.form.line = response.data.data.prefix[0].line;
          this.form.logo = response.data.data.prefix[0].logo;
          this.form.bg =
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMCAggICAgICAgFCAgIBQUICAgIBQYICAYICAYFBggICAgFBgYFCAgICAYHCAoICAcICQkJBwgLDQoIDQgICQgBAwQEAgICCQICCQgCAgIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICP/AABEIAPYCAAMBEQACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAgEDBAn/xAAtEAEAAgACCAYDAQEBAQAAAAAAAQIR8BIhMUFRcbHRA2GBkcHhBKHxIhMyBf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6pgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAm8g2IBoAAAJjbn17+4KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABM7f38dwUAAAACbQDYkGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmnHiCgAAAAATHXP37goAAAAAAAAHL8jxZiJwiJthOjEzhjO6JmInCJnDXhOAH4trTWs3itb6FdOK2m1a2wjSitprSbRE4xEzWszGvCNgOoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJvINiAaAAAAADLQDQAAAAAAATNs7oBFK6857avMHUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHl8W19OuEeHPh/874zpW04vjTRiKxWazXR08Z0sccMInXMB3i0+Xv9A3GfL3+gMZ8vf6AxnhHv9AYzw/YGl5fuANLyn9dwNLyn9dwUAAAAAACMceXXl3/oMn9R+54Z3+oKrAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABN+mvPoBNQItx/oKAAABOnw+s8gZaOOvpn3BYAAAAMmQThjt9u4NtO7MAyI/Wc84BYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJp01Z9AbMAnDDzznaCosDNPhr6e4Gjx+gaDK8fbl9goAAAE2sBFc8ALWBmzO2QbWAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACd/POeQKAB5vzfw4vo4z4kaHiVvGj4lq6WGP+baExpVnHXS2NZnDGNQO0Y+U59ugN0/TnnAGTr+ewLAAABM24fwG1qBMgysb8wBv5dc9YBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJv01goAAE14AWkGR4fDGM+wNxnny++4KBmIJ28uoKiAaCNvLrP0CrWBlYBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJp01dv0CgARed/Dpv7+gNrG/MAoAHm/K/wDoUpo6UzGn4laV/wA2nG0xaYj/ADExH/mdc4R5g7aPH2znqCwATbh75z0BsAzfy656goAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE7+ec8gUACNvKP3P1nYDacOHTcCgATbd69PsFAAm1gbWALSDKwCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATf7BoMtOeANiAZbj6AoAE7/Tr/AUDJkGVjPAFAnfy656goAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEVnD0zANrANmQTNo5+k/AMraeHvMfGIK1+WfboBXbPpHz8goERr1+3cFg8/5vj2rS00r/0vFLTWmnFdO0RMxWbTExXSnVpTE4cJB18LZHL9gsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHlv4F/+mlpRof8APDQ0Ix09LHT05ts0f86Gj547gd6xz98P1GANiseQKBM7f12zyBQJp8z2+AZOvV79gVMgnXPl1+s7AVEAmNvPM9/cFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyagnHDb798+wKiQJgGVkExOqOMxmQbE7oBsVz2BQAJvH0DayDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATNeH0BFuOoDfz6/zoDn4cY9vie3UHUGgAAAiNvPrn5BYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMmAcvFnCOOrHDfq16t+dwKiu7h06/wG6+fXt0BsWBQAAJtANrYGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmbAYTyBk13cdvLOoG24+mfXqCgZNQThPPrnOINi4KABO/n1z0BQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJm+c6gMJ/nf+A2IBoJpxzhnWDZgGUkFAAyYBOjP977eoNi/pn2BtoBlbAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE6fDWBo8c/INiAaACb9QaDJvnuDzx+Jh4k30/E/14dK6Gl/iujN7aUVw/8AVtLC1sdcVrGEYA9Gj5z+uwGE8Y9vsDGfL3ntIGlPD9x84AybeU+3bEE6XDH1if6Dj+R/9ClMJvalItelIm1oiJve0UpWJmcMbWmKxG2Zw1A9YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPN+L+fTxNKaWrbR8TxKWmJ1VvS01tWfOsxMT5g76PH6BoNAAABNePp3z5AoGRAFoArINAAAABytGOHDHGPTXj74YZwDqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACbcffOegNiQaAAACbyDYgGgAAmNvPX3zzBQAAAI28uuc7wbG39fPYFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjZy6f0FgAAAiNvLOfUFgm1vcFAAm8foGxINABNp3e/l9g2IBlOusFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyYBlZ3e2c9QUADLSBWAZNuH8Btag0AAE14ZwBQJtINrAMvs56gUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADLQDKyCgTv5Zz6ATbdH8+wbWoNBGOHLj375kLABN+OcM6/QG2sDKwCgTO39/HcFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAm1fcDTBNf7PAFxANABkwCdnLp9AsGWkEeFHHbsz8g6AAmu/n0+8QUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyfkRebU0f+ehp2/6Y6WlMRS010MP86UXiuOlq0cd+GAeqIBoAMtYGgAjZy6fXToCNevdu75/gJ2/rtnzBYMtIFYBoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIxx5deXcGzGzn8SCgAAc9Lf7d87uYOgAInXy65zvAww5dOXYFTGIMrIF93PprBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPN+b4FraOF7U0fEra2FaT/ANKxjjSdOtsInHGZrhbVqmMZB6QTbbHqCgARefvt653A2sZ4AUn9agLTu9/L7BsQDQRMYfMds/YInXz6/wA6A3fyjPwCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTpnoBO2PX4BQJtYE0jfmfPt5A6A8X5H5sUv4dNePizetdUYRNaWvOlricMInDDHdGraD2VgGgAA5eLGGv1znWDPxPGi1YtGOFqxaMduExExjhjGOGAOwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJnbzjPyBO2OU/AKBy2znjMfvDp5g6gA//Z";
          this.form.token_line = response.data.data.prefix[0].token_line;
          this.form.prefix_key = response.data.data.prefix[0].prefix_key;
        })
        .catch((error) => {
          console.log(error);
        });
      axios({
        method: "get",
        url: `${baseURL}/combine/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          // this.statusForm.uuid = response.data.data.uuid;
          this.aaaa = response.data.data.uuid;
          this.message_member = response.data.data.message_member;
          this.message_on_of_web = response.data.data.message_on_of_web;
          this.credit_max = response.data.data.credit_max;
          this.credit_min = response.data.data.credit_min;
          this.amount = response.data.data.amount;
          this.status_amount = response.data.data.status_amount;
          this.status_outstanding = response.data.data.status_outstanding;
          this.web_on_off = response.data.data.web_on_off;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getCombineData() {
      const res = await prefix.getCombine();
      console.log(res.data.data);
      this.formCombine = res.data.data;
      // console.log(this.formCombine);
      this.formCombine.uuid = res.data.data.uuid;
    },
    async putCombine() {
      const res = await prefix.putSetting(
        this.formCombine.uuid,
        this.formCombine
      );
      console.log(res);
      this.$toast.success("เรียบร้อยแล้ว", {
        position: "top-right",
        timeout: 1500,
        icon: true,
        rtl: false,
      });
    },
    async getStatus() {
      if (this.formCombine.web_on_off == 0) {
        this.formCombine.web_on_off = 1;
      } else {
        this.formCombine.web_on_off = 0;
      }
      const res = await prefix.putSetting(
        this.formCombine.uuid,
        this.formCombine
      );
      res.status;
    },
    async getOutstand() {
      if (this.formCombine.status_outstanding == 0) {
        this.formCombine.status_outstanding = 1;
      } else {
        this.formCombine.status_outstanding = 0;
      }
      const res = await prefix.putSetting(
        this.formCombine.uuid,
        this.formCombine
      );
      res.status;
    },
    async getAutoWithdraw() {
      if (this.formCombine.status_auto == 0) {
        this.formCombine.status_auto = 1;
      } else {
        this.formCombine.status_auto = 0;
      }
      const res = await prefix.putSetting(
        this.formCombine.uuid,
        this.formCombine
      );
      res.status;
    },
    async getAutoAmount() {
      if (this.formCombine.status_amount == 0) {
        this.formCombine.status_amount = 1;
      } else {
        this.formCombine.status_amount = 0;
      }
      const res = await prefix.putSetting(
        this.formCombine.uuid,
        this.formCombine
      );
      res.status;
    },
    // async offwebUpdate() {
    //   try {
    //     if (this.web_on_off == 0) {
    //       this.web_on_off = 1;
    //     } else {
    //       this.web_on_off = 0;
    //     }
    //     const web_on_offForm = {
    //       web_on_off: this.web_on_off,
    //       message_on_of_web: this.message_on_of_web,
    //       message_member: this.message_member,
    //     };
    //     const resp = await prefix.OffWebsite(
    //       this.aaaa,
    //       web_on_offForm
    //     );
    //     console.log(resp);
    //     if (this.web_on_off == 1) {
    //       this.$toast.success("เปิดเว็บไซตื", {
    //         position: "top-right",
    //         timeout: 1500,
    //       });
    //     }
    //     if (this.web_on_off == 0) {
    //       this.$toast.error("ปิดเว็บไซต์", {
    //         position: "top-right",
    //         timeout: 1500,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async statusAuto() {
    //   try {
    //     if (this.status_auto == 0) {
    //       this.status_auto = 1;
    //     } else {
    //       this.status_auto = 0;
    //     }
    //     const status_autoForm = {
    //       status_auto: this.status_auto,
    //       credit_min: this.credit_min,
    //       credit_max: this.credit_max,
    //     };
    //     const resp = await prefix.statusAuto(
    //       this.statusForm.uuid,
    //       status_autoForm
    //     );
    //     console.log(resp);
    //     if (this.status_auto == 1) {
    //       this.$toast.success("เปิด! อนุมัติรายการถอนเเบบออโต้", {
    //         position: "top-right",
    //         timeout: 1500,
    //       });
    //     }
    //     if (this.status_auto == 0) {
    //       this.$toast.error("ปิด! อนุมัติรายการถอนเเบบออโต้", {
    //         position: "top-right",
    //         timeout: 1500,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async statusAmount() {
    //   try {
    //     if (this.status_amount == 0) {
    //       this.status_amount = 1;
    //     } else {
    //       this.status_amount = 0;
    //     }
    //     const status_amountForm = {
    //       status_amount: this.status_amount,
    //       amount: this.amount,
    //     };
    //     const resp = await prefix.statusAuto(
    //       this.statusForm.uuid,
    //       status_amountForm
    //     );
    //     console.log(resp);
    //     if (this.status_amount == 1) {
    //       this.$toast.success("เปิด! จำกัดจำนวนครั้ง", {
    //         position: "top-right",
    //         timeout: 1500,
    //       });
    //     }
    //     if (this.status_amount == 0) {
    //       this.$toast.error("ปิด! จำกัดจำนวนครั้ง", {
    //         position: "top-right",
    //         timeout: 1500,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async outStanding() {
    //   try {
    //     if (this.status_outstanding == 0) {
    //       this.status_outstanding = 1;
    //     } else {
    //       this.status_outstanding = 0;
    //     }
    //     const status_outstandingForm = {
    //       status_outstanding: this.status_outstanding,
    //     };
    //     const resp = await prefix.outStanding(
    //       this.statusForm.uuid,
    //       status_outstandingForm
    //     );
    //     console.log(resp.form);
    //     if (this.status_outstanding == 1) {
    //       this.$toast.success("อนุญาติการถอนเเบบคงค้าง", {
    //         position: "top-right",
    //         timeout: 1500,
    //       });
    //     }
    //     if (this.status_outstanding == 0) {
    //       this.$toast.error("ไม่อนุญาติการถอนเเบบคงค้าง", {
    //         position: "top-right",
    //         timeout: 1500,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },}
    uploadImg(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        this.form.logo = reader.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImgbg(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        this.form.bg = reader.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImgbandner(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        this.form.bandner = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async prefixupdate() {
      const uuid = this.form.uuid;
      axios
        .put(
          url + "/" + uuid,
          this.form
          // ,{
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: "Bearer " + localStorage.getItem("access_token"),
          //     isLoading: false,
          //   },
          // }
        )
        .then(() => {
          this.$toast.success("เรียบร้อยแล้ว", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });

          this.form.bandner = "";
          this.form.bg = "";
          this.form.logo = "";
          this.getAllData();

          //Perform Success Action
        })
        .catch((error) => {
          error;
          console.log(error);
          this.$toast.error("ไม่ถูกต้อง", {
            position: "top-right",
            timeout: 1500,
            icon: true,
            rtl: false,
          });
        })
        .finally(() => {});
    },
  },
};
</script>
