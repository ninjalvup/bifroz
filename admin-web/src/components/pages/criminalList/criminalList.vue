<template>
  <div id="criminalList">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-book" aria-hidden="true"></i> รายชื่อมิจฉาชีพ
        </h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col">
                  <h3 class="card-title">รายชื่อมิจฉาชีพ</h3>
                </div>
                <div class="col"></div>
              </div>
            </div>

            <div class="card-body">
              <div class="table-responsive">
                <table
                  id="basic-datatables"
                  class="display table table-striped table-hover table-bordered"
                >
                  <thead style="text-align: center">
                    <tr>
                      <th>ลำดับ</th>
                      <th>ชื่อ</th>
                      <th>ธนาคาร</th>
                      <th>เลขบัญชี</th>
                    </tr>
                  </thead>
                  <tbody style="text-align: center">
                    <tr>
                      <td>dddd</td>
                      <td>ddd</td>
                      <td>555</td>
                      <td>dddกกกกกกกกกกกกกกกกกกกกกก</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    alert("อยู่ระหว่างการพัฒนา");
  },
};
</script>

<style>
</style>