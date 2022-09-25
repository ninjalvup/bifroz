<template>
  <div id="home">
    <!-- Afiliate -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol
            class="breadcrumb shadow"

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
    <div class="row justify-content-center">
      <div class="col-11 col-md-9">
        <div
          class="row p-2 rounded"
          style="background-color: rgb(27, 27, 27);"
        >
          <div class="col-12 text-center">รายได้ที่ถอนได้</div>
          <div class="col-12 text-center">
            {{ this.income }}
          </div>
        </div>

        <div class="row mt-1 rounded"
        style="background-color: rgb(27, 27, 27);"
        >
          <div class="col-12 p-0 mt-1">
            <div
              class="p-1 text-white mb-5 px-2"
            >
              <div class="text-center h3 m-0 text-golden my-1">
                วิธีการแชร์ต่อ
              </div>
              <span class="fontdetail">
                สร้างรายได้เข้ากระเป้าคุณได้ง่ายๆ เพียง ก็อป แล้ว โพสต์
                ยิ่งโพสต์มากยิ่งได้มาก สร้างรายได้หลักแสนบาทต่อเดือน
                ด้วยระบบแนะนำสมาชิก(AF) BIFROZ
                แค่ก็อปข้อความแล้วนำไปส่งต่อให้เพื่อน
                หรือนำไปโพสต์ในสื่อโซเซียลต่างๆ เช่น Facebook , Line , Instagram
                และสื่ออื่นๆอีกมากมายที่ท่านรู้จัก

                เมื่อลิ้งค์ที่ท่านโพสมีคนกดสมัครสมาชิกเข้ามา
                คนที่สมัครผ่านลิงค์ที่ท่านนำไปโพสต์
                จะเป็นลูกค้าของท่านโดยอัตโนมัติ
                ท่านจะได้รับส่วนแบ่งจากยอดเดิมพันทั้งหมดของสมาชิกที่ท่านแนะนำเข้ามา
                (โดยไม่มีเงื่อนไข) เพียงเท่านี้
                ท่านก็สามารถสร้างรายได้ให้กับตัวท่านเองได้อย่างง่ายๆและมั่นคง
                ตัวอย่างเช่น...
                ลูกค้าท่านเดิมพันคาสิโนออนไลน์ ท่านจะได้รับค่าคอมมิชชั่น 1%
                ลูกค้าท่าน 1 คน มียอด turn over 10,000 บาท ท่านจะได้ 100 บาท<br />
                สามารถทำรายได้เพิ่มเติมจากการชวนเพื่อนมาใช้บริการของเรา
                และรายได้ของท่านสามารถตรวจสอบได้ทุกขั้นตอน แจกจริง
                จ่ายเร็วเพียงก๊อปปี้ลิ้งค์ นำไปแชร์ได้เลย
                หมายเหตุ:
                รายได้การช่วยแชร์ช่วยแนะนำของท่านสามารถแจ้งถอนได้ทุกเวลา
                หากมียอดรายได้มากกว่า 100 บาทขึ้นไป
              </span>
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
import incomeervice from "@/services/incomeService";
import jQuery from "jquery";
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
      tel: "",
      first_name: "",
      last_name: "",
      member_credit: "",
      sb_username: "",
      sb_password: "",
      credit: "",
      income: "0.00",
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

    jQuery(document).ready(function () {
      jQuery(".crossRotate").click(function () {
        if (jQuery(this).css("transform") == "none") {
          jQuery(this).css("transform", "rotate(360deg)");
        } else {
          jQuery(this).css("transform", "");
        }
      });
    });
    axios({
      method: "get",
      url: baseURL + "/member/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        this.first_name = response.data.data.first_name;
        this.last_name = response.data.data.last_name;
        this.tel = response.data.data.tel;
        this.member_credit = response.data.data.member_credit;
        this.sb_username = response.data.data.sb_username;
        this.sb_password = response.data.data.sb_password;
        this.prefix = response.data.data.prefix;
        sessionStorage.setItem("sb_username", this.sb_username);
        sessionStorage.setItem("sb_password", this.sb_password);
        sessionStorage.setItem("prefixAfiliate", this.prefix);
        // this.loginGame();
      })
      .catch((error) => {
        console.log(error);
        this.$router.push("/login");
      });
    this.getCredit();
    this.getIncome();
  },
  methods: {
    copy() {
      this.$toast.success("คัดลอกลิ้งค์สำเร็จ", {
        position: "top-right",
        timeout: 1500,
      });
    },
    async getIncome() {
      const rs = await incomeervice.getIncome();
      this.income = rs.income;
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
  color: wheat;
  font-weight: 700 !important;
}

.fontdetail{
  font-size: 0.8em;
  line-height: 0.9em;
}

.rounded {
    border-radius: 1.25rem !important;
}
</style>