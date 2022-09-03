<template>
  <div id="User">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-book" aria-hidden="true"></i> เมนู
        </h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col">
                  <h3 class="card-title">คัดลอกใส่ SMS FORWORD (ANDROID)</h3>
                </div>
                <div class="col">
                </div>
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
                      <th>เมนู</th>
                      <th>FROM Number</th>
                      <th>ลิ้ง</th>
                    </tr>
                  </thead>
                     <tbody style="text-align: center">
                    <tr>
                      <td>Sms OTP ไทยพานิช ถอน</td>
                      <td>027777777</td>
                      <td>https://sms.ambbo.com/external/withdrawOTP2/BU8NQY</td>
                    </tr>
                    <tr>
                      <td>Sms OTP กรุงศรี ถอน</td>
                      <td>Krungsri</td>
                      <td>https://sms.ambbo.com/external/withdrawOTP2/BU8NQY</td>
                    </tr>
                    <tr>
                      <td>Sms OTP ออมสิน ถอน</td>
                      <td>GSB.E-Bank</td>
                      <td>https://sms.ambbo.com/external/withdrawOTP2/BU8NQY</td>
                    </tr>
                    <tr>
                      <td>Sms KBANK ฝาก</td>
                      <td>028888888 หรือ KBank (ขึ้นอยู่กับหัวข้อความ)</td>
                      <td>https://sms.ambbo.com/external/sms2/BU8NQY/KBANK/บัญชีชุดที่</td>
                    </tr>
                    <tr>
                      <td>Sms KBANK ฝาก</td>
                      <td>027777777</td>
                      <td>https://sms.ambbo.com/external/sms2/BU8NQY/SCB/บัญชีชุดที่</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
            <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col">
                  <h3 class="card-title">เมนูของลูกค้า</h3>
                </div>
                <div class="col">
                </div>
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
                      <th>เมนู</th>
                      <th>ลิ้ง</th>
                      <th>คัดลอก</th>
                    </tr>
                  </thead>
                     <tbody style="text-align: center">
                    <tr>
                      <td>เข้าสู่ระบบ</td>
                      <td>https://ambbo.net/?prefix=RkI=</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-info btn-sm mr-1 text-white">
                          <i class="far fa-copy"></i></button>
                      </td>
                    </tr>
                     <tr>
                      <td>สมัครสมาชิก</td>
                      <td>https://ambbo.net/register?prefix=RkI=</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-info btn-sm mr-1 text-white">
                          <i class="far fa-copy"></i></button>
                      </td>
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
import UserService from "@/services/UserService";

export default {
data(){
  return{}
},
methods:{
async checkAuth(){
       const res = await UserService.getProfile().catch(function (error) {
        if(error.response.status === 401){
      const removeToken = localStorage.removeItem("access_token");
        if (removeToken == null) {
        this.$router.push("/login");
      }
      }
      });
      res.logout
    },

}
}
</script>

<style>

</style>