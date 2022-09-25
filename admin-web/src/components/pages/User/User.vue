<template>
  <div>
    <div class="page-inner">
      <div class="page-header">
        <h4 class="page-title"><i class="fas fa-users"></i> ลูกค้า</h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <form v-on:submit.prevent="getDataParam(search_type)">
                <div class="row">
                  <div class="col-md-2">
                    <label for="datetime">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      จากวันที่
                    </label>
                    <VueCtkDateTimePicker
                      :only-date="true"
                      v-model="todate"
                      format="YYYY-MM-DD"
                      formatted="DD-MM-YYYY"
                      :no-label="true"
                      locale="th-TH"
                      label="yesterday"
                    />
                  </div>
                  <div class="col-md-1">
                    <label for="datetime">
                      <i class="fa fa-clock-o" aria-hidden="true"></i> เวลา
                    </label>
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
                      ถึงวันที่
                    </label>
                    <VueCtkDateTimePicker
                      :only-date="true"
                      v-model="yesterdate"
                      format="YYYY-MM-DD"
                      formatted="DD-MM-YYYY"
                      :no-label="true"
                      locale="th-TH"
                      label="today"
                    />
                  </div>
                  <div class="col-md-1">
                    <label for="datetime">
                      <i class="fa fa-clock-o" aria-hidden="true"></i>
                      เวลา
                    </label>
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
                    <label for="search_type">ประเภทการค้นหา</label>
                    <select
                      class="form-control"
                      name="search_type"
                      @change="onChangeStatus($event)"
                      v-model="search_type"
                      id="search_type"
                    >
                      <option selected disabled value="">
                        เลือกประเภทการค้นหา
                      </option>
                      <option value="">ทั้งหมด</option>

                      <option :value="search_username">Username</option>
                      <option :value="search_tel">หมายเลขโทรศัพท์</option>
                      <option :value="search_bankNumber">เลขบัญชีธนาคาร</option>
                      <option :value="search_fname">ชื่อจริง</option>
                      <option :value="search_sname">นามสกุล</option>
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
                    <br />
                    <button class="btn btn-primary btn-sm ml-1" type="submit">
                      <i class="fas fa-search"></i>
                      ค้นหา
                    </button>
                    <button
                      class="btn btn-secondary btn-sm ml-1"
                      v-on:click.prevent="getYesterday()"
                    >
                      เมื่อวาน
                    </button>
                    <button
                      class="btn btn-warning btn-sm ml-1"
                      v-on:click.prevent="getToday()"
                    >
                      วันนี้
                    </button>
                  </div>
                </div>
              </form>
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
                  <h3 class="card-title">ข้อมูลลูกค้า</h3>
                </div>
              </div>
            </div>

            <div class="card-body">
              <div>
                <h5 class="float-left">
                  <i class="far fa-calendar-alt"></i> {{ todate }} ถึง
                  {{ yesterdate }} ลูกค้าทั้งหมด
                  <div v-if="member.length != 0" class="badge badge-secondary">
                    {{ member.length }}
                  </div>
                  <div v-if="member.length === 0" class="badge badge-secondary">
                    0
                  </div>

                  คน
                </h5>
              </div>

              <div class="table-responsive">
                <table
                  id="basic-datatables"
                  class="display table table-striped table-bordered"
                >
                  <thead style="text-align: center" class="table-bordered">
                    <tr>
                      <th>#</th>
                      <th>ชื่อ-นามสกุล</th>
                      <th>ชื่อผู้ใช้</th>
                      <th>แนะนำโดย</th>
                      <th>หมายเลขโทรศัพท์</th>
                      <th>Bonus</th>
                      <th>Line ID</th>
                      <th>Know as</th>
                      <th>วันที่ลงทะเบียน</th>
                      <th>ฝาก</th>
                      <th>ถอน</th>
                      <th>เปลี่ยนรหัส</th>
                      <th>แก้ไข</th>
                    </tr>
                  </thead>

                  <tbody style="text-align: center">
                    <tr v-for="(data, index) in member" v-bind:key="data.uuid">
                      <td>{{ index + 1 }}</td>
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
                              href="#/user"
                              @click="getClipboardBank"
                              v-clipboard:copy="
                                data.member_account_banks[0].bank_number
                              "
                              >{{ data.member_account_banks[0].bank_number }}</a
                            ></b
                          >
                        </div>
                        <div>
                          {{ data.member_account_banks[0].bank_account_name }}
                        </div>
                      </td>
                      <td>
                        <b>
                          <a
                            href="#/user"
                            @click="getClipboard"
                            v-clipboard:copy="data.sb_username"
                            >{{ data.sb_username }}</a
                          ></b
                        >
                      </td>
                      <td>
                        <b>
                          <a
                            href="#/user"
                            @click="getClipboard"
                            v-clipboard:copy="data.recommend"
                            >{{ data.recommend }}</a
                          ></b
                        >
                      </td>
                      <td>{{ data.tel | formatTell }}</td>
                      <td>
                        <div>
                          <div v-if="data.bonus == '1'">
                            <span class="badge badge-success">รับโบนัส</span>
                          </div>
                          <div v-if="data.bonus == '0'">
                            <span class="badge badge-warning">ไม่รับโบนัส</span>
                          </div>
                        </div>
                      </td>
                      <td>{{ data.line_id }}</td>
                      <td>{{ data.know_us }}</td>
                      <td>{{ data.register_date | formatDate }}</td>
                      <td>
                        <button
                          v-on:click.prevent="
                            getByUserDeposit(data.sb_username)
                          "
                          class="btn btn-secondary btn-sm"
                          data-toggle="modal"
                          data-target="#centralModalFluid"
                        >
                          <i class="fa fa-search-plus" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          v-on:click.prevent="
                            getByUserWithdraw(data.sb_username)
                          "
                          class="btn btn-primary btn-sm mr-1 text-white"
                          data-toggle="modal"
                          data-target=".modelId"
                        >
                          <i class="fa fa-search-plus" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          v-on:click.prevent="checkClicked(data)"
                          class="btn btn-info btn-sm mr-1 text-white"
                          data-toggle="modal"
                          data-target="#modelId"
                        >
                          <i class="fas fa-key"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-warning btn-sm mr-1 text-white"
                          data-toggle="modal"
                          data-target="#editeuser"
                          v-on:click.prevent="getEditbyUserUUID(data.uuid)"
                        >
                          <i class="fa fa-pencil-alt" aria-hidden="true"
                            >แก้ไข</i
                          >
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr v-if="member.length === 0">
                      <td colspan="12" class="text-center text-danger">
                        <i class="fas fa-times"></i>
                        ไม่มีข้อมูล !
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="centralModalFluid"
              style="width: 100%"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myExtraLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      ข้อมูลการฝากของ : {{ usernamedeposit }}
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-3">
                              <label for="datetime">
                                <i
                                  class="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                                จากวันที่
                              </label>
                              <VueCtkDateTimePicker
                                :only-date="true"
                                v-model="todate"
                                format="YYYY-MM-DD"
                                formatted="DD-MM-YYYY"
                                :no-label="true"
                                locale="th-TH"
                                label="yesterday"
                              />
                            </div>
                            <div class="col-md-3">
                              <label for="datetime">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                เวลา
                              </label>
                              <VueCtkDateTimePicker
                                v-model="totime"
                                :only-time="true"
                                format="HH:mm:ss"
                                formatted="HH:mm"
                                :no-label="true"
                                label="Time"
                              />
                            </div>
                            <div class="col-md-3">
                              <label for="datetime">
                                <i
                                  class="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                                ถึงวันที่
                              </label>
                              <VueCtkDateTimePicker
                                :only-date="true"
                                v-model="yesterdate"
                                format="YYYY-MM-DD"
                                formatted="DD-MM-YYYY"
                                :no-label="true"
                                locale="th-TH"
                                label="today"
                              />
                            </div>
                            <div class="col-md-3">
                              <label for="datetime">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                เวลา
                              </label>
                              <VueCtkDateTimePicker
                                v-model="yestertime"
                                :only-time="true"
                                format="HH:mm:ss"
                                formatted="HH:mm"
                                :no-label="true"
                                label="Time"
                              />
                            </div>
                          </div>
                          <div class="row mt-2 pl-2">
                            <button
                              class="btn btn-primary btn-sm ml-1"
                              v-on:click.prevent="
                                getDataParamDeposit(usernamedeposit)
                              "
                            >
                              <i class="fa fa-search" aria-hidden="true"></i>
                              ค้นหา
                            </button>
                            <button
                              class="btn btn-secondary btn-sm ml-1"
                              v-on:click.prevent="
                                getYesterdayDeposit(usernamedeposit)
                              "
                            >
                              เมื่อวาน
                            </button>
                            <button
                              class="btn btn-warning btn-sm ml-1"
                              v-on:click.prevent="
                                getTodayDeposit(usernamedeposit)
                              "
                            >
                              วันนี้
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="table-responsive">
                      <table
                        id="basic-datatables"
                        class="display table table-striped table-hover"
                      >
                        <thead style="text-align: center"></thead>
                        <th>#</th>

                        <th>ยอดเงิน</th>
                        <th>โบนัส</th>
                        <th>ประเภท</th>
                        <th>เครดิตก่อนเติม</th>
                        <th>เครดิตหลังเติม</th>
                        <th>เวลาธนาคาร</th>
                        <th>ทำโดย</th>
                        <th>หมายเหตุ</th>
                        <th>ref.</th>
                        <th>สถานะ</th>

                        <tbody style="text-align: center">
                          <tr
                            v-for="(data, index) in memberuser"
                            v-bind:key="data.sb_username"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>{{ data.amount | formatNumber }}</td>
                            <td>{{ data.bonus_credit }}</td>
                            <td>
                              <div v-if="data.transaction_type == '1'">
                                <span class="badge badge-success">การฝาก</span>
                              </div>
                              <div v-if="data.transaction_type == '2'">
                                <span class="badge badge-danger">การถอน</span>
                              </div>
                              <div v-if="data.transaction_type == '0'">
                                <span class="badge badge-success">0</span>
                              </div>
                            </td>
                            <td>{{ data.credit_before | formatNumber }}</td>
                            <td>{{ data.credit_after | formatNumber }}</td>
                            <td>{{ data.bank_time }}</td>
                            <td>{{ data.create_by }}</td>
                            <td>{{ data.annotation }}</td>
                            <td>{{ data.ref }}</td>
                            <td>
                              <div v-if="data.transaction_status == '0'">
                                <span class="badge badge-warning"
                                  >รอดำเนินการ</span
                                >
                              </div>
                              <div v-if="data.transaction_status == '1'">
                                <span class="badge badge-success"
                                  >เรียบร้อยแล้ว</span
                                >
                              </div>
                              <div v-if="data.transaction_status == '2'">
                                <span class="badge badge-danger"
                                  >ถูกยกเลิก</span
                                >
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr v-if="memberuser.length == '0'">
                            <td colspan="12" class="text-center text-danger">
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
            </div>

            <div
              class="modal fade modelId"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myExtraLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      ข้อมูลการถอนของ : {{ usernamewithdraw }}
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-3">
                              <label for="datetime">
                                <i
                                  class="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                                จากวันที่
                              </label>
                              <VueCtkDateTimePicker
                                :only-date="true"
                                v-model="todate"
                                format="YYYY-MM-DD"
                                formatted="DD-MM-YYYY"
                                :no-label="true"
                                locale="th-TH"
                                label="yesterday"
                              />
                            </div>
                            <div class="col-md-3">
                              <label for="datetime">
                                <i class="fa fa-clock-o"></i>
                                เวลา
                              </label>
                              <VueCtkDateTimePicker
                                v-model="totime"
                                :only-time="true"
                                format="HH:mm:ss"
                                formatted="HH:mm"
                                :no-label="true"
                                label="Time"
                              />
                            </div>
                            <div class="col-md-3">
                              <label for="datetime">
                                <i
                                  class="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                                ถึงวันที่
                              </label>
                              <VueCtkDateTimePicker
                                :only-date="true"
                                v-model="yesterdate"
                                format="YYYY-MM-DD"
                                formatted="DD-MM-YYYY"
                                :no-label="true"
                                locale="th-TH"
                                label="today"
                              />
                            </div>
                            <div class="col-md-3">
                              <label for="datetime">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                เวลา
                              </label>
                              <VueCtkDateTimePicker
                                v-model="yestertime"
                                :only-time="true"
                                format="HH:mm:ss"
                                formatted="HH:mm"
                                :no-label="true"
                                label="Time"
                              />
                            </div>
                          </div>
                          <div class="row mt-2 pl-2">
                            <br />
                            <button
                              class="btn btn-primary btn-sm ml-1"
                              v-on:click.prevent="
                                getDataParamWithdraw(usernamewithdraw)
                              "
                            >
                              <i class="fa fa-search" aria-hidden="true"></i>
                              ค้นหา
                            </button>
                            <button
                              class="btn btn-secondary btn-sm ml-1"
                              v-on:click.prevent="
                                getYesterdayWithdraw(usernamewithdraw)
                              "
                            >
                              เมื่อวาน
                            </button>
                            <button
                              class="btn btn-warning btn-sm ml-1"
                              v-on:click.prevent="
                                getTodayWithdraw(usernamewithdraw)
                              "
                            >
                              วันนี้
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="table-responsive">
                      <table
                        id="basic-datatables"
                        class="display table table-striped table-hover"
                      >
                        <thead style="text-align: center"></thead>
                        <th>#</th>
                        <th>ยอดเงิน</th>
                        <th>โบนัส</th>
                        <th>ประเภท</th>
                        <th>เครดิตก่อนถอน</th>
                        <th>เครดิตหลังถอน</th>
                        <th>วัน-เวลา</th>
                        <th>ทำโดย</th>
                        <th>หมายเหตุ</th>
                        <th>ref.</th>
                        <th>สถานะ</th>

                        <tbody style="text-align: center">
                          <tr
                            v-for="(data, index) in memberuser"
                            v-bind:key="data.sb_username"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>{{ data.amount | formatNumber }}</td>
                            <td>{{ data.bonus_credit }}</td>
                            <td>
                              <div v-if="data.transaction_type == '1'">
                                <span class="badge badge-success">การฝาก</span>
                              </div>
                              <div v-if="data.transaction_type == '2'">
                                <span class="badge badge-warning">การถอน</span>
                              </div>
                              <div v-if="data.transaction_type == '0'">
                                <span class="badge badge-success">0</span>
                              </div>
                            </td>
                            <td>{{ data.credit_before | formatNumber }}</td>
                            <td>{{ data.credit_after | formatNumber }}</td>
                            <td>{{ data.bank_time }}</td>
                            <td>{{ data.create_by }}</td>
                            <td>
                              <a
                                href="#/user"
                                @click="viewAnnotation(data.annotation)"
                                >view
                              </a>
                            </td>
                            <td>{{ data.ref }}</td>
                            <td>
                              <div v-if="data.transaction_status === '0'">
                                <span class="badge badge-warning"
                                  >รอดำเนินการ</span
                                >
                              </div>
                              <div v-if="data.transaction_status === '1'">
                                <span class="badge badge-success"
                                  >เรียบร้อยแล้ว</span
                                >
                              </div>
                              <div v-if="data.transaction_status === '2'">
                                <span class="badge badge-danger"
                                  >ถูกยกเลิก</span
                                >
                              </div>
                              <div v-if="data.transaction_status === 'Success'">
                                <span class="badge badge-info">{{
                                  data.transaction_status
                                }}</span>
                              </div>
                            </td>
                            <td>{{ data.bank_time }}</td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr v-if="memberuser.length == '0'">
                            <td colspan="12" class="text-center text-danger">
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
            </div>

            <div
              class="modal fade"
              id="editeuser"
              tabindex="-1"
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      แก้ไขข้อมูลของ : {{ sb_username }}
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form v-on:submit.prevent="submitEditUser()">
                    <div class="modal-body">
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-6">
                            <input type="text" hidden v-model="formedit.uuid" />

                            <div class="form-group row">
                              <label for="first_name" class="text-right">
                                ชื่อ :
                                <span class="required-label">***</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="first_name"
                                id="first_name"
                                aria-describedby="helpId"
                                placeholder="first_name"
                                v-model="formedit.first_name"
                                required
                              />
                            </div>

                            <div class="form-group row">
                              <label for="last_name" class="text-right">
                                นามสกุล :
                                <span class="required-label">***</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="last_name"
                                id="last_name"
                                aria-describedby="helpId"
                                placeholder="last_name"
                                v-model="formedit.last_name"
                                required
                              />
                            </div>

                            <div class="form-group row">
                              <label for="tel" class="text-right">
                                หมายเลขโทรศัพท์ :
                                <span class="required-label">***</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="tel"
                                id="tel"
                                aria-describedby="helpId"
                                placeholder="tel"
                                v-model="formedit.tel"
                                required
                              />
                            </div>

                            <div class="form-group row">
                              <label for="bonus" class="text-right">
                                โบนัส:
                                <span class="required-label">***</span>
                              </label>
                              <select
                                class="form-control"
                                name="bonus"
                                id="bonus"
                                v-model="formedit.bonus"
                                required
                              >
                                <option selected disabled value>
                                  เลือก โบนัส
                                </option>

                                <option value="1">รับโบนัส</option>
                                <option value="0">ไม่รับโบนัส</option>
                              </select>
                            </div>
