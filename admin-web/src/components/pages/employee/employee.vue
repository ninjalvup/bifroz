<template>
  <div>
    <div class="page-inner">
      <div class="page-header">
        <br />
        <h4 class="page-title"><i class="fas fa-user-tie"></i> พนักงาน</h4>
        <ul class="breadcrumbs"></ul>
      </div>
      <div class="page-body">
       
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <table
                id="basic-datatables"
                class="display table table-striped table-hover"
              >
                <thead style="text-align: center">
                  <tr>
                    <th>ชื่อ</th>
                    <th>ชื่อผู้ใช้</th>
                    <th>ตำแหน่ง</th>
                    <th>Prefix</th>
                    <th>ตัวเลือก</th>
                  </tr>
                </thead>
                <tbody style="text-align: center">
                  <tr v-for="data in employeetable" v-bind:key="data.uuid">
                    <td>{{ data.info_name }}</td>
                    <td>{{ data.username }}</td>
                    <td>{{ data.role }}</td>
                    <td>{{ data.prefix }}</td>

                    <td>
                     <button
                          type="button"
                          class="btn btn-warning btn-sm mr-1 text-white"
                          data-toggle="modal"
                          data-target="#editeuser"
                          v-on:click.prevent="getEmployeeByUUID(data.uuid)"
                        >
                          <i class="fa fa-pencil-alt" aria-hidden="true"
                            >แก้ไข</i
                          >
                        </button>
                       <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        v-on:click.prevent="deleteEmployeeByUUID(data.uuid)"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                </tbody>
                  <tbody>
                  <tr v-if="employeetable.length == '0'">
                    <td colspan="5" class="text-center text-danger">
                      <i class="fas fa-times"></i>
                      ไม่มีข้อมูล !
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        <div
              class="modal fade"
              id="editeuser"
              tabindex="-1"
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div class="modal-dialog " role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">แก้ไขข้อมูลของ : {{usernameuuid}} </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form  v-on:submit.prevent="postEmployeeByUUID()">
                    <div class="modal-body">
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-6">
                            <input type="text" hidden v-model="formedit.uuid" />
                         

                            <div class="form-group row">
                              <label
                                for="tel"
                                class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                              >
                                ชื่อผู้ใช้ :
                                <span class="required-label">*</span>
                              </label>
                              <input
                              disabled
                                class="form-control"
                                type="text"
                                name="tel"
                                id="tel"
                                aria-describedby="helpId"
                                placeholder="tel"
                                v-model="formedit.username"
                                required
                              />
                            </div>

                            <div class="form-group row">
                              <label
                                for="bonus"
                                class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                              >
                                ตำแหน่ง:
                                <span class="required-label">*</span>
                              </label>
                              <select
                                class="form-control"
                                name="bonus"
                                id="bonus"
                                v-model="formedit.role"
                                required
                              >
                                <option selected disabled value>
                                  เลือก role
                                </option>

                                <option value="Admin">Admin</option>
                                <option value="Staff">Staff</option>  
                                                             </select>
                            </div>

                             <div class="form-group row">
                              <label
                                for="tel"
                                class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                              >
                                prefix :
                                <span class="required-label">*</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="tel"
                                id="tel"
                                aria-describedby="helpId"
                                placeholder="tel"
                                v-model="formedit.prefix"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                          

                            <div class="form-group row">
                              <label
                                for="know_us"
                                class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                              >
                                รหัสผ่าน :
                                <span class="required-label">*</span>
                              </label>
                              <input
                                class="form-control"
                                type="password"
                                name="know_us"
                                id="know_us"
                                aria-describedby="helpId"
                                placeholder="know_us"
                                v-model="formedit.password"
                                required
                              />
                            </div>

                           
                            <div class="form-group row">
                              <label
                                for="bank_number"
                                class="col-lg-3 col-md-3 col-sm-4 mt-sm-2 text-right"
                              >
                                ชื่อ :
                                <span class="required-label">*</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="bank_number"
                                id="bank_number"
                                aria-describedby="helpId"
                                placeholder="bank_number"
                                v-model="formedit.info_name"
                                required
                              />
                            </div>
                            <div
                              class="form-group d-flex justify-content-right"
                            >
                            <button
                                class="btn btn-primary
                                "
                               
                              >
                             
                            
                               <i class="fa fa-check" aria-hidden="true"></i>
                                ยืนยัน
                              </button>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
    </div>
  </div>
</template>
<script>
import employeeService from "@/services/employeeService";
import moment from "moment";
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
      username: "",
usernameuuid:'',
      employeetable: [],

      formedit: {
        uuid: "",
        username: "",
        password: "",
        role: "",
        info_name: "",
        prefix: "",
      },
    };
  },
  mounted() {
        this.checkAuth();

    this.moment();

    this.yesterdate = moment()
      .locale("th")
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    this.yestertime = moment()
      .locale("th")
      .subtract(1, "days")
      .format("11:00:00");
    this.todate = moment().locale("th").format("YYYY-MM-DD");
    this.totime = moment().locale("th").format("11:00:00");
    this.getAllEmployee();
  },
  methods: {
    async checkAuth(){
       const res = await UserService.getProfile().catch(function (error) {
        if(error.response.status === 401 || error.response.status === 500){
      const removeToken = localStorage.removeItem("access_token");
        if (removeToken == null) {
        this.$router.push("/login");
      }
      }
      });
      res.logout
    },

    async getAllEmployee() {
       this.employeetable="";
      const res = await employeeService.getAllList();
      this.employeetable = res.data;
    },
    async getEmployeeByUUID(uuid) {
      
      const res = await employeeService.getEditList(uuid);
      this.formedit.uuid = res.data.uuid;
      this.formedit.username = res.data.username;
      this.formedit.password = res.data.password;
      this.formedit.role = res.data.role;
      this.formedit.info_name = res.data.info_name;
      this.formedit.prefix = res.data.prefix;
      this.usernameuuid =res.data.username
    },
    async postEmployeeByUUID() {

      this.res = await employeeService.postEditList(this.formedit)
      .catch(() => {
// this.post.res
      });
      this.getAllEmployee();
          window.$("#editeuser").modal("hide");


    },
    async deleteEmployeeByUUID(uuid) {
      const res = await employeeService.deleteList(uuid);
      console.log(res.employeeService);
      this.getAllEmployee();
    },
  },
};
</script>
