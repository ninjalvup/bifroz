<template>
  <div id="home">
    <!-- ข้อมูลการฝากทศนิยม -->
    <div class="row mt-3 justify-content-center">
      <div class="col-md-9">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb shadow">
            <li class="breadcrumb-item">
              <router-link to="/home">หนัาหลัก</router-link>
            </li>
            <!-- <li class="breadcrumb-item" aria-current="page">
              <router-link to="/deposit">ฝากเงิน</router-link>
            </li>-->
            <li class="breadcrumb-item active" aria-current="page">
              ข้อมูลการโอน
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row  justify-content-center">
      <div class="col-md-9">
        <div class="card border-0 shadow mt-4">
          <div class="card-body">
            ทำรายการเรียบร้อย
            <hr />
       
            <div class="row mt-3">
              <div class="col-md-12 text-center">
                <router-link
                  to="/home"
                  value="withdraw"
                  class="btn btn-blue btn-lg  rounded-pill text-center text-white" style="background: linear-gradient(0deg, #007bff 0%, rgb(0 121 255 / 62%) 100%);"
                >
                  <i class="fas fa-check-circle"></i> กลับสู่หน้าหลัก
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

</script>