<!-- <div class="form-group row">
                              <label for="first_name" class="text-right">
                                PIN สำหรับแก้ไข :
                                <span class="required-label">*** ส่งหลักฐานการแก้ไข ติดต่อแอดมิน CS_AUTO เท่านั้น</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="first_name"
                                id="first_name"
                                aria-describedby="helpId"
                                placeholder=""
                                 required
                                 v-model="checknumber"
                              />
                            </div> -->
                            
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label for="line_id" class="text-right">
                                Line ID :
                                <span class="required-label">***</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="line_id"
                                id="line_id"
                                aria-describedby="helpId"
                                placeholder="line_id"
                                v-model="formedit.line_id"
                                required
                              />
                            </div>

                            <div class="form-group row">
                              <label for="know_us" class="text-right">
                                รู้จักผ่านช่องทางใด :
                                <span class="required-label">***</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="know_us"
                                id="know_us"
                                aria-describedby="helpId"
                                placeholder="know_us"
                                v-model="formedit.know_us"
                                required
                              />
                            </div>

                            <div class="form-group row">
                              <label for="bank_name" class="text-right">
                                เลือกธนาคาร:
                                <span class="required-label">***</span>
                              </label>
                              <select
                                class="form-control"
                                name="bank_name"
                                id="bank_name"
                                v-model="formedit.bank_name"
                                required
                              >
                                <option selected disabled value>
                                  เลือก ธนาคาร
                                </option>
                                <option value="scb">ธนาคารไทยพาณิชย์</option>
                                <option value="kbnk">ธนาคารกสิกรไทย</option>
                                <!-- <option value="truemoney"> Truemoney Wallet</option> -->

                                <option value="ktba">ธนาคารกรุงไทย</option>
                                <option value="bay">ธนาคารกรุงศรีอยุธยา</option>
                                <option value="bbla">ธนาคารกรุงเทพ</option>
                                <option value="gsb">ธนาคารออมสิน</option>
                                <option value="ttb">
                                  ธนาคารทหารไทยธนชาต (TTB)
                                </option>
                                <!-- <option value="promptpay">พร้อมเพย์</option> -->
                                <!-- <option value="tmb">ธนาคารทหารไทย</option>
                                <option value="truemoney">
                                  Truemoney Wallet
                                </option> -->
                                <option value="BAAC">
                                  ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร
                                </option>
                                <option value="ICBC">
                                  ธนาคารไอซีบีซี (ไทย)
                                </option>
                                <option value="TCD">
                                  ธนาคารไทยเครดิตเพื่อรายย่อย
                                </option>
                                <option value="CITI">ธนาคารซิตี้แบงก์</option>
                                <option value="SCBT">
                                  ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)
                                </option>
                                <option value="CIMB">
                                  ธนาคารซีไอเอ็มบีไทย
                                </option>
                                <option value="UOB">ธนาคารยูโอบี</option>
                                <option value="HSBC">
                                  ธนาคารเอชเอสบีซี ประเทศไทย
                                </option>
                                <option value="MIZUHO">
                                  ธนาคารมิซูโฮ คอร์ปอเรต
                                </option>
                                <option value="GHB">
                                  ธนาคารอาคารสงเคราะห์
                                </option>
                                <option value="LHBANK">
                                  ธนาคารแลนด์ แอนด์ เฮ้าส์
                                </option>
                                <!-- <option value="TBANK">ธนาคารธนชาต</option> -->
                                <option value="TISCO">ธนาคารทิสโก้</option>
                                <option value="KKP">ธนาคารเกียรตินาคิน</option>
                                <option value="IBANK">
                                  ธนาคารอิสลามแห่งประเทศไทย
                                </option>
                              </select>
                            </div>
                            <div class="form-group row">
                              <label for="bank_number" class="text-right">
                                หมายเลขบัญชี :
                                <span class="required-label">***</span>
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                name="bank_number"
                                id="bank_number"
                                aria-describedby="helpId"
                                placeholder="bank_number"
                                v-model="formedit.bank_number"
                                required
                              />
                            </div>
                           
                            <!-- <div class="form-group row">
                              <label for="bonus" class="text-right">
                                อนุมัติถอนออโต้:
                                <span class="required-label">***</span>
                              </label>
                              <select
                                class="form-control"
                                name="bonus"
                                id="bonus"
                                v-model="formedit.bonus"
                                required
                              >
                                <option selected disabled value>
                                  เลือก
                                </option>

                                <option value="1">เปิด</option>
                                <option value="0">ปิด</option>
                              </select>
                            </div> -->
                            <!-- <div class="form-group row">
                              <label for="bonus" class="text-right">
                                ฝากออโต้:
                                <span class="required-label">***</span>
                              </label>
                              <select
                                class="form-control"
                                name="bonus"
                                id="bonus"
                                v-model="formedit.bonus"
                                required
                              >
                                <option selected disabled value>
                                  เลือก
                                </option>

                                <option value="1">เปิด</option>
                                <option value="0">ปิด</option>
                              </select>
                            </div>
                             -->
                          </div>
                        </div>
                        <br />
                        <hr />
                        <div class="form-group d-flex justify-content-right">
                          <button class="btn btn-primary">
                            <i class="fa fa-check" aria-hidden="true"></i>
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input id="cb" type="text" />
    </div>
  </div>
