<template>
  <div id="question">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-book" aria-hidden="true"></i> คำถามที่พบบ่อยที่สุด
        </h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <ul
                class="nav  nav-pills-no-bd"
                id="pills-tab-without-border"
                role="tablist"
              >
                <li class="nav-item submenu">
                  <a
                    class="nav-link active show btn-secondary text-white mr-3"
                    id="pills-profile-tab-nobd"
                    data-toggle="pill"
                    href="#pills-profile-nobd"
                    role="tab"
                    aria-controls="pills-profile-nobd"
                    aria-selected="true"
                  >
                    <i class="fa fa-minus-circle" aria-hidden="true"></i>
                    ทั่วไป
                  </a>
                </li>
                <li class="nav-item submenu">
                  <a
                    class="nav-link btn-primary text-white mr-3"
                    id="pills-normal-tab-nobd"
                    data-toggle="pill"
                    href="#pills-normal-nobd"
                    role="tab"
                    aria-controls="pills-normal-nobd"
                    aria-selected="false"
                  >
                    ระบบฝาก</a
                  >
                </li>
                <li class="nav-item submenu">
                  <a
                    class="nav-link btn-primary text-white mr-3"
                    id="pills-contact-tab-nobd"
                    data-toggle="pill"
                    href="#pills-contact-nobd"
                    role="tab"
                    aria-controls="pills-contact-nobd"
                    aria-selected="false"
                  >
                    ระบบถอน</a
                  >
                </li>
              </ul>
              <div
                class="tab-content mt-2 mb-3"
                id="pills-without-border-tabContent"
              >
                <div
                  class="tab-pane fade active show row"
                  id="pills-profile-nobd"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab-nobd"
                >
                  <p>ทั่วไป</p>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-normal-nobd"
                  role="tabpanel"
                  aria-labelledby="pills-normal-tab-nobd"
                >
                 <p>ระบบฝาก</p>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-contact-nobd"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab-nobd"
                >
                 <p>ระบบถอน</p>
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
import swal from 'sweetalert';

export default {
  mounted() {
swal("อยู่ระหว่างการพัฒนา!", "", "warning")
  },
}
</script>

<style>

</style>