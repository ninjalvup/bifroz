<template>
 <div id="settingNew">
     <div class="page-inner">
      <div class="page-header">
        <br />
        <h4 class="page-title">
          <i class="fa fa-book" aria-hidden="true"></i> Setting New Affiliate
        </h4>
        <ul class="breadcrumbs"></ul>
      </div>
         <div class="col-md-12 row">
          <div class="col-md-12"></div>
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="column">
                  <div class="row">
                    <div class="card-body">
                     <div class="row">
                            <h4>ข้อความสไลด์ในเว็บ</h4><h5 class="text-danger ml-2">xxx.xxx.xxxx</h5>
                        </div>
                      <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea>
                    </div>
                    <div class="card-body">
                      <div class="row">
                            <img src="" alt="" width="700" height="300">
                        </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="card-body">
                        <div class="row">
                            <h4>Banerหน้าลูกค้า</h4><h5 class="text-danger ml-2">(PNG,JPEG 1040x1040 px)</h5>
                        </div>
                      <input type="file" id="myfile" name="myfile" />
                    </div>
                    <div class="card-body">
                      <div class="row">
                            <img src="" alt="" width="250" height="400">
                        </div>
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
import swal from 'sweetalert';

export default {
  mounted() {
swal("อยู่ระหว่างการพัฒนา!", "", "warning").then(() => {
        this.$router.push("/home");

})
  },
}
</script>

<style>

</style>