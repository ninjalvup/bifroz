<template>
  <div id="app">
    <footer>
      <!-- Sidebar -->
      <div class="sidebar sidebar-style-2">
        <div class="sidebar-wrapper">
          <div class="sidebar-content">
            <ul class="nav nav-primary">
              <li class="nav-item">
                <router-link
                  :active="isActive"
                  to="home"
                  data-toggle="collapse"
                >
                  <i class="fas fa-home"></i>
                  <p>หน้าหลัก</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="withdraw" data-toggle="collapse">
                  <i class="fas fa-coins"></i>
                  <p>หน้าถอนเงิน</p>
                </router-link>
              </li>
              <li class="nav-item">
                <a
                  data-toggle="collapse"
                  href="#user"
                  class="collapsed"
                  aria-expanded="false"
                >
                  <i class="fa fa-users" aria-hidden="true"></i>
                  <p>ลูกค้า</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="user">
                  <ul class="nav nav-collapse">
                    <li>
                      <router-link to="/user" class="nav-item">
                        <span class="sub-item"></span>
                        <p>ข้อมูลลูกค้า</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/adduser" class="nav-item">
                        <span class="sub-item"></span>
                        <p>สมัครสมาชิกลูกค้า</p>
                      </router-link>
                    </li>
                    <!-- <li>
                      <router-link to="/firstDeposit" class="nav-item">
                        <span class="sub-item"></span>
                        <p>สมาชิกใหม่/ฝากแรก</p>
                      </router-link>
                    </li> -->
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <router-link to="/prefix" data-toggle="collapse">
                  <i class="fas fa-book"></i>
                  <p>Prefix</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/errorlist" data-toggle="collapse">
                  <i class="fas fa-exclamation-triangle"></i>
                  <p>แก้ไขข้อผิดพลาด</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/bankaccount" data-toggle="collapse">
                  <i class="fa fa-university" aria-hidden="true"></i>
                  <p>บัญชีธนาคาร</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/promotion"
                  data-toggle="collapse"
                  class="collapsed nav-link"
                  aria-expanded="false"
                >
                  <i class="fa fa-bullhorn" aria-hidden="true"></i>
                  <p>โปรโมชัน</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/profile"
                  data-toggle="collapse"
                  class="collapsed nav-link"
                  aria-expanded="false"
                >
                  <i class="fas fa-user-astronaut"></i>
                  <p>ข้อมูลส่วนตัว</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  data-toggle="collapse"
                  to="/withdrawpending"
                  class="collapsed"
                  aria-expanded="false"
                >
                  <i class="fa fa-tasks" aria-hidden="true"></i>
                  <p>จัดการข้อมูลการถอน</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  data-toggle="collapse"
                  to="/checkmember"
                  class="collapsed"
                  aria-expanded="false"
                >
                  <i class="fas fa-book-reader"></i>
                  <p>เช็คข้อมูลลูกค้า</p>
                </router-link>
              </li>

              <li class="nav-item">
                <a
                  data-toggle="collapse"
                  href="#report"
                  class="collapsed"
                  aria-expanded="false"
                >
                  <i class="fas fa-paper-plane"></i>
                  <p>รายงาน</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="report">
                  <ul class="nav nav-collapse">
                    <li>
                      <router-link to="/reportdeposit" class="nav-item">
                        <span class="sub-item"></span>

                        <p>รายงานการฝาก</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/reportwithdraw" class="nav-item">
                        <span class="sub-item"></span>

                        <p>รายงานการถอน</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/decimal" class="nav-item">
                        <span class="sub-item"></span>

                        <p>รายงานการฝากทศนิยม</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link
                        to="/report_depositcreate_list"
                        class="nav-item"
                      >
                        <span class="sub-item"></span>

                        <p>รายงานการสร้างรายการฝาก</p>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- affiliate -->

              <li class="nav-item">
                <a
                  data-toggle="collapse"
                  href="#affiliate"
                  class="collapsed"
                  aria-expanded="false"
                >
                  <i class="fas fa-sitemap"></i>
                  <p>ระบบแนะนำเพื่อน</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="affiliate">
                  <ul class="nav nav-collapse">
                    <li>
                      <router-link to="/affiliatesetting" class="nav-item">
                        <span class="sub-item"></span>

                        <p>ตั้งค่าระบบ Affiliate</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/affiliatewithdraw" class="nav-item">
                        <span class="sub-item"></span>

                        <p>การถอนค่าแนะนำ</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/affiliatetransaction" class="nav-item">
                        <span class="sub-item"></span>

                        <p>เช็คข้อมูลแนะนำเพื่อน</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/affiliatetree" class="nav-item">
                        <span class="sub-item"></span>

                        <p>แผนผังองค์กร</p>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <a
                  data-toggle="collapse"
                  href="#summary"
                  class="collapsed"
                  aria-expanded="false"
                >
                  <i class="fa fa-list-ol" aria-hidden="true"></i>
                  <p>สรุป</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="summary">
                  <ul class="nav nav-collapse">
                    <!-- <li>
                      <router-link to="/hidedeposit" class="nav-item">
                        <span class="sub-item"></span>

                        <p>รายการฝากที่ถูกซ่อน</p>
                      </router-link>
                    </li> -->
                    <li>
                      <router-link to="/promotionreport" class="nav-item">
                        <span class="sub-item"></span>

                        <p>สรุปโปรโมชัน</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/paymentbyuser" class="nav-item">
                        <span class="sub-item"></span>

                        <p>การฝาก/ถอน<br />ตามบุคคล</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/hiddendeposit" class="nav-item">
                        <span class="sub-item"></span>

                        <p>การฝากที่ถูกซ่อน</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/loseandprofit" class="nav-item">
                        <span class="sub-item"></span>

                        <p>กำไรขาดทุน</p>
                      </router-link>
                    </li>
                    <!-- <li>
                      <router-link to="/graphregister" class="nav-item">
                        <span class="sub-item"></span>

                        <p >ประวัติการสร้าง <br> รายการทศนิยม</p>
                      </router-link>
                    </li> -->
                    <!-- <li>
                      <router-link to="/decimalpoint" class="nav-item">
                        <span class="sub-item"></span>

                        <p>งบดุล กำไรขาดทุน</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/graphregister" class="nav-item">
                        <span class="sub-item"></span>

                        <p>กราฟสมัครสมาชิก</p>
                      </router-link>
                    </li> -->
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <router-link to="/oldMember" data-toggle="collapse">
                  <i class="fas fa-user"></i>
                  <p>ลูกค้าเก่า</p>
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/menu" data-toggle="collapse">
                  <i class="fas fa-book"></i>
                  <p>เมนู</p>
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link to="/weekDeposit" data-toggle="collapse">
                  <i class="fas fa-book"></i>
                  <p>ฝาก 7 วัน</p>
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/withdrawranking" data-toggle="collapse">
                  <i class="fa fa-trophy" aria-hidden="true"></i>
                  <p>อันดับลูกค้า</p>
                </router-link>
              </li> -->
              <!-- <li class="nav-item">
                <router-link to="/criminalList" data-toggle="collapse">
                  <i class="fas fa-book"></i>
                  <p>รายชื่อมิจฉาชีพ</p>
                </router-link>
              </li> -->
              <li class="nav-item">
                <a
                  data-toggle="collapse"
                  href="#employee"
                  class="collapsed"
                  aria-expanded="false"
                >
                  <i class="fas fa-user-check"></i>
                  <p>พนักงาน</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="employee">
                  <ul class="nav nav-collapse">
                    <li>
                      <router-link to="/employee" class="nav-item">
                        <span class="sub-item"></span>

                        <p>รายชื่อ</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/addprofile" class="nav-item">
                        <span class="sub-item"></span>

                        <p>เพิ่มสมาชิกแอดมิน</p>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <!-- <li class="nav-item">
                <router-link to="/question" data-toggle="collapse">
                  <i class="fas fa-book"></i>
                  <p>คำถามที่พบบ่อยที่สุด</p>
                </router-link>
              </li> -->
              <!-- <li class="nav-item">
                <router-link to="/verifySetting" data-toggle="collapse">
                  <i class="fas fa-user-lock"></i>
                  <p>ตั้งค่ารหัสยืนยันตัวตน</p>
                </router-link>
              </li> -->

              <!-- <li class="nav-item">
                <router-link to="/settingNew" data-toggle="collapse">
                  <i class="fas fa-book"></i>
                  <p>ระบบแนะนำเพื่อน</p>
                </router-link>
              </li> -->
              <li class="nav-item">
                <a
                  data-toggle="collapse"
                  href="#guide"
                  class="collapsed"
                  aria-expanded="false"
                >
                  <i class="fas fa-paper-plane"></i>
                  <p>คู่มือการใช้งาน</p>
                  <span class="caret"></span>
                </a>
                <div class="collapse" id="guide">
                  <ul class="nav nav-collapse">
                    <li>
                      <router-link to="/smssetting" class="nav-item">
                        <span class="sub-item"></span>

                        <p>การตั้งค่าแอป SMS</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/ebook" class="nav-item">
                        <span class="sub-item"></span>

                        <p>Ebook</p>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- <li class="nav-item">
                <a data-toggle="collapse" class="collapsed nav-link" aria-expanded="false">
                  <i class="fas fa-sliders-h"></i>
                  <p>ตั้งค่า</p>
                </a>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
      <!-- End Sidebar -->
    </footer>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    clicktof5() {
      location.reload();
    },
  },
  computed: {},
};
</script>

<style></style>
