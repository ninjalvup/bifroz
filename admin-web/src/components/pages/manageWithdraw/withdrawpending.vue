<template>
  <div id="User">
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title">
          <i class="fa fa-tasks" aria-hidden="true"></i> จัดการข้อมูลถอน
        </h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    จากวันที่</label
                  >
                  <VueCtkDateTimePicker
                    :only-date="true"
                    v-model="todate"
                    format="YYYY-MM-DD"
                    formatted="DD-MM-YYYY"
                    :no-label="true"
                    Label="yesterday"
                  />
                </div>
                <div class="col-md-1">
                  <label for="datetime">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    เวลา</label
                  >
                  <VueCtkDateTimePicker
                    v-model="totime"
                    :only-time="true"
                    format="HH:mm:ss"
                    formatted="HH:mm"
                    :no-label="true"
                    label="Time"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    ถึงวันที่</label
                  >
                  <VueCtkDateTimePicker
                    :only-date="true"
                    v-model="yesterdate"
                    format="YYYY-MM-DD"
                    formatted="DD-MM-YYYY"
                    :no-label="true"
                    Label="today"
                  />
                </div>
                <div class="col-md-1">
                  <label for="datetime">
                    <i class="fa fa-clock-o" aria-hidden="true"></i> เวลา</label
                  >
                  <VueCtkDateTimePicker
                    v-model="yestertime"
                    :only-time="true"
                    format="HH:mm:ss"
                    formatted="HH:mm"
                    :no-label="true"
                    label="Time"
                  />
                </div>
                <div class="col-md-2">
                  <label for="datetime">เลือกสถานะ</label>
                  <select
                    class="form-control"
                    name="bonus"
                    id="bonus"
                    required
                    v-model="status"
                    @change="onChange($event)"
                  >
                    <option selected value="">ทั้งหมด</option>
                    <!-- <option :value="status_all">ทั้งหมด</option> -->
                    <option :value="status_fail">ผิดพลาด</option>
                    <option :value="status_create">รออนุมัติ</option>
                    <option :value="status_approve">อนุมัติแล้ว</option>
                    <option :value="status_process">กำลังทำรายการ</option>
                    <option :value="status_success">สำเร็จ</option>
                    <option :value="status_otp">OTP</option>
                    <option :value="status_reject">ยกเลิก</option>
                    <option :value="status_manual">ถอนมือ</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label for="datetime">กรุณากรอกข้อมูลที่ต้องการ</label>
                  <input
                    class="form-control"
                    id="email2"
                    placeholder="ข้อมูลที่ต้องการค้นหา"
                    v-model="username"
                  />
                </div>

                <div class="col-md-1.5">
                  <label for="datetime"></label>
                  <br />
                  <button
                    class="btn btn-primary btn-sm ml-1"
                    v-on:click.prevent="getDataParam(), getPersonReportParam()"
                  >
                    <i class="fa fa-search" aria-hidden="true"></i>
                    ค้นหา
                  </button>
                  <!-- <button
                    class="btn btn-secondary btn-sm ml-1"
                    v-on:click.prevent="
                      getYesterday(), getPersonReportYesterday()
                    "
                  >
                    เมื่อวาน
                  </button>
                  <button
                    class="btn btn-warning btn-sm ml-1"
                    v-on:click.prevent="getToday(), getPersonReportToday()"
                  >
                    วันนี้
                  </button> -->
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <span class="border"></span>
            <div class="table-responsive">
              <table
                id="basic-datatables"
                class="display table table-striped table-hover table-bordered"
              >
                <thead style="text-align: center">
                  <tr>
                    <th>จัดการคิว</th>

                    <th>ธนาคาร</th>
                    <th>บัญชี</th>
                    <th>จำนวนครั้ง</th>
                    <th>จำนวนเงินถอน</th>
                  </tr>
                </thead>
                <tbody style="text-align: center">
                  <tr v-for="data in accountbank" v-bind:key="data.id">
                    <td>
                      <button
                        type="button"
                        class="btn btn-warning"
                        @click="checkRequeue"
                      >
                        <i class="fas fa-redo"></i>
                        Reset
                      </button>
                    </td>
                    <td>
                      <div>
                        <div class="avatar mt-3">
                          <img
                            :src="
                              require(`../../../assets/bank_icon/${data.bank_name.toLowerCase()}.png`)
                            "
                            class="icon"
                            width="40"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      {{ data.bank_account_name }} <br />
                      {{ data.bank_number }}
                    </td>
                    <td>{{ timewithdraw }}</td>
                    <td>{{ amountwithdraw | formatNumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card">
            <span class="border"></span>

            <span class="border"></span>
            <!-- 
            <div class="float-right mt-3 mb-3 mr-3 ml-3">
              หมายเหตุ:
              <span class="badge badge-warning"> Create</span> = รออนุมัติ |
              <span class="badge badge-primary"> Approve</span> = อนุมัติแล้ว |
              <span class="badge badge-info"> Process</span> = กำลังทำรายการ |
              <span class="badge badge-success"> Success</span> = สำเร็จ |
              <span class="badge badge-danger"> Reject</span> = ยกเลิก |
              <span class="badge badge-danger"> Fail</span> = ระบบธนาคารผิดพลาด
              | <span class="badge badge-secondary"> Manual</span> = ถอนมือ
            </div> -->
            <span class="border"></span>
            <div class="table-responsive">
              <table
                id="basic-datatables"
                class="display table table-striped table-hover table-bordered"
              >
                <thead style="text-align: center">
                  <tr>
                    <th>#</th>
                    <th>ธนาคาร</th>
                    <th>ยอดเงินถอน</th>
                    <th>วันที่ถอน</th>
                    <th>วันที่อัพเดท</th>
                    <th>สถานะ</th>
                    <th>ออโต้</th>
                    <th>ทำโดย</th>
                    <th>หมาย เหตุ</th>
                    <th>เงินในบัญชี</th>
                    <th>อนุมัติ</th>
                    <th>ยกเลิกถอน</th>
                    <!-- <th>รีเซ็ต</th> -->
                    <th>ถอนมือ</th>
                    <th>สลิป</th>
                    <!--<th>เปลี่ยนสถานะ</th>-->
                  </tr>
                </thead>
                <tbody style="text-align: center">
                  <tr
                    v-for="(data, index) in withdrawpending"
                    v-bind:key="data.uuid"
                  >
                    <!-- <td>{{withdrawpending.length}}</td> -->
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      <div class="avatar mt-3">
                        <img
                          :src="
                            require(`../../../assets/bank_icon/${data.member_account_banks[0].bank_name.toLowerCase()}.png`)
                          "
                          class="icon"
                          width="40"
                        />
                      </div>

                      <div>
                        <b>
                          <a
                            href="#/withdrawpending"
                            @click="getClipboardBank"
                            v-clipboard:copy="
                              data.member_account_banks[0].bank_number
                            "
                            >{{ data.member_account_banks[0].bank_number }}</a
                          ></b
                        >
                      </div>
                      <div class="">
                        {{ data.member_account_banks[0].bank_account_name }}
                      </div>
                      <div>
                        <b>
                          <a
                            href="#/withdrawpending"
                            @click="getClipboard"
                            v-clipboard:copy="data.username"
                            >{{ data.username }}</a
                          ></b
                        >
                      </div>
                    </td>

                    <td>
                      <div v-if="data.transaction_type === '2'">
                        <h5>
                          {{
                            data.amount
                              .toFixed(2)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                          }}
                        </h5>
                        <h6>
                          <span class="badge badge-warning mt-1 mb-1">
                            เครดิต</span
                          >
                        </h6>
                      </div>

                      <div v-else>
                        <h5>
                          {{
                            data.amount
                              .toFixed(2)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                          }}
                        </h5>
                        <h6>
                          <span class="badge badge-info mt-1 mb-1">
                            รายได้</span
                          >
                        </h6>
                      </div>
                    </td>
                    <!-- <td>
                        <div v-if="data.transaction_type == '1'">
                          <span class="badge badge-info">ฝาก</span>
                        </div>
                        <div v-if="data.transaction_type == '2'">
                          <span class="badge badge-warning">ถอน</span>
                        </div>
                      </td> -->
                    <td>{{ data.createdAt | formatDate }}</td>
                    <td>{{ data.updatedAt | formatDate }}</td>

                    <td>
                      <div v-if="data.transaction_status === 'Fail'">
                        <span class="badge badge-warning">ผิดพลาด</span>
                      </div>

                      <div v-if="data.transaction_status === 'Create'">
                        <span class="badge badge-info">รออนุมัติ</span>
                      </div>
                      <div v-if="data.transaction_status === 'Approve'">
                        <span class="badge badge-primary">อนุมัติแล้ว</span>
                      </div>
                      <div v-if="data.transaction_status === 'Process'">
                        <span class="badge badge-secondary">รอทำรายการ</span>
                      </div>
                      <div
                        v-if="
                          data.transaction_status === 'Success' &&
                          data.auto_status === 'Withdraw Success'
                        "
                      >
                        <span class="badge badge-success">สำเร็จ</span>
                      </div>

                      <div
                        v-if="
                          data.transaction_status === 'Success' &&
                          data.auto_status === 'Process'
                        "
                      >
                        <span class="badge badge-success">ทำรายการ</span>
                      </div>
                      <div
                        v-if="
                          data.transaction_status === 'Success' &&
                          data.auto_status === 'wait OTP'
                        "
                      >
                        <span class="badge badge-warning">OTP</span>
                      </div>
                      <div v-if="data.transaction_status === '1'">
                        <span class="badge badge-warning">ถอนมือ</span>
                      </div>
                      <div v-if="data.transaction_status === 'queue'">
                        <span class="badge badge-info">อยู่ในคิว</span>
                      </div>
                      <div v-if="data.transaction_status === 'Reject'">
                        <span class="badge badge-danger">ยกเลิก</span>
                      </div>
                      <div
                        v-if="
                          data.transaction_status === 'Success' &&
                          data.auto_status === 'manual'
                        "
                      >
                        <span class="badge badge-success">สำเร็จ</span>
                      </div>
                    </td>
                    <td>
                      <div v-if="data.auto_status === 'withdraw Fail'">
                        <span class="badge badge-danger">ผิดพลาด</span>
                      </div>
                      <div v-if="data.auto_status === 'queue'">
                        <span class="badge badge-secondary">อยู่ในคิว</span>
                      </div>
                      <div v-if="data.auto_status === 'Normal'">
                        <span class="badge badge-info">ปกติ</span>
                      </div>
                      <div v-if="data.auto_status === 'Create'">
                        <span class="badge badge-success">ปกติ</span>
                      </div>
                      <div v-if="data.auto_status === 'Approve'">
                        <span class="badge badge-info">อนุมัติ</span>
                      </div>
                      <div v-if="data.auto_status === 'manual'">
                        <span class="badge badge-warning">ถอนมือ</span>
                      </div>
                      <div v-if="data.auto_status === 'Manual'">
                        <span class="badge badge-warning">ถอนมือ</span>
                      </div>
                      <div v-if="data.auto_status === 'Success'">
                        <span class="badge badge-info">อนุมัติ</span>
                      </div>
                      <div v-if="data.auto_status === '-'">
                        <span>-</span>
                      </div>
                      <div v-if="data.auto_status === null">
                        <span>-</span>
                      </div>
                      <div v-if="data.auto_status === 'Process'">
                        <span class="badge badge-info">ดำเนินการ</span>
                      </div>
                      <div v-if="data.auto_status === 'Withdraw Success'">
                        <span class="badge badge-success">ปกติ</span>
                      </div>
                      <div v-if="data.auto_status === 'wait OTP'">
                        <span class="badge badge-success">ปกติ</span>
                      </div>
                      <!-- <div v-if=" data.auto_status ==='withdraw Fail'">
                      <span class="badge badge-danger">ถอนผิดพลาด</span>
                      </div> -->
                    </td>
                    <td>{{ data.create_by }}</td>
                    <td>
                      <a
                        href="#/withdrawpending"
                        @click="viewAnnotation(data.annotation)"
                        >view
                      </a>
                    </td>
                    <td>
                      <div v-if="data.credit_bank_before === null">
                        <span class="badge badge-danger mt-1 mb-1">0.00</span>
                      </div>
                      <div v-if="data.credit_bank_before != null">
                        <span class="badge badge-danger mt-1 mb-1">{{
                          data.credit_bank_before
                        }}</span>
                      </div>
                      <span
                        class="badge badge-success mt-1 mb-1"
                        v-if="data.credit_bank_after === null"
                      >
                        0.00</span
                      >
                      <span
                        class="badge badge-success mt-1 mb-1"
                        v-if="data.credit_bank_after != null"
                      >
                        {{ data.credit_bank_after }}</span
                      >
                      <div></div>
                    </td>

                    <td>
                      <!-- Approve -->
                      <div
                        v-if="
                          data.auto_status === null ||
                          data.auto_status === '' ||
                          data.auto_status === '-' ||
                          data.transaction_status === 'Create' ||
                          data.transaction_status === 'Process'
                        "
                      >
                        <button
                          :id="'postApprove'+index"
                          class="btn btn-secondary btn-sm mr-1 text-white"
                          v-on:click.prevent="postApprove(data,index), notiWait()"
                        >
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                      </div>
                      <div v-else>
                        <button
                          id=""
                          class="
                            btn btn-secondary btn-sm
                            mr-1
                            text-white
                            no-drop
                          "
                          disabled
                        >
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                      </div>

                      <!-- <button
                        id="postApprove"
                        class="btn btn-secondary btn-sm mr-1 text-white"
                        v-on:click.prevent="postApprove(data)"
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </button> -->
                    </td>
                    <td>
                      <!-- <div
                        v-if="
                          (data.transaction_type === '2' &&
                            data.auto_status === null &&
                            data.auto_status === 'Approve' &&
                            data.auto_status === '' &&
                            data.auto_status === '-') 
                        "
                      > -->
                      <div
                        v-if="
                          data.auto_status === null ||
                          data.auto_status === 'Approve' ||
                          data.auto_status === '-' ||
                          data.auto_status === '' ||
                          data.transaction_status === 'Create'
                        "
                      >
                        <button
                          id="postCancel"
                          type="button"
                          data-toggle="modal"
                          data-target="#changeStatus"
                          v-on:click.prevent="passUpdate(data, type.cancel)"
                          class="btn btn-danger btn-sm ml-1"
                        >
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                          <!-- ยกเลิกถอน -->
                        </button>
                      </div>

                      <div v-else-if="data.transaction_type === '3'">
                        <button
                          id="affiliateCancel"
                          type="button"
                          data-toggle="modal"
                          data-target="#modalAffiliateCancel"
                          v-on:click.prevent="fnCancel(data)"
                          class="btn btn-danger btn-sm ml-1"
                        >
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                          <!-- ยกเลิกถอนรายได้ -->
                        </button>
                      </div>

                      <div v-else>
                        <button
                          disabled
                          type="button"
                          class="btn btn-danger btn-sm ml-1 no-drop"
                        >
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                          <!-- ยกเลิกถอน -->
                        </button>
                      </div>
                    </td>

                    <!-- <td>
                      <div
                        v-if="
                          data.auto_status === null ||
                          data.auto_status === 'Process' ||
                          data.auto_status === 'Approve' ||
                          data.auto_status === '-' ||
                          data.auto_status === '' ||
                          data.transaction_status === 'Process'
                        "
                      >
                        <button
                          id="postReset"
                          type="button"
                          data-toggle="modal"
                          data-target="#changeStatus"
                          class="btn btn-info btn-sm ml-1"
                          v-on:click.prevent="passUpdate(data, type.reset)"
                        >
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </button>
                      </div>

                      <div v-else>
                        <button
                          v-on:click.prevent="passUpdate(data, type.reset)"
                          id="postReset"
                          type="button"
                          disabled
                          class="btn btn-info btn-sm ml-1"
                        >
                          <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td> -->

                    <td>
                      <!-- ถอนมือ -->
                      <div
                        v-if="
                          data.auto_status === null ||
                          data.auto_status === '-' ||
                          data.auto_status === 'Approve' ||
                          data.auto_status === '' ||
                          data.transaction_status === 'Process'
                        "
                      >
                        <button
                          id="getShowWithdrawByUuid"
                          type="button"
                          class="btn btn-dark btn-sm ml-1"
                          data-toggle="modal"
                          data-target="#manualAnnotation"
                          v-on:click.prevent="checkClicked(data.uuid, uuid)"
                        >
                          <i class="fas fa-hand-holding-usd fa-lg"></i>
                        </button>
                      </div>
                      <div v-else>
                        <button
                          disabled
                          id="getShowWithdrawByUuid"
                          type="button"
                          class="btn btn-dark btn-sm ml-1 no-drop"
                        >
                          <i class="fas fa-hand-holding-usd fa-lg"></i>
                        </button>
                      </div>
                    </td>

                    <td>
                      <div v-if="data.transaction_slip === null">
                        <button
                          id="viewSlipnull"
                          type="button"
                          class="btn btn-info btn-sm ml-1 no-drop"
                          disabled
                        >
                          <i class="fa fa-list-alt" aria-hidden="true"></i>

                          <!-- สลิป -->
                        </button>
                      </div>
                      <div v-else>
                        <button
                          type="button"
                          class="btn btn-info btn-sm"
                          data-toggle="modal"
                          data-target="#viewSlip"
                          @click="passSlip(data)"
                        >
                          <i class="fa fa-list-alt" aria-hidden="true"></i>
                        </button>
                        <!-- <a
                          target="_blank"
                          id="viewSlip"
                          type="button"
                          class="btn btn-info btn-sm ml-1"
                          :href="`${data.transaction_slip}`"
                        >

                          <i class="fa fa-list-alt" aria-hidden="true"></i>
                        </a> -->
                      </div>
                    </td>

                    <td>
                      <!-- data.auto_status === 'Process' || -->

                      <div
                        v-if="
                          data.auto_status === null ||
                          data.auto_status === 'queue' ||
                          data.auto_status === '-' ||
                          data.auto_status === 'Approve' ||
                          data.auto_status === 'Approve' ||
                          data.auto_status === 'manual' ||
                          data.auto_status === '' ||
                          data.auto_status === 'Withdraw Success' ||
                          data.transaction_status === 'Process'
                        "
                      >
                        <button
                          type="button"
                          id="postChange"
                          class="btn btn-warning btn-sm mt-1 no-drop"
                          disabled
                        >
                          <i class="fas fa-pen"></i>
                          <!-- เปลี่ยนสถานะ -->
                        </button>
                      </div>
                      <div v-else>
                        <!-- v-on:click.prevent="passUpdate(data, type.update)" -->

                        <button
                          v-on:click.prevent="passUpdate(data, type.update)"
                          type="button"
                          id="postChange"
                          data-toggle="modal"
                          data-target="#changeStatus"
                          class="btn btn-warning btn-sm mt-1"
                        >
                          <i class="fas fa-pen"></i>
                          <!-- เปลี่ยนสถานะ -->
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr v-if="withdrawpending.length == '0'">
                    <td colspan="17" class="text-center text-danger">
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

      <!-- modalSTATUSCHANGE -->
      <div
        class="modal fade"
        id="changeStatus"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLabel">
                กรอกหมายเหตุ<span class="required-label">***</span>
              </h3>
            </div>
            <form v-on:submit.prevent.stop="postUpdate">
              <div class="modal-body">
                <div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="หมายเหตุ"
                    v-model="formupdatestatus.annotation"
                    required
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">ยืนยัน</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- modal cancel -->
      <div
        class="modal fade"
        id="modalAffiliateCancel"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLabel">
                กรอกหมายเหตุ<span class="required-label">***</span>
              </h3>
            </div>
            <form v-on:submit.prevent="affiliateCancel">
              <div class="modal-body">
                <input
                  type="text"
                  class="form-control"
                  placeholder="หมายเหตุ"
                  v-model="formupdatestatus.annotation"
                  required
                />
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">ยืนยัน</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- modalManual -->
      <div
        class="modal fade"
        id="manualAnnotation"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLabel">
                กรอกหมายเหตุ<span class="required-label">***</span>
              </h3>
            </div>
            <!-- v-on:click.prevent="postAccept(data.uuid)" -->

            <form v-on:submit.prevent="postAccept(uuid)">
              <div class="modal-body">
                <div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="หมายเหตุ"
                    v-model="Manualannotation"
                    required
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">ยืนยัน</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- modal -->
      <div
        class="modal fade"
        id="viewSlip"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">ข้อมูลสลิป</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img :src="slipImg" width="100%" height="auto" alt="" />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                ปิด
              </button>
              <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
          </div>
        </div>
      </div>
      <!-- modalapprove -->

      <!-- end -->
    </div>
    <div class="col-md-4">
      <audio id="myAudio" hidden controls autoplay>
        <source src="../../../assets/audio/withdraw.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <!-- <button onclick="myFunction()">Try it</button> -->

      <!-- <p id="demo"></p> -->
    </div>
  </div>
</template>

<script>
import { baseURL } from "../../../services/api";

import swal from "sweetalert";
import Swal from "sweetalert2";
import managewithdrawService from "@/services/managewithdrawService";
import UserService from "@/services/UserService";
import bankService from "@/services/bankService";
import affiliateService from "@/services/affiliateService";
import axios from "axios";
import moment from "moment-timezone";
import memberTransaction from "@/services/memberTransaction.js";

export default {
  data() {
    return {
      Manualannotation: "",
      cIndex: [],
      bankwithdraw: "",
      amountwithdraw: "",
      timewithdraw: "",
      type: {
        update: "update",
        reset: "reset",
        cancel: "cancel",
      },
      // buttonStatus:disable=true,
      todaydate: "",
      todaytime: "",
      formA: {
        annotationUpdate: "",
      },
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
      showmodal: true,
      bank: "",
      username: "",
      amount: "",
      bonus_credit: "",
      transaction_type: "",
      credit_before: "",
      credit_after: "",
      create_by: "",
      annotation: "",
      ref: "",
      transaction_status: "",
      createdAt: "",
      updatedAt: "",
      formupdatestatus: {
        annotation: "",
        username: "",
        uuid: "",
        create_by: "",
        amount: "",
      },
      withdrawpending: [],
      withdrawbyuuid: [],
      credit: "",
      amountuuid: "",
      usernameuuid: "",
      form: {},
      bankwithdrawnumber: "",
      accountbank: [],
      status: "",
      status_all: "",
      status_fail: "Fail",
      status_create: "Create",
      status_approve: "Approve",
      status_process: "Process",
      status_success: "Success",
      status_otp: "OTP",
      status_reject: "Reject",
      status_manual: "manual",
      slipImg: "",
    };
  },
  computed: {
    hrefTarget() {
      return this.enabled ? "_blank" : "_self";
    },
  },
  mounted() {
    let x = document.getElementById("myAudio");
    x.pause();
    this.yesterdate = moment().locale("th").format("YYYY-MM-DD");
    this.totime = moment().locale("th").format("00:00:00");
    this.todate = moment().locale("th").format("YYYY-MM-DD");
    this.yestertime = moment().locale("th").format("23:59:59");
    // this.playAudio();
    this.pauseAudio();
    this.getBankWithdraw();
    this.getDataParam();
    this.checkAuth();
    this.getPersonReportParam();
  },
  methods: {
    clickCallback(pageNum) {
      console.log(pageNum);
    },
    passSlip(data) {
      // console.log(data.transaction_slip);
      this.slipImg = data.transaction_slip;
    },
    async checkAuth() {
      const res = await UserService.getProfile().catch(function (error) {
        if (error.response.status === 401 || error.response.status === 500) {
          const removeToken = localStorage.removeItem("access_token");
          if (removeToken == null) {
            this.$router.push("/login");
          }
        }
      });
      res.logout;
    },

    onChange(event) {
      let data = event.target.value;
      console.log(data);
      // return (data = this.status);
    },

    async getDataParam() {
      this.firstData = this.withdrawpending.length;
      let status = this.status;
      const username = this.username;
      let s1 = moment().locale("th").format(`${this.yesterdate}`);
      let e1 = moment().locale("th").format(`${this.todate}`);
      let s2 = moment().locale("th").format(`${this.yestertime}`);
      let e2 = moment().locale("th").format(`${this.totime}`);
      const start_date = e1 + "T" + e2 + "";
      const end_date = s1 + "T" + s2 + "";
      await axios({
        method: "get",

        url: `${baseURL}/member_transaction/withdraw-pending-list?start_date=${start_date}&end_date=${end_date}&status=${status}&username=${username}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          // this.withdrawpending = [];
          this.withdrawpending = response.data.data;
          this.withdrawpending = response.data.data;
          

          // console.log(this.withdrawpending)
          if (this.firstData < this.withdrawpending.length) {
            let self = this;
            self.playAudio();
          }

          let self = this;
          setTimeout(async function () {
            await self.getDataParam();
          }, 1500);
          let countLength = this.withdrawpending.length;
          for (let countIndex = 0; countIndex < countLength; countIndex++) {
            // const element = array[index];
            // const allIndex
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getToday() {
      // this.withdrawpending = [];
      this.todaydate = moment().locale("th").format("YYYY-MM-DDT");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      // const t = "T";
      // const z = "";
      const username = this.username;
      const start_date = this.todaydate + this.todaytime + "";
      const end_date = this.todaydate + this.todaytime2 + "";

      await axios({
        method: "get",
        url: `${baseURL}/member_transaction/withdraw-pending-list?start_date=${start_date}&end_date=${end_date}&username=${username}&status=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.withdrawpending = response.data.data;
          this.withdrawpending = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getYesterday() {
      // this.withdrawpending = [];
      let s1 = moment()
        .subtract(1, "days")
        .locale("th")
        .format(`${this.yesterdate}`);
      let e1 = moment().locale("th").format("00:00:00");
      let s2 = moment()
        .subtract(1, "days")
        .locale("th")
        .format(`${this.yestertime}`);
      let e2 = moment().locale("th").format("23:59:59");
      // this.todaydate = moment().subtract(1, "days").locale("th").format(`${this.todate}`);

      // this.todaytime2 = moment().locale("th").format("23:59:59");
      // this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      // const z = "";
      const username = this.username;
      const start_date = s1 + t + e1;
      const end_date = s2 + t + e2;

      axios({
        method: "get",
        url: `${baseURL}/member_transaction/withdraw-pending-list?start_date=${start_date}&end_date=${end_date}&username=${username}&status=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.withdrawpending = response.data.data;
          this.withdrawpending = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // async getDataParam() {
    //   let status =this.status;
    //   // this.withdrawpending = "";
    //   console.log(this.withdrawpending.length);
    //   this.yesterdate = moment()
    //     .locale("th")
    //     // .add(1, "days")
    //     .format("YYYY-MM-DD");
    //   this.yestertime = moment().locale("th").format("23:59:59");
    //   this.todate = moment().locale("th").format("YYYY-MM-DD");
    //   this.totime = moment().locale("th").format("00:00:00");

    //   this.thistime = moment;
    //   // this.todaydate = moment().locale("th").format("YYYY-MM-DD");
    //   // this.todaytime = moment().locale("th").format("00:00:00");
    //   // this.todaytime2 = moment().locale("th").format("23:59:59");
    //   // const t = "T";
    //   // const z = "";
    //   const username = this.username;
    //   const end_date = this.yesterdate + "T" + this.yestertime + "";

    //   const start_date = this.todate + "T" + this.totime + "";

    //   self.res = await managewithdrawService.getDataParam(
    //     start_date,
    //     end_date,status,
    //     username
    //   );
    //   this.withdrawpending = self.res.data;
    //   this.withdrawpending = self.res.data;

    //   let self = this;
    //   setTimeout(async function () {
    //     await self.getDataParam();
    //   }, 15000);
    // },
    // async getShowWithdrawByUuid(uuid) {
    // console.log(uuid);
    // const res = await managewithdrawService.getWithdrawByUuid(uuid);
    // this.withdrawbyuuid = res.data;
    // this.amountuuid = res.data.withdraw.amount;
    // this.credit = res.data.current_credit[0].balance;
    // this.credit2 = this.credit | this.formatNumber;
    // if (this.credit2 == 0) {
    //   this.credit = "0";
    // }

    // this.usernameuuid = res.data.withdraw.username;
    // },
    checkClicked(uuid) {
      // console.log(uuid);
      // this.postAccept(uuid);
      this.uuid = uuid;
      // this.$confirm("ยืนยันการทำรายการ").then(() => {
      // });
    },
    notiWait() {
      swal(
        {
          // cancel: true,
          timer: 3000,
          title: "อนุมัติรายการแล้วกรุณาสักครู่",
          text: "ระบบกำลังทำรายการ",
          icon: "warning",
        }
        // "อนุมัติรายการแล้วกรุณาสักครู่ ",
        // "ระบบกำลังทำรายการ!",
        // "warning"
      );
    },
    async postAccept(uuid) {
      // console.log(uuid);

      // const res = await managewithdrawService.getWithdrawByUuid(uuid);
      // console.log(res);
      const res1 = await UserService.getProfile();

      this.postaccept = {
        create_by: res1.data.info_name,
        uuid: uuid,
        annotation: this.Manualannotation,
      };
      // console.log(this.postaccept);

      axios
        .post(
          baseURL + "/member_transaction" + "/approved-withdraw",
          this.postaccept,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )

        .then(() => {
          window.$("#getShowWithdrawByUuid").modal("hide");
          window.$(".getShowWithdrawByUuid").modal("hide");
          window.$(".manualAnnotation").modal("hide");
          window.$("#manualAnnotation").modal("hide");

          this.$toast.success("อัพเดทรายการถอนมือเรียบร้อย", {
            position: "top-right",
            timeout: 3000,
          });
        });
    },
    getClipboard() {
      this.$toast.success("คัดลอก User สำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
    getClipboardBank() {
      this.$toast.info("คัดลอก เลขบัญชี สำเร็จแล้ว", {
        position: "top-right",
        timeout: 1500,
      });
    },
    async postApprove(data,index) {
      // document.getElementById("postApprove").disabled = true;
      document.getElementById("postApprove"+index).disabled = true;
      // console.log(document.getElementById("postApprove"+index).id);

      let amount = parseInt(data.amount);
      this.formapproveWA = {
        uuid: data.uuid,
        username: data.username.trim(),
        amount: amount,
        bank_name: data.member_account_banks[0].bank_name,
        bank_number: data.member_account_banks[0].bank_number,
      };
      const res = await managewithdrawService.postapproveWithdrawAuto(
        this.formapproveWA
      );
      // document.getElementById("postApprove"[1]).disabled = true;

      // document.getElementById("postApprove").disabled = true;

      if (res.statusWithdraw === "wait OTP") {
        this.$toast.warning("รอ OTP", {
          position: "top-right",
          timeout: 2000,
        });
      }
      // document.getElementById("postApprove").disabled = true;

    },
    checkClickedApprove() {
      this.$confirm("ยืนยันการทำรายการ").then(() => {
        this.postApprove();
      });
    },
    viewAnnotation(annotation) {
      if (annotation === null || annotation === "-") {
        annotation = "ยังไม่มีข้อมูล";
      }
      swal({ title: annotation, button: false });
    },
    viewSlip(transaction_slip) {
      if (transaction_slip === null) {
        transaction_slip = "ยังไม่มีข้อมูล";
      }
      swal({
        icon: transaction_slip,
        button: false,
      });
    },

    async passUpdate(data, type) {
      const resuser = await UserService.getProfile();
      const create_by = resuser.data.info_name;
      this.formupdatestatus = {
        uuid: data.uuid,
        type: type,
        username: data.username,
        amount: data.amount,
        annotation: this.annotationUpdate,
        create_by: create_by,
      };
    },
    postUpdate() {
      let timerInterval;
        Swal.fire({
          title: "กรุณารอสักครู่",
          // text: "ประมาณ 1 - 2 นาที",
          imageUrl: "https://media3.giphy.com/media/12MhwQm8toOEp2/source.gif",
          imageWidth: 300,
          imageHeight: 200,

          html: " ประมาน <b></b> นาที.",
          timer: 1357,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,

          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                let ms = Swal.getTimerLeft();
                let minutes = Math.floor(ms / 60000);
                let seconds = ((ms % 60000) / 1000).toFixed(0);
                if (b) {
                  b.textContent = `${minutes}:${
                    seconds < 10 ? "0" : ""
                  }${seconds}`;
                }
              }
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(async (result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
this.time ="I was closed by the timer";          }
        });
      window.$("#changeStatus").modal("hide");

      const res = managewithdrawService.postUpdateStatus(this.formupdatestatus);
      // this.$toast.warning("เปลี่ยนสถานะแล้ว", {
      //   position: "top-right",
      //   timeout: 1500,
      // });

      res.data;
    },
    async getPersonReportParam() {
      let s1 = moment().locale("th").format(`${this.yesterdate}`);
      let e1 = moment().locale("th").format(`${this.todate}`);
      let s2 = moment().locale("th").format(`${this.yestertime}`);
      let e2 = moment().locale("th").format(`${this.totime}`);
      const start_date = e1 + "T" + e2 + "";
      const end_date = s1 + "T" + s2 + "";

      const res = await axios({
        method: "get",
        url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      this.amountwithdraw = res.data.sumperson.personWithdrawreaamount;
      this.timewithdraw = res.data.sumperson.personWithdrawcount;
    },
    async getPersonReportYesterday() {
      this.todaydate = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const z = "";
      // const username = this.username;
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;

      const res = await axios({
        method: "get",
        url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      this.amountwithdraw = res.data.sumperson.personWithdrawreaamount;
      this.timewithdraw = res.data.sumperson.personWithdrawcount;
    },
    async getPersonReportToday() {
      this.todaydate = moment().locale("th").format("YYYY-MM-DDT");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");

      const start_date = this.todaydate + this.todaytime + "";
      const end_date = this.todaydate + this.todaytime2 + "";

      const res = await axios({
        method: "get",
        url: `${baseURL}/report/person/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      this.amountwithdraw = res.data.sumperson.personWithdrawreaamount;
      this.timewithdraw = res.data.sumperson.personWithdrawcount;
    },
    async getBankWithdraw() {
      const res = await bankService.getBankAPI();
      this.accountbank = res.data.data;

      this.bankwithdrawnumber = res.data.data[0].bank_number;
    },

    pauseAudio() {
      let x = document.getElementById("myAudio");
      x.pause();
    },
    playAudio() {
      let audio = new Audio(require("./../../../assets/audio/withdraw.mp3"));
      audio.play();
    },
    async affiliateCancel() {
      await affiliateService.getaffiliateCancel(this.formupdatestatus);
      this.$toast.success("เปลี่ยนสถานะแล้ว", {
        position: "top-right",
        timeout: 1500,
        icon: true,
        rtl: false,
      });
      window.$("#modalAffiliateCancel").modal("hide");
    },
    fnCancel(data) {
      this.formupdatestatus.username = data.username;
      this.formupdatestatus.uuid = data.uuid;
    },
    postRequeue() {
      const res = memberTransaction.postReQueue();
      res.post;
    },

    checkRequeue() {
      this.$confirm("ท่านต้องการ Reset คิวการถอน ?").then(() => {
        this.postRequeue();
      });
    },

    targetBlank(a) {
      window.open("" + a + "", "_blank");
    },
  },
};
</script>
<style>
.no-drop {
  cursor: no-drop;
}
</style>