</template>

<script scoped>
import { baseURL } from "../../../services/api";
import UserService from "@/services/UserService";
import swal from "sweetalert";
import Swal from "sweetalert2";

import memberService from "@/services/memberService";
import moment from "moment";
import axios from "axios";
// import $ from 'jquery'; // <-to import jquery

export default {
  data() {
    return {
      checknumber:'',
      new_username: "",
      search_username: "username",
      search_fname: "fname",
      search_tel: "tel",
      search_bankNumber: "bankNumber",
      search_sname: "sname",
      search_type: "",
      getselect: "",
      countAll: "",
      auto_deposit: "1",
      checked: "",
      aaa: "",
      formedit: {
        uuid: "",
        first_name: "",
        last_name: "",
        tel: "",
        bonus: "",
        line_id: "",
        know_us: "",
        // bank_name: "",
        bank_number: "",
      },
      username: "",
      true: true,
      false: false,
      yesterdate: "",
      yestertime: "",
      todate: "",
      totime: "",
      sb_username: "",
      first_name: "",
      last_name: "",
      tel: "",
      bonus: "",
      line_id: "",
      know_us: "",
      register_date: "",
      usernamedeposit: "",
      usernamewithdraw: "",

      bank: "",
      amount: "",
      bonus_credit: "",
      transaction_type: "",
      credit_before: "",
      credit_after: "",
      bank_time: "",
      create_by: "",
      annotation: "",
      ref: "",
      transaction_status: "",
      bank_name: "",
      createAt: "",
      updateAt: "",
      member: [],
      memberuser: [],
      isOnline: true,
      isOffline: true,
      new_password: "",
      k: "",
      todaydate: "",
      todaytime: "",
    };
  },

  mounted() {
    var cb = document.getElementById("cb");
    cb.value = "";
    // console.log(cb.value);
    cb.style.display = "block";
    cb.select();
    document.execCommand("copy");
    cb.style.display = "none";
    this.checkAuth();
    this.getRange();
    this.moment();
    this.yesterdate = moment().locale("th").format("YYYY-MM-DD");
    this.yestertime = moment().locale("th").format("23:59:59");
    this.todate = moment().locale("th").format("YYYY-MM-DD");
    this.totime = moment().locale("th").format("00:00:00");
    this.todaydate = moment().locale("th").format("YYYY-MM-DD");
    this.todaytime = moment().locale("th").format("00:00:00");
    this.todaytime2 = moment().locale("th").format("23:59:59");
    const t = "T";
    const z = "";
    let search_type = this.search_type;
    const username = this.username;
    const start_date = this.todaydate + t + this.todaytime + z;
    const end_date = this.todaydate + t + this.todaytime2 + z;

    axios({
      method: "get",
      url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=${username}&search_type=${search_type}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        this.member = await response.data.data;
        console.log('user');
        console.log(`${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=${username}&search_type=${search_type}`);
        
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    onChangeStatus(event) {
      let data = event.target.value;
      console.log(data);
    },
    onChange(event) {
      console.log("aa");
      let data = event.target.value;
      console.log(data);
      console.log(this.getselect);
    },
    viewAnnotation(annotation) {
      if (annotation === null || annotation === "-") {
        annotation = "ยังไม่มีข้อมูล";
      }
      swal({ title: annotation, button: false });
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
    async getAllmember() {
      this.moment();
      this.yesterdate = moment()
        .locale("th")
        .add(1, "days")
        .format("YYYY-MM-DD");
      this.yestertime = moment().locale("th").format("11:00:03");
      this.todate = moment().locale("th").format("YYYY-MM-DD");
      this.totime = moment().locale("th").format("11:00:01");
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const z = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;

      axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then(async (response) => {
          this.member = "";
          this.member = await response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    moment() {
      return moment();
    },

    async getByUserDeposit(username) {
      this.moment();
      this.yesterdate = moment().locale("th").format("YYYY-MM-DD");
      this.yestertime = moment().locale("th").format("23:59:59");
      this.todate = moment().locale("th").format("YYYY-MM-DD");
      this.totime = moment().locale("th").format("00:00:00");
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const z = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/deposit/${username}/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          this.memberuser = res.data.data;
          this.usernamedeposit = username;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getByUserWithdraw(username) {
      this.memberuser = "";
      this.moment();
      this.yesterdate = moment()
        .locale("th")
        // .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.yestertime = moment()
        .locale("th")
        // .subtract(1, "days")
        .format("23:59:59");
      this.todate = moment().locale("th").format("YYYY-MM-DD");
      this.totime = moment().locale("th").format("00:00:00");
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const start_date = this.todaydate + t + this.todaytime;
      const end_date = this.todaydate + t + this.todaytime2;
      axios({
        method: "get",
        url: `${baseURL}/member/withdraw/${username}/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          this.memberuser = res.data.data;

          this.usernamewithdraw = username;
        })
        .catch((error) => {
          console.log(error);
        });
      // this.usernamewithdraw = username;
    },

    async getNewPassword(uuid) {
      console.log(this.new_username);
      const response = await memberService.changePasswordByUuid(uuid);
      // console.log(response);
      this.new_password = response.data.new_password;
      Swal.fire({
        icon: "success",
        title: "ดำเนินการเรียบร้อยแล้วค่ะ",
        confirmButtonText: `คัดลอก`,

        html:
          "นี่คือ User สำหรับการเล่นเกม และแจ้งฝาก-ถอนนะคะ" +
          " <br>" +
          "User :  " +
          this.new_username +
          " <br>" +
          "Password :" +
          this.new_password,
      }).then(() => {
        // console.log(this.new_password);
        var cb = document.getElementById("cb");
        cb.value = this.new_password;
        // console.log(cb.value);
        cb.style.display = "block";
        cb.select();
        document.execCommand("copy");
        cb.style.display = "none";
      });
    },
    checkClicked(data) {
      this.new_username = data.sb_username;
      this.$confirm("ยืนยันการเปลี่ยนรหัส?").then(() => {
        this.getNewPassword(data.uuid);
      });
    },

    getRange() {},

    async getDataParam() {
      const t = "T";
      const z = "";
      let search_type = this.search_type;
      const username = this.username;
      const end_date = this.yesterdate + t + this.yestertime + z;
      const start_date = this.todate + t + this.totime + z;
      await axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=${username}&search_type=${search_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.member = response.data.data;
          this.username = "";
          if (this.member.length <= 0) {
            this.$toast.error("ไม่พบรหัสข้อมูลนี้", {
              position: "top-right",
              timeout: 1500,
              icon: true,
              rtl: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getToday() {
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      let search_type = this.search_type;

      const z = "";
      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=&search_type=${search_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.member = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getYesterday() {
      this.todaydate = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const z = "";
      let search_type = this.search_type;

      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/?start_date=${start_date}&end_date=${end_date}&username=&search_type=${search_type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.member = response.data.data;
          // console.log("A");
        })
        .catch((error) => {
          console.log(error);
          // console.log("w");
        });
    },

    getDataParamDeposit(username) {
      const t = "T";
      const z = "";
      const end_date = this.yesterdate + t + this.yestertime + z;
      const start_date = this.todate + t + this.totime + z;
      axios({
        method: "get",
        url: `${baseURL}/member/deposit/${username}/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.memberuser = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTodayDeposit(username) {
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const z = "";

      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/deposit/${username}/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.memberuser = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getYesterdayDeposit(username) {
      this.todaydate = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const z = "";

      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/deposit/${username}/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.memberuser = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDataParamWithdraw(username) {
      const t = "T";
      const z = "";
      const end_date = this.yesterdate + t + this.yestertime + z;
      const start_date = this.todate + t + this.totime + z;
      axios({
        method: "get",
        url: `${baseURL}/member/withdraw/${username}?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.memberuser = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTodayWithdraw(username) {
      this.todaydate = moment().locale("th").format("YYYY-MM-DD");
      this.todaytime = moment().locale("th").format("00:00:00");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      const t = "T";
      const z = "";

      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/Withdraw/${username}/?start_date=${start_date}&end_date=${end_date}&username=`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.memberuser = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getYesterdayWithdraw(username) {
      this.todaydate = moment()
        .locale("th")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.todaytime2 = moment().locale("th").format("23:59:59");
      this.todaytime = moment().locale("th").format("00:00:00");
      const t = "T";
      const z = "";

      const start_date = this.todaydate + t + this.todaytime + z;
      const end_date = this.todaydate + t + this.todaytime2 + z;
      axios({
        method: "get",
        url: `${baseURL}/member/Withdraw/${username}/?start_date=${start_date}&end_date=${end_date}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.memberuser = response.data.data;
        })
        .catch((error) => {
          console.log(error);
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
    async getEditbyUserUUID(uuid) {
      const res = await memberService.getEditUserByUuid(uuid);
      this.formedit.first_name = res.data.first_name;
      this.formedit.uuid = res.data.uuid;
      this.formedit.last_name = res.data.last_name;
      this.formedit.tel = res.data.tel;
      this.formedit.bonus = res.data.bonus;
      this.formedit.line_id = res.data.line_id;
      this.formedit.know_us = res.data.know_us;
      this.formedit.bank_name = res.bank.bank_name;
      this.formedit.bank_number = res.bank.bank_number;
      this.sb_username = res.data.sb_username;
    },
    async submitEditUser() {
  // console.log(this.formedit.bank_number);384822 
  // if (this.checknumber !== '384822') {
  //   alert("รหัสPINผิด ติดต่อผู้ดูแลระบบ");
  // } else {
 this.member = [];
      const res = await memberService.PostUserByUuid(this.formedit);
      res.post;

      this.$toast.success("เเก้ไขข้อมูลเรียบร้อย", {
        position: "top-right",
        timeout: 1500,
      });
      // this.getAllmember();

      window.$("#editeuser").modal("hide");
      this.getAllmember();
  // }
     
    },
  },
};
</script>

