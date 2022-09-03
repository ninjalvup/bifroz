<template>
  <div id="verify">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-book" aria-hidden="true"></i> ตั้งค่ารหัสยืนยันตัวตน
        </h4>
      </div>
            <div class="row">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <div class="card-body">
                <form class="form-inline justify-content-center">
                    <div class="row">
                      <img src="" alt="" width="200" height="200">
                    </div>
                  <div class="form-group">
                    <input
                      class="form-control ml-4"
                      id="verifycode"
                      placeholder="รหัสยืนยัน"
                    />

                    <button class="btn btn-info ml-2">
                      ยืนยัน
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
         <div class="col-md-7">
            <div class="card">
              <div class="card-body">
                <h3>วิธีการตั้งค่าล็อกอินสองชั้น</h3>
              </div>
              <div class="card-body">
                <h4> 1.ดาวโลดเเอฟ Google Authenticator</h4>
                <img class="mr-5" src="" alt="" width="200" height="200">
                <img src="" alt="" width="200" height="200">
              </div>
              <div class="card-body">
                <h4>2.ทำการเปิดเเอปที่ดาวน์โหลด</h4>
                <h4>3.ปุ่มเเสกนบาร์โค้ด</h4>
                <h4>4.กรอกที่ปรากฏขึ้น ภายใน 5 นาที</h4>
                <h4>5.ทำการกดปุ่มยืนยัน</h4>
              </div>
              <div class="card-body">
                <h2>หรือ</h2>
                <h4>ลิ้งคลิก</h4>
              </div>
            </div>
          </div>
      </div>
    </div>
    <h4 class="page-title text-center text-danger">
      ***หากทำการตั้งค่ายืนยันตัวตนเเล้ว หน้าจอ Login จะมีช่องให้กรอกรหัสยืนยันตัวตัวทุกครั้งที่มีการล็อกอินเข้าสู่ระบบ
    </h4>

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